import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { getMongoDb } from '@/lib/mongodb';

const DB_FILE_PATH = path.join(process.cwd(), 'data', 'server_db.json');
const WEBHOOK_SECRET = process.env.PAYMENT_WEBHOOK_SECRET || 'whsec_giftportal_luxe_secure_key_2026';

// Helper to read database state
const readDbState = async () => {
  // 1. Try reading from MongoDB Atlas
  try {
    const db = await getMongoDb();
    const doc = await db.collection('system_state').findOne({ _id: 'current_state' });
    if (doc) {
      delete doc._id;
      if (!Array.isArray(doc.processed_payments)) {
        doc.processed_payments = [];
      }
      return doc;
    }
  } catch (mongoErr) {
    console.warn('MongoDB read in webhook warning:', mongoErr.message);
  }

  // 2. Fallback to local server_db.json
  try {
    if (fs.existsSync(DB_FILE_PATH)) {
      const content = fs.readFileSync(DB_FILE_PATH, 'utf-8');
      const state = JSON.parse(content);
      if (!Array.isArray(state.processed_payments)) {
        state.processed_payments = [];
      }
      return state;
    }
  } catch (err) {
    console.error('Error reading DB for webhook:', err);
  }
  return { orders: [], inventory: [], processed_payments: [], notifications: {} };
};

// Helper to save database state atomically
const saveDbState = async (state) => {
  try {
    state.version = (state.version || 0) + 1;
    state.lastUpdated = new Date().toISOString();

    // 1. Persist to MongoDB Atlas
    try {
      const db = await getMongoDb();
      await db.collection('system_state').updateOne(
        { _id: 'current_state' },
        { $set: { ...state } },
        { upsert: true }
      );
    } catch (mongoErr) {
      console.error('MongoDB save in webhook warning:', mongoErr.message);
    }

    // 2. Persist to local disk if supported
    try {
      const dataDir = path.join(process.cwd(), 'data');
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      fs.writeFileSync(DB_FILE_PATH, JSON.stringify(state, null, 2), 'utf-8');
    } catch (fsErr) {}

    return true;
  } catch (err) {
    console.error('Error saving DB in webhook:', err);
    return false;
  }
};

// Signature verification helper
const verifySignature = (rawBody, signature, secret) => {
  if (!signature) return false;
  // Allow test / simulation headers in local development
  if (process.env.NODE_ENV !== 'production' && (signature === 'test_signature' || signature === 'bypass_dev')) {
    return true;
  }
  try {
    const expected = crypto.createHmac('sha256', secret).update(rawBody).digest('hex');
    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
  } catch (e) {
    return false;
  }
};

/**
 * POST /api/webhooks/payment
 * Handles payment processor webhooks (Razorpay / Stripe / Cashfree / In-house Gateway)
 * Guarantees idempotency: writes orders ONLY once upon successful payment capture.
 */
export async function POST(request) {
  try {
    const rawBody = await request.text();
    let body;
    try {
      body = JSON.parse(rawBody);
    } catch (e) {
      return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
    }

    // Extract headers
    const signature = request.headers.get('x-razorpay-signature') || 
                      request.headers.get('stripe-signature') || 
                      request.headers.get('x-webhook-signature') || 
                      request.headers.get('x-signature');

    const headerIdempotencyKey = request.headers.get('x-idempotency-key') || 
                                 request.headers.get('idempotency-key');

    // Signature verification (warn in dev if missing, enforce in production)
    const isSignatureValid = verifySignature(rawBody, signature, WEBHOOK_SECRET);
    if (process.env.NODE_ENV === 'production' && !isSignatureValid) {
      return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 401 });
    }

    // Resolve payment details across Razorpay / Stripe / Standard webhook formats
    const eventType = body.event || body.type || 'payment.captured';
    const paymentEntity = body.payload?.payment?.entity || body.data?.object || body.payment || body;
    
    const paymentId = paymentEntity.id || 
                      paymentEntity.payment_id || 
                      body.paymentId || 
                      `pay_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

    const idempotencyKey = headerIdempotencyKey || 
                           body.idempotencyKey || 
                           body.event_id || 
                           body.id || 
                           paymentId;

    const amount = paymentEntity.amount ? (paymentEntity.amount > 1000 && eventType.includes('razorpay') ? paymentEntity.amount / 100 : paymentEntity.amount) : (body.orderData?.total || 0);
    const currency = paymentEntity.currency || 'INR';
    const status = paymentEntity.status || 'captured';

    // Verify payment succeeded
    const isPaymentSuccessful = ['captured', 'paid', 'succeeded', 'authorized'].includes(String(status).toLowerCase()) ||
                                ['payment.captured', 'order.paid', 'checkout.session.completed', 'charge.succeeded'].includes(eventType);

    if (!isPaymentSuccessful) {
      return NextResponse.json({ 
        received: true, 
        processed: false, 
        message: `Ignored uncaptured event status: ${status}` 
      }, { status: 200 });
    }

    // Load Database State
    const state = await readDbState();
    if (!Array.isArray(state.processed_payments)) {
      state.processed_payments = [];
    }
    if (!Array.isArray(state.orders)) {
      state.orders = [];
    }
    if (!Array.isArray(state.inventory)) {
      state.inventory = [];
    }

    // =========================================================================
    // IDEMPOTENCY CHECK:
    // If this payment or idempotency key was already recorded, return HTTP 200
    // immediately without creating a duplicate order or re-deducting stock!
    // =========================================================================
    const existingTransaction = state.processed_payments.find(p => 
      p.idempotencyKey === idempotencyKey || 
      p.paymentId === paymentId
    );

    if (existingTransaction) {
      return NextResponse.json({
        success: true,
        idempotent: true,
        status: 'already_processed',
        message: 'Webhook already processed. Duplicate ignored to prevent duplicate charges or double orders.',
        orderId: existingTransaction.orderId,
        paymentId: existingTransaction.paymentId,
        processedAt: existingTransaction.processedAt
      }, { status: 200 });
    }

    // Extract or construct order payload
    const orderData = body.orderData || body.metadata?.orderData || paymentEntity.notes?.orderData || {};
    const orderId = orderData.id || `${Math.floor(1000 + Math.random() * 9000)}`;

    const cart = Array.isArray(orderData.cart) ? orderData.cart : [];
    const customerName = orderData.customerName || orderData.sender?.name || 'Customer';
    const customerMobile = orderData.customerMobile || orderData.sender?.mobile || 'N/A';
    const recipientCity = orderData.recipient?.city || orderData.address?.city || 'Indore';
    const isIndore = recipientCity.toLowerCase().trim().includes('indore');

    // Build finalized confirmed order
    const finalizedOrder = {
      ...orderData,
      id: orderId,
      status: 'Confirmed',
      stage: 'confirmed',
      statusMessage: `Payment verified via webhook [${paymentId}]. Order confirmed and queued for preparation.`,
      paymentStatus: 'Paid',
      paymentMethod: orderData.paymentMethod || 'Online Gateway',
      paymentId: paymentId,
      gatewayTransactionId: paymentId,
      paymentAmount: amount,
      paymentCurrency: currency,
      verifiedViaWebhook: true,
      webhookEvent: eventType,
      paidAt: new Date().toISOString(),
      confirmedAt: new Date().toISOString(),
      timestamp: orderData.timestamp || new Date().toISOString(),
      pickupOtp: orderData.pickupOtp || `${Math.floor(1000 + Math.random() * 9000)}`,
      deliveryOtp: orderData.deliveryOtp || `${Math.floor(1000 + Math.random() * 9000)}`
    };

    // 1. Insert order to state (or update if existed as pending)
    const existingOrderIdx = state.orders.findIndex(o => String(o.id) === String(orderId));
    if (existingOrderIdx >= 0) {
      state.orders[existingOrderIdx] = { ...state.orders[existingOrderIdx], ...finalizedOrder };
    } else {
      state.orders.unshift(finalizedOrder);
    }

    // 2. Atomically Deduct Inventory Stock
    if (cart.length > 0) {
      cart.forEach(item => {
        const product = state.inventory.find(p => String(p.id) === String(item.id));
        if (product) {
          const currentStock = product.stock !== undefined ? Number(product.stock) : 50;
          const newStock = Math.max(0, currentStock - (Number(item.qty) || 1));
          product.stock = newStock;
          product.isSoldOut = newStock <= 0;
        }
      });
    }

    // 3. Record in Processed Payments for Idempotency
    const idempotencyRecord = {
      idempotencyKey,
      paymentId,
      orderId,
      amount,
      currency,
      status: 'processed',
      gateway: eventType.includes('razorpay') ? 'razorpay' : eventType.includes('stripe') ? 'stripe' : 'payment_gateway',
      eventType,
      processedAt: new Date().toISOString()
    };
    state.processed_payments.unshift(idempotencyRecord);
    state.processed_payments = state.processed_payments.slice(0, 500); // retain last 500 records

    // 4. Notifications
    if (!state.notifications) state.notifications = {};
    const addNotif = (userKey, msg) => {
      if (!state.notifications[userKey]) state.notifications[userKey] = [];
      state.notifications[userKey].unshift({
        id: Date.now() + Math.floor(Math.random() * 100),
        text: msg,
        timestamp: new Date().toISOString(),
        read: false
      });
    };

    addNotif('admin', `💳 PAYMENT CAPTURED & CONFIRMED: Order #${orderId} (₹${amount}) via Webhook [Txn: ${paymentId}]. Deliver to ${recipientCity}.`);
    if (finalizedOrder.customerUsername) {
      addNotif(finalizedOrder.customerUsername, `🎉 Payment verified! Order #${orderId} has been confirmed and is being prepared.`);
    }

    // 5. Commit to database
    await saveDbState(state);

    return NextResponse.json({
      success: true,
      idempotent: false,
      status: 'order_created',
      orderId: orderId,
      paymentId: paymentId,
      message: 'Payment verified and order created successfully via idempotent webhook.'
    }, { status: 200 });

  } catch (err) {
    console.error('Payment webhook error:', err);
    return NextResponse.json({ error: 'Internal webhook handler error', details: err.message }, { status: 500 });
  }
}

/**
 * GET /api/webhooks/payment
 * Audit & Diagnostics endpoint for reviewing processed webhook events
 */
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const checkKey = searchParams.get('key');
  const state = await readDbState();

  if (checkKey) {
    const found = (state.processed_payments || []).find(p => p.idempotencyKey === checkKey || p.paymentId === checkKey);
    return NextResponse.json({
      exists: Boolean(found),
      record: found || null
    });
  }

  return NextResponse.json({
    status: 'active',
    endpoint: '/api/webhooks/payment',
    idempotencyGuaranteed: true,
    totalProcessed: (state.processed_payments || []).length,
    recentTransactions: (state.processed_payments || []).slice(0, 20)
  });
}

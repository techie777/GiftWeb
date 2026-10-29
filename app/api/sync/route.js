import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getMongoDb } from '@/lib/mongodb';
import { PRODUCTS as DEFAULT_PRODUCTS, DEALS as DEFAULT_DEALS, ADDONS as DEFAULT_ADDONS } from '@/data/products';
import { 
  DEFAULT_AREAS, 
  DEFAULT_SOCIETIES, 
  DEFAULT_VENDORS, 
  DEFAULT_ADMINS, 
  DEFAULT_CATEGORIES, 
  DEFAULT_HERO_SLIDES, 
  DEFAULT_SETTINGS,
  DEFAULT_CITIES,
  getVendorForCat
} from '@/lib/db';

const DB_FILE_PATH = path.join(process.cwd(), 'data', 'server_db.json');

// In-memory cache for fast read/writes
let serverState = null;

const initializeDefaultState = () => {
  const initialProducts = DEFAULT_PRODUCTS.map(p => {
    const vInfo = getVendorForCat(p.cat);
    return {
      stock: p.stock !== undefined ? Number(p.stock) : 50,
      isSoldOut: false,
      approvalStatus: 'approved',
      vendorId: p.vendorId || vInfo.vendorId,
      vendorName: p.vendorName || vInfo.vendorName,
      ...p
    };
  });

  return {
    version: 1,
    lastUpdated: new Date().toISOString(),
    orders: [],
    inventory: initialProducts,
    deals: DEFAULT_DEALS,
    areas: DEFAULT_AREAS,
    societies: DEFAULT_SOCIETIES,
    categories: DEFAULT_CATEGORIES,
    hero_slides: DEFAULT_HERO_SLIDES,
    cities: DEFAULT_CITIES,
    settings: DEFAULT_SETTINGS,
    admins: DEFAULT_ADMINS,
    vendors: DEFAULT_VENDORS,
    coupons: [],
    notifications: {},
    support_tickets: [],
    settlements: [],
    agreements: {},
    b2b_orders: []
  };
};

let lastMtime = 0;

const readServerState = async () => {
  // 1. Try reading from MongoDB Atlas first
  try {
    const db = await getMongoDb();
    const doc = await db.collection('system_state').findOne({ _id: 'current_state' });
    if (doc) {
      delete doc._id;
      serverState = doc;
      return serverState;
    }
  } catch (mongoErr) {
    console.warn('MongoDB Atlas read warning, falling back to local file / memory:', mongoErr.message);
  }

  // 2. Fallback to local server_db.json if MongoDB is not reachable
  try {
    if (fs.existsSync(DB_FILE_PATH)) {
      const stat = fs.statSync(DB_FILE_PATH);
      if (serverState && stat.mtimeMs === lastMtime) {
        return serverState;
      }
      const content = fs.readFileSync(DB_FILE_PATH, 'utf-8');
      serverState = JSON.parse(content);
      lastMtime = stat.mtimeMs;
      // Ensure missing collections are safely backfilled
      const defaults = initializeDefaultState();
      for (const [k, v] of Object.entries(defaults)) {
        if (serverState[k] === undefined) {
          serverState[k] = v;
        }
      }
      return serverState;
    }
  } catch (err) {
    console.error('Error reading server_db.json:', err);
  }

  if (serverState) return serverState;
  serverState = initializeDefaultState();
  await saveServerState(serverState);
  return serverState;
};

const saveServerState = async (stateToSave) => {
  const state = stateToSave || serverState;
  if (!state) return;
  try {
    state.version = (state.version || 0) + 1;
    state.lastUpdated = new Date().toISOString();
    serverState = state;

    // 1. Persist to MongoDB Atlas
    try {
      const db = await getMongoDb();
      await db.collection('system_state').updateOne(
        { _id: 'current_state' },
        { $set: { ...state } },
        { upsert: true }
      );
    } catch (mongoErr) {
      console.error('Failed to write to MongoDB Atlas:', mongoErr.message);
    }

    // 2. Persist to local disk if supported (development fallback)
    try {
      const dataDir = path.join(process.cwd(), 'data');
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      fs.writeFileSync(DB_FILE_PATH, JSON.stringify(state, null, 2), 'utf-8');
      const stat = fs.statSync(DB_FILE_PATH);
      lastMtime = stat.mtimeMs;
    } catch (fsErr) {
      // Gracefully ignored on serverless / read-only filesystem environments (Vercel)
    }
  } catch (err) {
    console.error('Error saving server state:', err);
  }
};

// GET /api/sync - Retrieve state or check version
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const sinceVersion = searchParams.get('since');
    const state = await readServerState();

    if (sinceVersion && Number(sinceVersion) === state.version) {
      return NextResponse.json({ upToDate: true, version: state.version });
    }

    // Security Hardening: Sanitize sensitive PINs before sending over the wire
    const sanitizedData = { ...state };
    if (Array.isArray(sanitizedData.admins)) {
      sanitizedData.admins = sanitizedData.admins.map(({ pin, ...rest }) => rest);
    }
    if (Array.isArray(sanitizedData.vendors)) {
      sanitizedData.vendors = sanitizedData.vendors.map(({ pin, ...rest }) => rest);
    }

    return NextResponse.json({
      upToDate: false,
      version: state.version,
      lastUpdated: state.lastUpdated,
      data: sanitizedData
    });
  } catch (err) {
    console.error('GET /api/sync error:', err);
    return NextResponse.json({ error: 'Failed to sync data' }, { status: 500 });
  }
}

// POST /api/sync - Execute synchronized mutation
export async function POST(request) {
  try {
    const body = await request.json();
    const { action, payload } = body;
    const state = await readServerState();

    const addNotification = (username, text) => {
      if (!state.notifications) state.notifications = {};
      if (!state.notifications[username]) state.notifications[username] = [];
      state.notifications[username].unshift({
        id: Date.now() + Math.floor(Math.random() * 100),
        text,
        timestamp: new Date().toISOString(),
        read: false
      });
      state.notifications[username] = state.notifications[username].slice(0, 30);
    };

    switch (action) {
      // --- ORDER CREATION & LIFECYCLE ---
      case 'save_order': {
        const order = payload.order;
        if (!order) return NextResponse.json({ error: 'Missing order payload' }, { status: 400 });
        
        // Prevent duplicate order by id if it already exists
        const existingIdx = state.orders.findIndex(o => String(o.id) === String(order.id));
        if (existingIdx >= 0) {
          state.orders[existingIdx] = { ...state.orders[existingIdx], ...order };
        } else {
          state.orders.unshift(order);
        }
        state.orders.sort((a, b) => {
          const timeA = new Date(a.timestamp || a.createdAt || 0).getTime() || 0;
          const timeB = new Date(b.timestamp || b.createdAt || 0).getTime() || 0;
          return timeB - timeA;
        });

        // Deduct inventory stock
        if (Array.isArray(order.cart)) {
          order.cart.forEach(item => {
            const prod = state.inventory.find(p => String(p.id) === String(item.id));
            if (prod) {
              const currentStock = prod.stock !== undefined ? Number(prod.stock) : 50;
              const newStock = Math.max(0, currentStock - (item.qty || 1));
              prod.stock = newStock;
              prod.isSoldOut = newStock <= 0;
            }
          });
        }

        // Add notifications
        const isGift = order.orderType === 'gift' || order.isGift;
        const recipientCity = order.recipient?.city || order.address?.city || order.city || 'Indore';
        const isIndore = !recipientCity || recipientCity.toLowerCase().trim().includes('indore');
        addNotification('admin', `New Order #${order.id} [${isIndore ? '⚡ Indore Local' : `📦 Courier: ${recipientCity}`}] (${isGift ? 'Gift Booking' : 'Personal Order'}) received`);
        if (order.assignedVendorId) {
          addNotification(`vendor_${order.assignedVendorId}`, `New Order #${order.id} [${isIndore ? '⚡ Indore Local' : `📦 Courier: ${recipientCity}`}] received for your shop! Deliver: ${order.recipient?.deliveryDate || 'Today'}`);
        }
        break;
      }

      case 'update_order_status': {
        const { orderId, newStatus, customMessage, sourceRole } = payload;
        const targetOrder = state.orders.find(o => String(o.id) === String(orderId));
        if (targetOrder) {
          targetOrder.status = newStatus;
          if (customMessage) targetOrder.statusMessage = customMessage;

          if (newStatus === 'Accepted') {
            targetOrder.assignmentAccepted = true;
            if (targetOrder.stage === 'pending' || targetOrder.stage === 'confirmed') {
              targetOrder.stage = 'vendor_assigned';
            }
          } else if (newStatus === 'Rejected') {
            targetOrder.assignmentAccepted = false;
            targetOrder.stage = 'rejected';
            targetOrder.assignedVendorId = '';
            addNotification('admin', `REASSIGN ALERT: Order #${orderId} rejected by vendor. Action required.`);
          } else if (newStatus === 'Delivered') {
            targetOrder.stage = 'delivered';
            targetOrder.deliveredAt = new Date().toISOString();
          }

          // Dispatch notifications
          if (targetOrder.customerUsername) {
            addNotification(targetOrder.customerUsername, customMessage || `Order #${orderId} status: ${newStatus}`);
          }
          addNotification('admin', customMessage || `Order #${orderId} status updated: ${newStatus}`);
          if (targetOrder.assignedVendorId) {
            addNotification(`vendor_${targetOrder.assignedVendorId}`, customMessage || `Order #${orderId} status: ${newStatus}`);
          }
        }
        break;
      }

      case 'confirm_order': {
        const { orderId } = payload;
        const targetOrder = state.orders.find(o => String(o.id) === String(orderId));
        if (targetOrder) {
          targetOrder.stage = 'confirmed';
          targetOrder.status = 'Confirmed';
          targetOrder.statusMessage = 'Order confirmed by Admin';
          targetOrder.confirmedAt = new Date().toISOString();
          addNotification('admin', `Order #${orderId} confirmed`);
          if (targetOrder.assignedVendorId) {
            addNotification(`vendor_${targetOrder.assignedVendorId}`, `Order #${orderId} confirmed by Admin and ready for preparation`);
          }
        }
        break;
      }

      case 'cancel_order_by_admin': {
        const { orderId, reason, apologyMessage } = payload;
        const targetOrder = state.orders.find(o => String(o.id) === String(orderId));
        if (targetOrder) {
          targetOrder.stage = 'cancelled';
          targetOrder.status = 'Cancelled';
          targetOrder.statusMessage = `Order cancelled by Admin: ${reason || 'No vendor available'}`;
          targetOrder.cancelledBy = 'master_admin';
          targetOrder.cancellationReason = reason || 'No partner vendor available to fulfill order in this area';
          targetOrder.apologyMessage = apologyMessage || 'We sincerely apologize, but your order could not be fulfilled as no partner vendor is available in your delivery area. A 100% full refund has been initiated.';
          targetOrder.refundStatus = 'Initiated (100% Full Refund)';
          targetOrder.reassignmentNeeded = false;
          targetOrder.cancelledAt = new Date().toISOString();

          // Sincere apology notification to customer
          if (targetOrder.customerUsername) {
            addNotification(targetOrder.customerUsername, `⚠️ Order #${orderId} Cancellation: ${targetOrder.apologyMessage}`);
          }
          if (targetOrder.customerMobile && targetOrder.customerMobile !== targetOrder.customerUsername) {
            addNotification(targetOrder.customerMobile, `⚠️ Order #${orderId} Cancellation: ${targetOrder.apologyMessage}`);
          }
          addNotification('admin', `Order #${orderId} cancelled by Admin (No vendor available). Customer notified with apology & full refund.`);
        }
        break;
      }

      case 'reject_order_by_vendor': {
        const { orderId, vendorId, vendorName, reason } = payload;
        const targetOrder = state.orders.find(o => String(o.id) === String(orderId));
        if (targetOrder) {
          const history = Array.isArray(targetOrder.rejectionHistory) ? [...targetOrder.rejectionHistory] : [];
          history.push({
            vendorId,
            vendorName: vendorName || 'Vendor',
            reason: reason || 'Declined',
            timestamp: new Date().toISOString()
          });

          targetOrder.stage = 'vendor_rejected';
          targetOrder.status = 'Reassignment Needed';
          targetOrder.statusMessage = `Declined by ${vendorName || 'Vendor'} (${reason || 'Unavailable'}). Awaiting Master Admin reassignment.`;
          targetOrder.reassignmentNeeded = true;
          targetOrder.assignmentAccepted = false;
          targetOrder.assignedVendorId = '';
          targetOrder.assignedVendorName = '';
          targetOrder.lastDeclinedVendor = {
            vendorId,
            vendorName: vendorName || 'Vendor',
            reason: reason || 'Unavailable',
            declinedAt: new Date().toISOString()
          };
          targetOrder.rejectionHistory = history;

          addNotification('admin', `🚨 REASSIGNMENT REQUIRED: Order #${orderId} was declined by ${vendorName || 'Vendor'} (Reason: ${reason || 'Unavailable'}). Please reassign to another vendor.`);
          if (vendorId) {
            addNotification(`vendor_${vendorId}`, `Order #${orderId} declined and returned to Master Admin for reassignment.`);
          }
        }
        break;
      }

      case 'assign_order_vendor': {
        const { orderId, vendorId, vendorName } = payload;
        const targetOrder = state.orders.find(o => String(o.id) === String(orderId));
        if (targetOrder) {
          targetOrder.assignedVendorId = vendorId;
          targetOrder.assignedVendorName = vendorName;
          targetOrder.stage = 'vendor_assigned';
          targetOrder.status = 'Vendor Assigned';
          targetOrder.statusMessage = `Assigned to ${vendorName}. Preparing package.`;
          targetOrder.reassignmentNeeded = false;
          targetOrder.assignmentAccepted = false;
          targetOrder.vendorAssignedAt = new Date().toISOString();
          addNotification(`vendor_${vendorId}`, `Order #${orderId} assigned to your shop for preparation`);
          addNotification('admin', `Order #${orderId} assigned to vendor ${vendorName}`);
        }
        break;
      }

      case 'mark_ready_for_pickup': {
        const { orderId } = payload;
        const targetOrder = state.orders.find(o => String(o.id) === String(orderId));
        if (targetOrder) {
          targetOrder.stage = 'ready_for_pickup';
          targetOrder.status = 'Ready for Pickup';
          targetOrder.statusMessage = 'Order packed and ready for pickup at vendor location';
          targetOrder.readyAt = new Date().toISOString();
          addNotification('admin', `Order #${orderId} is Ready for Pickup at ${targetOrder.assignedVendorName || 'Vendor'}`);
          if (targetOrder.customerUsername) {
            addNotification(targetOrder.customerUsername, `Your Order #${orderId} is packed and ready for delivery pickup!`);
          }
        }
        break;
      }

      case 'dispatch_logistics': {
        const orderId = payload.orderId;
        const logisticsPayload = payload.logisticsPayload || payload;
        const targetOrder = state.orders.find(o => String(o.id) === String(orderId));
        if (targetOrder) {
          const isCourier = logisticsPayload?.type === 'courier' || Boolean(logisticsPayload?.trackingId);
          targetOrder.logistics = {
            ...logisticsPayload,
            dispatchedAt: new Date().toISOString()
          };
          targetOrder.stage = 'out_for_delivery';
          targetOrder.status = isCourier ? 'Shipped' : 'In Transit';
          targetOrder.statusMessage = isCourier
            ? `Shipped via ${logisticsPayload.provider || 'Courier'} (Tracking: ${logisticsPayload.trackingId || 'N/A'}). In transit to ${targetOrder.recipient?.city || 'destination'}.`
            : `Out for delivery via ${logisticsPayload.provider || 'Express Delivery'}`;
          addNotification('admin', `Order #${orderId} dispatched via ${logisticsPayload.provider || 'Express Delivery'}${isCourier && logisticsPayload.trackingId ? ` (AWB: ${logisticsPayload.trackingId})` : ''}`);
          if (targetOrder.customerUsername) {
            const custMsg = isCourier
              ? `Order #${orderId} shipped via ${logisticsPayload.provider}! Tracking ID: ${logisticsPayload.trackingId}`
              : `Order #${orderId} is out for delivery with ${logisticsPayload.provider || 'Express Delivery'}!`;
            addNotification(targetOrder.customerUsername, custMsg);
          }
        }
        break;
      }

      case 'update_courier_tracking': {
        const orderId = payload.orderId;
        const courierPayload = payload.courierPayload || payload;
        const targetOrder = state.orders.find(o => String(o.id) === String(orderId));
        if (targetOrder) {
          targetOrder.logistics = {
            ...(targetOrder.logistics || {}),
            ...courierPayload,
            type: 'courier',
            updatedAt: new Date().toISOString()
          };
          if (targetOrder.status !== 'Delivered') {
            targetOrder.status = 'Shipped';
            targetOrder.statusMessage = `Shipped via ${courierPayload.provider || targetOrder.logistics?.provider || 'Courier'} (Tracking: ${courierPayload.trackingId || targetOrder.logistics?.trackingId || 'N/A'})`;
          }
          addNotification('admin', `Order #${orderId} tracking updated (${courierPayload.provider}: ${courierPayload.trackingId})`);
          if (targetOrder.customerUsername && courierPayload.trackingId) {
            addNotification(targetOrder.customerUsername, `Tracking details updated for Order #${orderId}: ${courierPayload.provider} AWB: ${courierPayload.trackingId}`);
          }
        }
        break;
      }

      case 'update_self_pickup_otps': {
        const orderId = payload.orderId;
        const targetOrder = state.orders.find(o => String(o.id) === String(orderId));
        if (targetOrder) {
          const cleanPickup = String(payload.pickupOtp || '').trim() || targetOrder.pickupOtp || '8097';
          const cleanDrop = String(payload.dropOtp || '').trim() || targetOrder.dropOtp || targetOrder.deliveryOtp || '4468';
          const provider = payload.provider || targetOrder.logistics?.provider || 'Rapido';
          const isDispatch = Boolean(payload.isDispatch || (payload.type === 'vendor_self_dispatch' && payload.driverName));
          const nowIso = new Date().toISOString();

          targetOrder.pickupOtp = cleanPickup;
          targetOrder.dropOtp = cleanDrop;
          targetOrder.deliveryOtp = cleanDrop;
          targetOrder.logistics = {
            ...(targetOrder.logistics || {}),
            type: 'vendor_self_dispatch',
            provider: provider,
            driverName: payload.driverName !== undefined ? payload.driverName : (targetOrder.logistics?.driverName || ''),
            driverMobile: payload.driverMobile !== undefined ? payload.driverMobile : (targetOrder.logistics?.driverMobile || ''),
            rideBookingId: payload.rideBookingId !== undefined ? payload.rideBookingId : (targetOrder.logistics?.rideBookingId || ''),
            trackingUrl: payload.trackingUrl || targetOrder.logistics?.trackingUrl || '',
            pickupOtp: cleanPickup,
            dropOtp: cleanDrop,
            dispatchedAt: isDispatch ? (payload.dispatchedAt || targetOrder.logistics?.dispatchedAt || nowIso) : (targetOrder.logistics?.dispatchedAt || null),
            updatedAt: nowIso
          };

          if (isDispatch && targetOrder.status !== 'Delivered') {
            targetOrder.status = 'In Transit';
            targetOrder.stage = 'out_for_delivery';
            targetOrder.dispatchedAt = targetOrder.dispatchedAt || nowIso;
            targetOrder.statusMessage = `Out for delivery via ${provider} (Rider: ${targetOrder.logistics.driverName || 'Partner'}). Doorstep handover pending Customer Drop OTP.`;
            addNotification('admin', `Order #${orderId} dispatched via ${provider} (${targetOrder.logistics.driverName || 'Rider'}).`);
            if (targetOrder.customerUsername) {
              addNotification(targetOrder.customerUsername, `🛵 Order #${orderId} is out for delivery with ${provider}! Share your Drop OTP (${cleanDrop}) at doorstep.`);
            }
          }
        }
        break;
      }

      case 'verify_pickup': {
        const { orderId, enteredOtp, logisticsPayload } = payload;
        const targetOrder = state.orders.find(o => String(o.id) === String(orderId));
        if (!targetOrder) return NextResponse.json({ success: false, message: 'Order not found' }, { status: 404 });

        const cleanEntered = String(enteredOtp || '').trim();
        const cleanExpected = String(targetOrder.pickupOtp || '').trim();
        if (cleanEntered !== cleanExpected) {
          return NextResponse.json({ success: false, message: `Invalid Pickup OTP "${cleanEntered}". Expected: ${cleanExpected}` });
        }

        targetOrder.stage = 'out_for_delivery';
        targetOrder.status = 'In Transit';
        targetOrder.statusMessage = `Parcel collected from vendor via verified Pickup OTP. In transit with ${logisticsPayload?.provider || 'Express Logistics'}`;
        targetOrder.pickupVerified = true;
        targetOrder.pickedUpAt = new Date().toISOString();
        targetOrder.logistics = {
          ...(targetOrder.logistics || {}),
          ...(logisticsPayload || {}),
          pickupVerifiedAt: new Date().toISOString()
        };

        addNotification('admin', `Order #${orderId} Pickup OTP verified! Package collected and in transit.`);
        if (targetOrder.assignedVendorId) {
          addNotification(`vendor_${targetOrder.assignedVendorId}`, `Order #${orderId} handed over to delivery partner successfully.`);
        }
        if (targetOrder.customerUsername) {
          addNotification(targetOrder.customerUsername, `Your Order #${orderId} has been picked up from the workshop and is on its way!`);
        }
        break;
      }

      case 'verify_deliver': {
        const { orderId, enteredOtp, bypass } = payload;
        const targetOrder = state.orders.find(o => String(o.id) === String(orderId));
        if (!targetOrder) return NextResponse.json({ success: false, message: 'Order not found' }, { status: 404 });

        const cleanEntered = String(enteredOtp || '').trim();
        const cleanExpected = String(targetOrder.deliveryOtp || '').trim();
        if (!bypass && cleanEntered !== cleanExpected) {
          return NextResponse.json({ success: false, message: `Invalid Delivery OTP "${cleanEntered}". Customer must provide: ${cleanExpected}` });
        }

        targetOrder.stage = 'delivered';
        targetOrder.status = 'Delivered';
        targetOrder.statusMessage = 'Order successfully delivered to recipient upon OTP verification';
        targetOrder.deliveredAt = new Date().toISOString();
        targetOrder.otpVerified = true;

        addNotification('admin', `Order #${orderId} verified with OTP and Delivered`);
        if (targetOrder.assignedVendorId) {
          addNotification(`vendor_${targetOrder.assignedVendorId}`, `Order #${orderId} successfully delivered to customer.`);
        }
        if (targetOrder.customerUsername) {
          addNotification(targetOrder.customerUsername, `Order #${orderId} has been successfully delivered! We hope you loved it.`);
        }
        break;
      }

      case 'assign_order': {
        const { orderId, assignment } = payload;
        const targetOrder = state.orders.find(o => String(o.id) === String(orderId));
        if (targetOrder && assignment) {
          if (assignment.hasOwnProperty('assignedAdmin')) targetOrder.assignedAdmin = assignment.assignedAdmin;
          if (assignment.hasOwnProperty('assignedVendorId')) {
            targetOrder.assignedVendorId = assignment.assignedVendorId;
            const vendor = state.vendors.find(v => String(v.id) === String(assignment.assignedVendorId));
            targetOrder.assignedVendorName = vendor ? (vendor.businessName || vendor.name) : '';
          }
          if (assignment.hasOwnProperty('thirdPartyAssignment')) targetOrder.thirdPartyAssignment = assignment.thirdPartyAssignment;
          if (assignment.hasOwnProperty('assignmentAccepted')) targetOrder.assignmentAccepted = assignment.assignmentAccepted;

          if (assignment.assignedVendorId) {
            addNotification(`vendor_${assignment.assignedVendorId}`, `New order #${orderId} assigned to your store!`);
          }
        }
        break;
      }

      case 'save_feedback': {
        const { orderId, feedback } = payload;
        const targetOrder = state.orders.find(o => String(o.id) === String(orderId));
        if (targetOrder) {
          targetOrder.feedback = feedback;
          addNotification('admin', `Customer rated Order #${orderId}: ${feedback.rating} Stars`);
        }
        break;
      }

      // --- INVENTORY & VENDOR PRODUCTS ---
      case 'save_products': {
        state.inventory = payload.products;
        break;
      }

      case 'approve_product': {
        const { productId } = payload;
        const prod = state.inventory.find(p => String(p.id) === String(productId));
        if (prod) {
          prod.approvalStatus = 'approved';
          prod.approvedAt = new Date().toISOString();
          if (prod.vendorId) {
            addNotification(`vendor_${prod.vendorId}`, `Great news! Your product "${prod.name}" has been APPROVED and is live!`);
          }
        }
        break;
      }

      case 'reject_product': {
        const { productId, reason } = payload;
        const prod = state.inventory.find(p => String(p.id) === String(productId));
        if (prod) {
          prod.approvalStatus = 'rejected';
          prod.rejectionReason = reason;
          if (prod.vendorId) {
            addNotification(`vendor_${prod.vendorId}`, `Your product "${prod.name}" requires revision: ${reason}`);
          }
        }
        break;
      }

      case 'update_product': {
        const { productId, updateData, role } = payload;
        const prod = state.inventory.find(p => String(p.id) === String(productId));
        if (prod) {
          const isApproved = role === 'admin';
          Object.assign(prod, updateData);
          prod.approvalStatus = isApproved ? (prod.approvalStatus || 'approved') : 'pending';
          prod.editPending = !isApproved;
          prod.lastEditedBy = role;
          prod.updatedAt = new Date().toISOString();
          if (!isApproved) {
            addNotification('admin', `Product edit pending approval: "${prod.name}" by vendor ${prod.vendorName || 'Partner'}`);
          }
        }
        break;
      }

      case 'delete_product': {
        const { productId } = payload;
        state.inventory = state.inventory.filter(p => String(p.id) !== String(productId));
        break;
      }

      case 'toggle_hide_product': {
        const { productId, isHidden } = payload;
        const prod = state.inventory.find(p => String(p.id) === String(productId));
        if (prod) {
          prod.isHidden = isHidden;
          prod.visibilityUpdatedAt = new Date().toISOString();
        }
        break;
      }

      // --- CONFIG & NETWORK MANAGEMENT ---
      case 'save_vendors': {
        state.vendors = payload.vendors;
        break;
      }

      case 'register_vendor': {
        const { vendor } = payload;
        if (vendor) {
          if (!state.vendors) state.vendors = [];
          const idx = state.vendors.findIndex(v => String(v.id) === String(vendor.id));
          if (idx >= 0) {
            state.vendors[idx] = vendor;
          } else {
            state.vendors.push(vendor);
          }
          addNotification('admin', `New vendor registered: "${vendor.businessName}" (${vendor.name}) for approval.`);
        }
        break;
      }

      case 'approve_vendor': {
        const { vendorId } = payload;
        const vendor = state.vendors.find(v => String(v.id) === String(vendorId));
        if (vendor) {
          vendor.approved = true;
          vendor.status = 'approved';
          vendor.approvedAt = new Date().toISOString();
          addNotification(`vendor_${vendor.id}`, `Your vendor account "${vendor.businessName}" has been APPROVED!`);
        }
        break;
      }

      case 'reject_vendor': {
        const { vendorId, reason } = payload;
        const vendor = state.vendors.find(v => String(v.id) === String(vendorId));
        if (vendor) {
          vendor.approved = false;
          vendor.status = 'rejected';
          vendor.rejectionReason = reason;
          vendor.rejectedAt = new Date().toISOString();
          addNotification(`vendor_${vendor.id}`, `Your vendor application requires revision: ${reason}`);
        }
        break;
      }

      case 'save_admins': {
        state.admins = payload.admins;
        break;
      }

      case 'save_areas': {
        state.areas = payload.areas;
        break;
      }

      case 'save_societies': {
        state.societies = payload.societies;
        break;
      }

      case 'save_categories': {
        state.categories = payload.categories;
        break;
      }

      case 'save_hero_slides': {
        state.hero_slides = payload.hero_slides;
        break;
      }

      case 'save_cities': {
        state.cities = payload.cities;
        break;
      }

      case 'save_settings': {
        state.settings = { ...state.settings, ...payload.settings };
        break;
      }

      case 'save_coupons': {
        state.coupons = payload.coupons;
        break;
      }

      case 'add_notification': {
        addNotification(payload.username, payload.text);
        break;
      }

      case 'mark_notifications_read': {
        const userNotes = state.notifications?.[payload.username];
        if (Array.isArray(userNotes)) {
          userNotes.forEach(n => { n.read = true; });
        }
        break;
      }

      case 'clear_notifications': {
        if (state.notifications?.[payload.username]) {
          state.notifications[payload.username] = [];
        }
        break;
      }

      // --- SETTLEMENTS & TICKETS ---
      case 'settle_payout': {
        const { settlement } = payload;
        if (!state.settlements) state.settlements = [];
        state.settlements.unshift(settlement);
        addNotification(`vendor_${settlement.vendorId}`, `💰 Payout Processed: ₹${settlement.amount} via ${settlement.method} (Ref: ${settlement.refNumber})`);
        addNotification('admin', `Processed payout of ₹${settlement.amount} for ${settlement.vendorName}`);
        break;
      }

      case 'create_ticket': {
        const { ticket } = payload;
        if (!state.support_tickets) state.support_tickets = [];
        state.support_tickets.unshift(ticket);
        addNotification('admin', `Support Ticket #${ticket.id} raised: "${ticket.subject}" by ${ticket.customerName}`);
        break;
      }

      case 'reply_ticket': {
        const { ticketId, replyMsg, newStatus } = payload;
        const targetTicket = state.support_tickets?.find(t => String(t.id) === String(ticketId));
        if (targetTicket) {
          if (!targetTicket.messages) targetTicket.messages = [];
          targetTicket.messages.push(replyMsg);
          if (newStatus) targetTicket.status = newStatus;
          targetTicket.updatedAt = new Date().toISOString();
          if (targetTicket.customerUsername) {
            addNotification(targetTicket.customerUsername, `Support team replied to your Ticket #${ticketId} ("${targetTicket.subject}")`);
          }
        }
        break;
      }

      // --- B2B VENDOR-TO-VENDOR WHOLESALE ORDERS ---
      case 'create_b2b_order': {
        const { order } = payload;
        if (!state.b2b_orders) state.b2b_orders = [];
        state.b2b_orders.unshift(order);
        addNotification(`vendor_${order.sellerVendorId}`, `New B2B Order #${order.id} from ${order.buyerVendorName}: ₹${order.totalAmount}`);
        addNotification(`vendor_${order.buyerVendorId}`, `B2B Order #${order.id} placed with ${order.sellerVendorName}`);
        addNotification('admin', `B2B Wholesale Order #${order.id} placed: ${order.buyerVendorName} -> ${order.sellerVendorName} (₹${order.totalAmount})`);
        break;
      }

      case 'update_b2b_order_status': {
        const { orderId, newStatus, message } = payload;
        if (!state.b2b_orders) state.b2b_orders = [];
        const target = state.b2b_orders.find(o => String(o.id) === String(orderId));
        if (target) {
          target.status = newStatus;
          if (message) target.statusMessage = message;
          target.updatedAt = new Date().toISOString();
        }
        break;
      }

      // --- CLIENT MERGE (Initial load from existing client data) ---
      case 'bulk_sync': {
        const clientData = payload;
        if (clientData) {
          if (Array.isArray(clientData.orders) && clientData.orders.length > 0) {
            const existingIds = new Set(state.orders.map(o => String(o.id)));
            clientData.orders.forEach(o => {
              if (!existingIds.has(String(o.id))) {
                state.orders.push(o);
              }
            });
            state.orders.sort((a, b) => {
              const timeA = new Date(a.timestamp || a.createdAt || 0).getTime() || 0;
              const timeB = new Date(b.timestamp || b.createdAt || 0).getTime() || 0;
              return timeB - timeA;
            });
          }
        }
        break;
      }

      default:
        console.warn(`Unknown sync action: ${action}`);
        break;
    }

    await saveServerState(state);

    return NextResponse.json({
      success: true,
      version: state.version,
      lastUpdated: state.lastUpdated,
      data: state
    });
  } catch (err) {
    console.error('POST /api/sync error:', err);
    return NextResponse.json({ error: 'Failed to process sync mutation' }, { status: 500 });
  }
}

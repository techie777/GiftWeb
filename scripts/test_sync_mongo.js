const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI || "mongodb+srv://rockybundela7_db_user:RXN0vv1P9MTMmgvW@cluster0.xkt4wnt.mongodb.net/giftportal?retryWrites=true&w=majority";

async function verify() {
  console.log("🔍 Verifying MongoDB Atlas data...");
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db('giftportal');

    const state = await db.collection('system_state').findOne({ _id: 'current_state' });
    if (!state) {
      console.error("❌ 'current_state' document not found in 'system_state'!");
      return;
    }

    console.log(" State version:", state.version);
    console.log(" Last updated:", state.lastUpdated);
    console.log(" Inventory items in MongoDB:", state.inventory?.length);
    console.log(" Orders in MongoDB:", state.orders?.length);
    console.log(" Vendors in MongoDB:", state.vendors?.length);

    const inventoryCount = await db.collection('inventory').countDocuments();
    const ordersCount = await db.collection('orders').countDocuments();
    console.log(` Direct collection counts -> inventory: ${inventoryCount}, orders: ${ordersCount}`);

    console.log(" MongoDB Atlas verification completed successfully!");
  } catch (err) {
    console.error("❌ Verification failed:", err);
  } finally {
    await client.close();
  }
}

verify();


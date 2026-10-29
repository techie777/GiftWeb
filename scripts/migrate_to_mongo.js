const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

const uri = process.env.MONGODB_URI || "mongodb+srv://rockybundela7_db_user:RXN0vv1P9MTMmgvW@cluster0.xkt4wnt.mongodb.net/giftportal?retryWrites=true&w=majority";
const dbName = "giftportal";
const DB_FILE_PATH = path.join(__dirname, '..', 'data', 'server_db.json');

async function migrate() {
  console.log("🚀 Starting migration from server_db.json to MongoDB Atlas...");

  if (!fs.existsSync(DB_FILE_PATH)) {
    console.error("❌ server_db.json not found at:", DB_FILE_PATH);
    process.exit(1);
  }

  const raw = fs.readFileSync(DB_FILE_PATH, 'utf-8');
  const data = JSON.parse(raw);

  const client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 10000
  });

  try {
    await client.connect();
    console.log(" Connected to MongoDB Atlas!");
    const db = client.db(dbName);

    // 1. System state / full snapshot collection for ultra-fast sync
    console.log("📦 Storing app state in 'system_state' collection...");
    await db.collection('system_state').updateOne(
      { _id: 'current_state' },
      { $set: { ...data, updatedAt: new Date().toISOString() } },
      { upsert: true }
    );

    // 2. Individual collections for direct querying & scalability
    const collectionsToMigrate = [
      { name: 'inventory', key: 'inventory', idField: 'id' },
      { name: 'orders', key: 'orders', idField: 'id' },
      { name: 'vendors', key: 'vendors', idField: 'id' },
      { name: 'admins', key: 'admins', idField: 'username' },
      { name: 'deals', key: 'deals', idField: 'id' },
      { name: 'categories', key: 'categories', idField: 'id' },
      { name: 'hero_slides', key: 'hero_slides', idField: 'id' },
      { name: 'areas', key: 'areas', idField: 'id' },
      { name: 'cities', key: 'cities', idField: 'id' },
      { name: 'processed_payments', key: 'processed_payments', idField: 'paymentId' },
      { name: 'b2b_orders', key: 'b2b_orders', idField: 'id' }
    ];

    for (const item of collectionsToMigrate) {
      const records = data[item.key];
      if (Array.isArray(records) && records.length > 0) {
        const col = db.collection(item.name);
        console.log(` Migrating ${records.length} records into '${item.name}'...`);
        for (const doc of records) {
          const docId = doc[item.idField] || doc.id || doc._id;
          if (docId !== undefined && docId !== null) {
            await col.updateOne(
              { [item.idField]: docId },
              { $set: doc },
              { upsert: true }
            );
          } else {
            await col.insertOne(doc);
          }
        }
      }
    }

    // 3. Settings collection
    if (data.settings) {
      console.log(" Saving settings to 'settings' collection...");
      await db.collection('settings').updateOne(
        { _id: 'global_settings' },
        { $set: { ...data.settings, updatedAt: new Date().toISOString() } },
        { upsert: true }
      );
    }

    console.log("\n🎉 ALL DATA MIGRATED TO MONGODB ATLAS SUCCESSFULLY!");
    console.log(`- 📦 Products (Inventory): ${data.inventory?.length || 0}`);
    console.log(`- 📋 Orders: ${data.orders?.length || 0}`);
    console.log(`- 🏪 Vendors: ${data.vendors?.length || 0}`);
    console.log(`- 🏙️ Cities: ${data.cities?.length || 0}`);
    console.log(`- 🏷️ Categories: ${data.categories?.length || 0}`);
    console.log(`- 🖼️ Hero Slides: ${data.hero_slides?.length || 0}`);

  } catch (err) {
    console.error("❌ Migration error:", err);
  } finally {
    await client.close();
  }
}

migrate();


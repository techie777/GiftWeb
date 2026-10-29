import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || "mongodb+srv://rockybundela7_db_user:RXN0vv1P9MTMmgvW@cluster0.xkt4wnt.mongodb.net/giftportal?retryWrites=true&w=majority";
const dbName = process.env.MONGODB_DB || "giftportal";

let client;
let clientPromise;

if (!uri) {
  throw new Error('Please add your MONGODB_URI to .env.local');
}

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so the MongoClient is not repeated on HMR
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
    });
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable
  client = new MongoClient(uri, {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
  });
  clientPromise = client.connect();
}

export async function getMongoDb() {
  const connectedClient = await clientPromise;
  return connectedClient.db(dbName);
}

export default clientPromise;


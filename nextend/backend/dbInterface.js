import { MongoClient } from 'mongodb';

const uri = 'mongodb://192.168.63.135:27017';
const dbName = 'botdata';

let client;

export const connectToDatabase = async () => {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
    console.log('Connected to MongoDB');
  }
  return client.db(dbName);
};

export const queryDatabase = async (collectionName, query = {}) => {
  const db = await connectToDatabase();
  const collection = db.collection(collectionName);
  return collection.find(query).toArray();
};

export const queryDatabaseWithLimit = async (collectionName, limit, query = {}) => {
  const db = await connectToDatabase();
  const collection = db.collection(collectionName);
  return collection.find(query).limit(limit).toArray();
};

export const insertIntoDatabase = async (collectionName, document) => {
  const db = await connectToDatabase();
  const collection = db.collection(collectionName);
  return collection.insertOne(document);
};

export const updateDatabase = async (collectionName, query, update) => {
  const db = await connectToDatabase();
  const collection = db.collection(collectionName);
  return collection.updateOne(query, { $set: update });
};

export const deleteFromDatabase = async (collectionName, query) => {
  const db = await connectToDatabase();
  const collection = db.collection(collectionName);
  return collection.deleteOne(query);
};

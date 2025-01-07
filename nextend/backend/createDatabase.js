import { MongoClient } from 'mongodb';

const uri = 'mongodb://192.168.63.135:27017';
const dbName = 'botdata';

const createDatabase = async () => {
  let client;
  try {
    client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(dbName);
    console.log(`Database "${dbName}" created`);

    // Optionally, create a collection to ensure the database is created
    await db.createCollection('exampleCollection');
    console.log('Collection "exampleCollection" created');
  } catch (error) {
    console.error('Error creating database:', error);
  } finally {
    if (client) {
      await client.close();
    }
  }
};

createDatabase();

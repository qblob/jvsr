import { connectToDatabase } from './dbInterface.js';

const deleteAllDocuments = async () => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('exampleCollection');
    const result = await collection.deleteMany({});
    console.log(`Deleted ${result.deletedCount} documents from exampleCollection`);
  } catch (error) {
    console.error('Error deleting documents:', error);
    throw error;
  } finally {
    process.exit(); // Finish program execution
  }
};

deleteAllDocuments();

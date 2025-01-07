import { queryDatabase } from './dbInterface.js';

const retrieveAllData = async () => {
  try {
    const data = await queryDatabase('exampleCollection');
    console.log('Data:', data);
    return data;
  } catch (error) {
    console.error('Error retrieving data:', error);
    throw error;
  } finally {
    process.exit(); // Finish program execution
  }
};

retrieveAllData();

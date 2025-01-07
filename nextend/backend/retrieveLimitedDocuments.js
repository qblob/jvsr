import { queryDatabaseWithLimit } from './dbInterface.js';

const retrieveLimitedData = async (limit) => {
  try {
    const data = await queryDatabaseWithLimit('exampleCollection', limit);
    console.log('Data:', data);
    return data;
  } catch (error) {
    console.error('Error retrieving data:', error);
    throw error;
  }
};

export default retrieveLimitedData;
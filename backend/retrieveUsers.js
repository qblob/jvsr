import { queryDatabase } from './dbInterface.js';

const retrieveAllUsers = async () => {
  try {
    const users = await queryDatabase('user');
    console.log('Users:', users);
    return users;
  } catch (error) {
    console.error('Error retrieving users:', error);
    throw error;
  } finally {
    process.exit(); // Finish program execution
  }
};

retrieveAllUsers();

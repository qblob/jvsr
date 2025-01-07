import { insertIntoDatabase } from './dbInterface.js';
import fs from 'fs';
import path from 'path';
import { Binary } from 'mongodb';

const imagesDirectory = path.join(path.resolve(), 'images');

const getImages = () => {
  try {
    return fs.readdirSync(imagesDirectory).map((fileName, index) => {
      const imagePath = path.join(imagesDirectory, fileName);
      const imageBuffer = fs.readFileSync(imagePath);
      return {
        image: new Binary(imageBuffer),
        text: `Sample text ${index + 1}`,
        date: new Date().toISOString(),
      };
    });
  } catch (error) {
    console.error('Error reading images directory:', error);
    throw error;
  }
};

const sampleData = getImages();

const insertSampleData = async () => {
  try {
    for (const document of sampleData) {
      await insertIntoDatabase('exampleCollection', document);
    }
    console.log('Inserted sample documents into exampleCollection');
  } catch (error) {
    console.error('Error inserting sample data:', error);
    throw error;
  } finally {
    process.exit(); // Finish program execution
  }
};

insertSampleData();

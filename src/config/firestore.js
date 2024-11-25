const { Firestore } = require('@google-cloud/firestore');
const path = require('path');
require('dotenv').config();

const serviceAccountPath = path.join(__dirname, '..', 'config', 'latihan-scancare-4762a043bc70.json');


const db = new Firestore({
  projectId: process.env.FIREBASE_PROJECT_ID,
  keyFilename: path.resolve(serviceAccountPath),
});

db.listCollections()
  .then((collections) => {
    console.log('Collections available:', collections.map((col) => col.id));
  })
  .catch((error) => {
    console.error('Error accessing Firestore:', error.message);
  });

module.exports = { db };

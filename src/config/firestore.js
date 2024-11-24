const { Firestore } = require('@google-cloud/firestore');
const path = require('path');


const serviceAccountPath = 'D:\\KULIAH\\BANGKIT BATCH 2_DICODING 2024\\Capstone Proyek\\Api-Scancare\\src\\config\\latihan-scancare-4762a043bc70.json';

console.log('Service Account Path:', serviceAccountPath);

const db = new Firestore({
  projectId: 'latihan-scancare',
  keyFilename: serviceAccountPath,
});


db.listCollections().then(collections => {
  console.log('Collections available:', collections);
}).catch(error => {
  console.log('Error accessing Firestore:', error);
});

module.exports = { db };

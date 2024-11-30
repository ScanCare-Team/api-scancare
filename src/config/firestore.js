// const { Firestore } = require('@google-cloud/firestore');
// require('dotenv').config();

// //const serviceAccountPath = path.join(__dirname, '..', 'config', 'project-scancare-3455aa2c9529.json');
// //const serviceAccountPath = '/secrets/service-account.json';
// //const serviceAccountPath = process.env.FIREBASE_KEY_FILE_PATH
// //const serviceAccountPath = path.resolve(process.env.FIREBASE_KEY_FILE_PATH);
// const serviceAccountPath = process.env.FIREBASE_KEY_FILE_PATH;

// const db = new Firestore({
//   projectId: process.env.FIREBASE_PROJECT_ID,
//   keyFilename: serviceAccountPath,
// });

// db.listCollections()
//   .then((collections) => {
//     console.log('Collections available:', collections.map((col) => col.id));
//   })
//   .catch((error) => {
//     console.error('Error accessing Firestore:', error.message);
//   });

// module.exports = { db };


const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.applicationDefault()  
});

const db = admin.firestore();
module.exports = { db };
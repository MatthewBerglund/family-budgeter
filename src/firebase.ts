import { initializeApp } from 'firebase/app';
import { getFirestore, initializeFirestore, connectFirestoreEmulator, FirestoreSettings } from 'firebase/firestore';

let firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: 'family-budgeter-1.firebaseapp.com',
  projectId: 'family-budgeter-1',
  storageBucket: 'family-budgeter-1.appspot.com',
  messagingSenderId: '314882244523',
  appId: '1:314882244523:web:262b12470ec58b441f1cee',
};

const app = initializeApp(firebaseConfig);
let db;

if (process.env.NODE_ENV === 'test') {
  // Connect emulator for Jest testing
  db = getFirestore(app);
  connectFirestoreEmulator(db, 'localhost', 8080);
} else if (window.location.hostname === 'localhost') {
  // Connect emulator for Cypress testing
  // settings needed for Firestore support in Cypress
  // `experimentalForceLongPolling` may be removed in the future
  // (see https://github.com/cypress-io/cypress/issues/6350)
  db = initializeFirestore(app, { experimentalForceLongPolling: true });
  connectFirestoreEmulator(db, 'localhost', 8080);
} else {
  // Live settings
  db = getFirestore(app);
}



export default db;

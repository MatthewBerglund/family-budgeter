import { initializeApp } from 'firebase/app';
import { getFirestore, initializeFirestore, connectFirestoreEmulator } from 'firebase/firestore';

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

if (window.location.hostname === 'localhost') {
  // Emulator settings
  // Needed for Firestore support in Cypress (see https://github.com/cypress-io/cypress/issues/6350)
  // `experimentalForceLongPolling` may be removed in the future
  db = initializeFirestore(app, { experimentalForceLongPolling: true, merge: true });
  connectFirestoreEmulator(db, 'localhost', 8080);
} else {
  // Live settings
  db = getFirestore(app);
}

export default db;

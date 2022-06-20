import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

let firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: 'family-budgeter-1.firebaseapp.com',
  projectId: 'family-budgeter-1',
  storageBucket: 'family-budgeter-1.appspot.com',
  messagingSenderId: '314882244523',
  appId: '1:314882244523:web:262b12470ec58b441f1cee',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

if (window.location.hostname === 'localhost') {
  connectFirestoreEmulator(db, 'localhost', 8080);
}

export default db;

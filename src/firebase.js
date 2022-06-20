import firebase from 'firebase/app';
import 'firebase/firestore';

let firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: 'family-budgeter-1.firebaseapp.com',
  projectId: 'family-budgeter-1',
  storageBucket: 'family-budgeter-1.appspot.com',
  messagingSenderId: '314882244523',
  appId: '1:314882244523:web:262b12470ec58b441f1cee',
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

if (window.location.hostname === 'localhost') {
  db.useEmulator('localhost', 8080);
  // Settings to work-around cypress error "could not reach cloud firestore backend"
  // experimentalForceLongPolling may be removed in the future
  db.settings({
    experimentalForceLongPolling: true,
    merge: true,
  });
}

export default db;

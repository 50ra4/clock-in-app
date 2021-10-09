import firebase from './firebase.import';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  // databaseURL: process.env.REACT_APP_DATABASE_URL,
  // measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firestore = firebaseApp.firestore();
const fireAuthentication = firebaseApp.auth();

export type FirestoreError = firebase.firestore.FirestoreError;

export { firebase, firestore, fireAuthentication };

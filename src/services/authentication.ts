import { fireAuthentication } from 'services/firebase';

const { setPersistence, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } =
  fireAuthentication;

export { setPersistence, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged };

import { USER_DOCUMENT_PATH } from 'constants/firestore';
import { firebase, firestore } from './firebase';
import { User } from 'types';

export const createUser = async (uid: string, { firstName, lastName }: User) => {
  const timestamp = firebase.firestore.FieldValue.serverTimestamp();
  const documentRef = firestore.collection(USER_DOCUMENT_PATH).doc(uid);
  await documentRef.set({
    firstName,
    lastName,
    createdAt: timestamp,
    updatedAt: timestamp,
  });
};

export const updateUser = async (uid: string, { firstName, lastName }: User) => {
  const timestamp = firebase.firestore.FieldValue.serverTimestamp();
  const documentRef = firestore.collection(USER_DOCUMENT_PATH).doc(uid);
  await documentRef.set({
    firstName,
    lastName,
    updatedAt: timestamp,
  });
};

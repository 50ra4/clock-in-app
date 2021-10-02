import { USER_COLLECTION_PATH } from 'constants/firestore';
import { firebase, firestore } from './firebase';
import { User } from 'types';

export const createUser = async (uid: string, { firstName, lastName }: User) => {
  const timestamp = firebase.firestore.FieldValue.serverTimestamp();
  const documentRef = firestore.collection(USER_COLLECTION_PATH).doc(uid);
  await documentRef.set({
    firstName,
    lastName,
    createdAt: timestamp,
    updatedAt: timestamp,
  });
};

export const updateUser = async (uid: string, { firstName, lastName }: User) => {
  const timestamp = firebase.firestore.FieldValue.serverTimestamp();
  const documentRef = firestore.collection(USER_COLLECTION_PATH).doc(uid);
  await documentRef.set({
    firstName,
    lastName,
    updatedAt: timestamp,
  });
};

export const readUserByUid = async (uid: string): Promise<User> => {
  const documentRef = firestore.collection(USER_COLLECTION_PATH).doc(uid);
  const snapshot = await documentRef.get();
  return {
    firstName: snapshot.get('firstName') ?? '',
    lastName: snapshot.get('lastName') ?? '',
  };
};

import { fireAuthentication } from './firebase';

export const signInWithPassword = async (email: string, password: string) => {
  const result = await fireAuthentication.setPersistence('session').catch((err) => new Error(err.message));
  if (result instanceof Error) {
    throw result;
  }
  return fireAuthentication.signInWithEmailAndPassword(email, password).then((data) => data.user);
};

export const signUp = async (email: string, password: string) => {
  return await fireAuthentication.createUserWithEmailAndPassword(email, password).then((data) => data.user);
};

export const signOut = async () => {
  return await fireAuthentication.signOut();
};

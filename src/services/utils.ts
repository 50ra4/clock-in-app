import { Time } from 'types';
import { firebase } from './firebase';
import { omitUndefinedProps } from 'utils/converterUtil';

export const createAdditionalProps = (uid: string, isUpdated?: boolean) => {
  const timestamp = firebase.firestore.FieldValue.serverTimestamp();

  return {
    ...(isUpdated ? {} : { createdAt: timestamp }),
    updatedAt: timestamp,
  };
};

export const formatTimeToQuery = (time?: Time) => (!time ? {} : omitUndefinedProps(time));

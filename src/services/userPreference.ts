import { firestore } from './firebase';

import { TimecardUserPreference } from 'types';
import { replacePathParams } from 'utils/pathUtil';
import { TIMECARD_USER_PREFERENCE_DOCUMENT_PATH } from 'constants/firestore';
import {
  queryToRestTime,
  queryToTimecardUserPreference,
  restTimeToDocument,
  timecardUserPreferenceToDocument,
} from './converter';

export const readTimecardUserPreference = async (uid: string): Promise<TimecardUserPreference> => {
  const rootDocumentRef = firestore.doc(replacePathParams(TIMECARD_USER_PREFERENCE_DOCUMENT_PATH, { uid }));
  const otherRestTimeCollectionRef = rootDocumentRef.collection('other-rest-times');

  const {
    workingStart = {},
    workingEnd = {},
    lunchRestTime = {},
    roundDownMinute = 0,
    regularHolidays = [],
  } = await rootDocumentRef.get().then(queryToTimecardUserPreference);

  const otherRestTimes = await otherRestTimeCollectionRef
    .orderBy('order', 'asc')
    .get()
    .then((snapshot) => snapshot.docs.map(queryToRestTime));

  return {
    workingTimes: { start: workingStart, end: workingEnd },
    lunchRestTime,
    roundDownMinute,
    regularHolidays,
    otherRestTimes,
  };
};

export const writeTimecardUserPreference = async (uid: string, data: TimecardUserPreference) => {
  const { otherRestTimes } = data;

  const rootDocumentRef = firestore.doc(replacePathParams(TIMECARD_USER_PREFERENCE_DOCUMENT_PATH, { uid }));
  const otherRestTimeCollectionRef = rootDocumentRef.collection('other-rest-times');

  const rootDocument = await rootDocumentRef.get();
  const alreadySavedRestTimes = await otherRestTimeCollectionRef
    .get()
    .then((snapshot) => snapshot.docs.map(queryToRestTime));

  const batch = firestore.batch();

  // otherRestTimes
  const otherRestTimeIdsToDelete = alreadySavedRestTimes.filter(
    ({ id: previousId }) => !otherRestTimes.some(({ id: currentId }) => currentId === previousId),
  );
  otherRestTimeIdsToDelete.forEach(({ id }) => {
    const document = otherRestTimeCollectionRef.doc(id);
    batch.delete(document);
  });

  otherRestTimes.forEach((restTime, index) => {
    batch.set(otherRestTimeCollectionRef.doc(restTime.id), restTimeToDocument(restTime, { uid, index }), {
      merge: true,
    });
  });

  // root
  batch.set(rootDocumentRef, timecardUserPreferenceToDocument(data, { uid, isUpdated: rootDocument.exists }), {
    merge: true,
  });

  await batch.commit();
};

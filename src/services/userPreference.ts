import { firestore } from './firebase';

import { TimecardUserPreference } from 'types';
import { replacePathParams } from 'utils/pathUtil';
import { TIMECARD_USER_PREFERENCE_DOCUMENT_PATH } from 'constants/firestore';
import { createAdditionalProps, formatTimeToQuery } from './utils';
import { omitUndefinedProps } from 'utils/converterUtil';
import { queryToRestTime, queryToTimecardUserPreference } from './converter';

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
  const {
    otherRestTimes,
    workingTimes: { start: workingStart, end: workingEnd },
    ...rest
  } = data;

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

  otherRestTimes.forEach(({ id, start, end }, index) => {
    batch.set(
      otherRestTimeCollectionRef.doc(id),
      {
        order: index,
        start: formatTimeToQuery(start),
        end: formatTimeToQuery(end),
        ...createAdditionalProps(uid, !!id),
      },
      { merge: true },
    );
  });

  // root
  batch.set(
    rootDocumentRef,
    {
      ...omitUndefinedProps({ ...rest, workingStart, workingEnd }),
      ...createAdditionalProps(uid, rootDocument.exists),
    },
    { merge: true },
  );

  await batch.commit();
};

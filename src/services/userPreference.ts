import { firestore, firebase } from './firebase';

import { RestTime, TimecardUserPreference } from 'types';
import { replacePathParams } from 'utils/pathUtil';
import { TIMECARD_USER_PREFERENCE_DOCUMENT_PATH } from 'constants/firestore';
import { createAdditionalProps, formatTimeToQuery } from './utils';
import { omitUndefinedProps } from 'utils/converterUtil';

export const queryToRestTime = (
  query: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>,
): RestTime =>
  ({
    id: query.id,
    start: query.get('start'),
    end: query.get('end'),
    // FIXME: RestTime type
    updatedAt: query.get('updatedAt'),
    createdAt: query.get('createdAt'),
  } as RestTime);

const docToTimecardUserPreference = (doc: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>) => ({
  workingStart: doc.get('workingStart'),
  workingEnd: doc.get('workingEnd'),
  roundDownMinute: doc.get('roundDownMinute'),
  regularHolidays: doc.get('regularHolidays'),
  lunchRestTime: doc.get('lunchRestTime'),
  restTimes: [], // NOTE: fetch sub-collection
  // FIXME: TimecardUserPreference type
  updatedAt: doc.get('updatedAt'),
  createdAt: doc.get('createdAt'),
});

export const readTimecardUserPreference = async (uid: string): Promise<TimecardUserPreference> => {
  const rootDocumentRef = firestore.doc(replacePathParams(TIMECARD_USER_PREFERENCE_DOCUMENT_PATH, { uid }));
  const otherRestTimeCollectionRef = rootDocumentRef.collection('other-rest-times');

  const {
    workingStart = {},
    workingEnd = {},
    lunchRestTime = {},
    roundDownMinute = 0,
    regularHolidays = [],
  } = await rootDocumentRef.get().then(docToTimecardUserPreference);

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

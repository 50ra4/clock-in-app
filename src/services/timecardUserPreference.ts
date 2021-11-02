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
  roundDownMinutes: doc.get('roundDownMinutes'),
  regularHolidays: doc.get('regularHolidays'),
  restTimes: [], // NOTE: fetch sub-collection
  // FIXME: TimecardUserPreference type
  updatedAt: doc.get('updatedAt'),
  createdAt: doc.get('createdAt'),
});

export const readTimecardUserPreference = async (uid: string): Promise<TimecardUserPreference> => {
  const rootDocumentRef = firestore.doc(replacePathParams(TIMECARD_USER_PREFERENCE_DOCUMENT_PATH, { uid }));
  const restTimeCollectionRef = rootDocumentRef.collection('rest-times');

  const {
    workingStart = {},
    workingEnd = {},
    roundDownMinutes = 0,
    regularHolidays = [],
  } = await rootDocumentRef.get().then(docToTimecardUserPreference);

  const restTimes = await restTimeCollectionRef
    .orderBy('order', 'asc')
    .get()
    .then((snapshot) => snapshot.docs.map(queryToRestTime));

  return {
    workingHours: { start: workingStart, end: workingEnd },
    roundDownMinutes,
    regularHolidays,
    restTimes,
  };
};

export const writeTimecardUserPreference = async (uid: string, data: TimecardUserPreference) => {
  const {
    restTimes,
    workingHours: { start: workingStart, end: workingEnd },
    ...rest
  } = data;

  const rootDocumentRef = firestore.doc(replacePathParams(TIMECARD_USER_PREFERENCE_DOCUMENT_PATH, { uid }));
  const restTimeCollectionRef = rootDocumentRef.collection('rest-times');

  const rootDocument = await rootDocumentRef.get();
  const alreadySavedRestTimes = await restTimeCollectionRef
    .get()
    .then((snapshot) => snapshot.docs.map(queryToRestTime));

  const batch = firestore.batch();

  // restTimes
  const restTimeIdsToDelete = alreadySavedRestTimes.filter(
    ({ id: previousId }) => !restTimes.some(({ id: currentId }) => currentId === previousId),
  );
  restTimeIdsToDelete.forEach(({ id }) => {
    const document = restTimeCollectionRef.doc(id);
    batch.delete(document);
  });

  restTimes.forEach(({ id, start, end }, index) => {
    batch.set(
      restTimeCollectionRef.doc(id),
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
  batch.set(rootDocumentRef, {
    ...omitUndefinedProps({ ...rest, workingStart, workingEnd }),
    ...createAdditionalProps(uid, rootDocument.exists),
  });

  await batch.commit();
};
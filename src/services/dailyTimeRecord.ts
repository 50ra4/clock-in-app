import { DATE_FORMAT } from 'constants/dateFormat';
import {
  DAILY_RECORDS_COLLECTION_PATH,
  DAILY_IN_HOUSE_WORK_COLLECTION_PATH,
  DAILY_REST_TIME_COLLECTION_PATH,
} from 'constants/firestore';
import { DailyTimeRecord, InHouseWork, RestTime, Time } from 'types';
import { omitUndefinedProps } from 'utils/converterUtil';
import { dateStringToDateString } from 'utils/dateUtil';
import { replacePathParams } from 'utils/pathUtil';
import { firestore, firebase } from './firebase';

const createAdditionalProps = (uid: string, isUpdated?: boolean) => {
  const timestamp = firebase.firestore.FieldValue.serverTimestamp();

  return {
    ...(isUpdated ? {} : { createdAt: timestamp }),
    updatedAt: timestamp,
  };
};

const formatTimeToQuery = (time?: Time) => (!time ? {} : omitUndefinedProps(time));

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
  } as InHouseWork);

export const queryToInHouseWork = (
  query: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>,
): InHouseWork =>
  ({
    id: query.id,
    start: query.get('start'),
    end: query.get('end'),
    remarks: query.get('remarks'),
    // FIXME: InHouseWork type
    updatedAt: query.get('updatedAt'),
    createdAt: query.get('createdAt'),
  } as InHouseWork);

export const queryToDailyTimeRecord = (
  query: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>,
): DailyTimeRecord =>
  ({
    date: query.id,
    start: query.get('start'),
    end: query.get('end'),
    remarks: query.get('remarks'),
    restTimes: [],
    inHouseWorks: [],
    // FIXME: DailyTimeRecords type
    updatedAt: query.get('updatedAt'),
    createdAt: query.get('createdAt'),
  } as DailyTimeRecord);

const getRestTimes = async (uid: string, day: string): Promise<RestTime[]> => {
  const month = dateStringToDateString(day, { from: DATE_FORMAT.dateISO, to: DATE_FORMAT.yearMonthISO });
  return firestore
    .collection(replacePathParams(DAILY_REST_TIME_COLLECTION_PATH, { uid, month, day }))
    .get()
    .then((snapshot) => snapshot.docs.map(queryToRestTime));
};

const getInHouseWorks = async (uid: string, day: string): Promise<InHouseWork[]> => {
  const month = dateStringToDateString(day, { from: DATE_FORMAT.dateISO, to: DATE_FORMAT.yearMonthISO });
  return firestore
    .collection(replacePathParams(DAILY_IN_HOUSE_WORK_COLLECTION_PATH, { uid, month, day }))
    .get()
    .then((snapshot) => snapshot.docs.map(queryToInHouseWork));
};

export const getRestTimesAndInHouseWorks = async (
  uid: string,
  day: string,
): Promise<Pick<DailyTimeRecord, 'inHouseWorks' | 'restTimes'>> => {
  const [inHouseWorks, restTimes] = await Promise.all([await getInHouseWorks(uid, day), await getRestTimes(uid, day)]);
  return { inHouseWorks, restTimes };
};

export const getDailyTimeRecords = async (uid: string, month: string): Promise<DailyTimeRecord[]> =>
  firestore
    .collection(replacePathParams(DAILY_RECORDS_COLLECTION_PATH, { uid, month }))
    .get()
    .then((snapshot) => snapshot.docs.map(queryToDailyTimeRecord));

export const createUpdateDailyTimeRecord = async (uid: string, data: DailyTimeRecord) => {
  // TODO: Save restTimes separately
  const { restTimes, inHouseWorks, date, ...rest } = data;

  const month = dateStringToDateString(date, { from: DATE_FORMAT.dateISO, to: DATE_FORMAT.yearMonthISO });

  const rootDocumentRef = firestore
    .collection(replacePathParams(DAILY_RECORDS_COLLECTION_PATH, { uid, month }))
    .doc(date);
  const rootDocument = await rootDocumentRef.get();
  const alreadySavedInHouseWorks = await getInHouseWorks(uid, date);
  const alreadySavedRestTimes = await getRestTimes(uid, date);

  const inHouseWorkCollectionRef = firestore.collection(
    replacePathParams(DAILY_IN_HOUSE_WORK_COLLECTION_PATH, { uid, month, day: date }),
  );

  const restTimeCollectionRef = firestore.collection(
    replacePathParams(DAILY_REST_TIME_COLLECTION_PATH, { uid, month, day: date }),
  );

  const batch = firestore.batch();
  // inHouseWorks
  const inHouseWorkIdsToDelete = alreadySavedInHouseWorks.filter(
    ({ id: previousId }) => !inHouseWorks.some(({ id: currentId }) => currentId === previousId),
  );
  inHouseWorkIdsToDelete.forEach(({ id }) => {
    const document = inHouseWorkCollectionRef.doc(id);
    batch.delete(document);
  });

  inHouseWorks.forEach(({ id, start, end, remarks }) => {
    const isUpdated = !!id && alreadySavedInHouseWorks.some(({ id: _id }) => _id === id);
    const documentRef = isUpdated ? inHouseWorkCollectionRef.doc(id) : inHouseWorkCollectionRef.doc();
    batch.set(
      documentRef,
      {
        start: formatTimeToQuery(start),
        end: formatTimeToQuery(end),
        remarks,
        ...createAdditionalProps(uid, !!isUpdated),
      },
      { merge: true },
    );
  });

  // restTimes
  const restTimeIdsToDelete = alreadySavedRestTimes.filter(
    ({ id: previousId }) => !restTimes.some(({ id: currentId }) => currentId === previousId),
  );
  restTimeIdsToDelete.forEach(({ id }) => {
    const document = restTimeCollectionRef.doc(id);
    batch.delete(document);
  });

  restTimes.forEach(({ id, start, end }) => {
    batch.set(
      restTimeCollectionRef.doc(id),
      {
        start: formatTimeToQuery(start),
        end: formatTimeToQuery(end),
        ...createAdditionalProps(uid, !!id),
      },
      { merge: true },
    );
  });

  // root
  batch.set(rootDocumentRef, {
    ...omitUndefinedProps({ ...rest }),
    ...createAdditionalProps(uid, rootDocument.exists),
  });

  await batch.commit();
};

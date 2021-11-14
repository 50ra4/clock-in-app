import { DATE_FORMAT } from 'constants/dateFormat';
import {
  DAILY_RECORDS_COLLECTION_PATH,
  DAILY_IN_HOUSE_WORK_COLLECTION_PATH,
  DAILY_REST_TIME_COLLECTION_PATH,
} from 'constants/firestore';
import { DailyTimeRecord, InHouseWork, RestTime } from 'types';
import { dateStringToDateString } from 'utils/dateUtil';
import { replacePathParams } from 'utils/pathUtil';
import { firestore } from './firebase';
import {
  dailyTimeRecordToDocumentData,
  inHouseWorkToDocumentData,
  documentToInHouseWork,
  documentToRestTime,
  restTimeToDocumentData,
} from './converter';

const readRestTimes = async (uid: string, day: string): Promise<RestTime[]> => {
  const month = dateStringToDateString(day, { from: DATE_FORMAT.dateISO, to: DATE_FORMAT.yearMonthISO });
  return firestore
    .collection(replacePathParams(DAILY_REST_TIME_COLLECTION_PATH, { uid, month, day }))
    .orderBy('order', 'asc')
    .get()
    .then((snapshot) => snapshot.docs.map(documentToRestTime));
};

const readInHouseWorks = async (uid: string, day: string): Promise<InHouseWork[]> => {
  const month = dateStringToDateString(day, { from: DATE_FORMAT.dateISO, to: DATE_FORMAT.yearMonthISO });
  return firestore
    .collection(replacePathParams(DAILY_IN_HOUSE_WORK_COLLECTION_PATH, { uid, month, day }))
    .orderBy('order', 'asc')
    .get()
    .then((snapshot) => snapshot.docs.map(documentToInHouseWork));
};

export const readRestTimesAndInHouseWorks = async (
  uid: string,
  day: string,
): Promise<Pick<DailyTimeRecord, 'inHouseWorks' | 'restTimes'>> => {
  const [inHouseWorks, restTimes] = await Promise.all([
    await readInHouseWorks(uid, day),
    await readRestTimes(uid, day),
  ]);
  return { inHouseWorks, restTimes };
};

export const writeDailyTimeRecord = async (uid: string, data: DailyTimeRecord) => {
  const { restTimes, inHouseWorks, date } = data;

  const month = dateStringToDateString(date, { from: DATE_FORMAT.dateISO, to: DATE_FORMAT.yearMonthISO });

  const rootDocumentRef = firestore
    .collection(replacePathParams(DAILY_RECORDS_COLLECTION_PATH, { uid, month }))
    .doc(date);
  const rootDocument = await rootDocumentRef.get();
  const alreadySavedInHouseWorks = await readInHouseWorks(uid, date);
  const alreadySavedRestTimes = await readRestTimes(uid, date);

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

  inHouseWorks.forEach((inHouseWork, index) => {
    batch.set(inHouseWorkCollectionRef.doc(inHouseWork.id), inHouseWorkToDocumentData(inHouseWork, { uid, index }), {
      merge: true,
    });
  });

  // restTimes
  const restTimeIdsToDelete = alreadySavedRestTimes.filter(
    ({ id: previousId }) => !restTimes.some(({ id: currentId }) => currentId === previousId),
  );
  restTimeIdsToDelete.forEach(({ id }) => {
    const document = restTimeCollectionRef.doc(id);
    batch.delete(document);
  });

  restTimes.forEach((restTime, index) => {
    batch.set(restTimeCollectionRef.doc(restTime.id), restTimeToDocumentData(restTime, { uid, index }), {
      merge: true,
    });
  });

  // root
  batch.set(rootDocumentRef, dailyTimeRecordToDocumentData(data, { uid, isUpdated: rootDocument.exists }), {
    merge: true,
  });

  await batch.commit();
};

export const deleteDailyTimeRecord = async (uid: string, date: string) => {
  const month = dateStringToDateString(date, { from: DATE_FORMAT.dateISO, to: DATE_FORMAT.yearMonthISO });
  const rootDocumentRef = firestore
    .collection(replacePathParams(DAILY_RECORDS_COLLECTION_PATH, { uid, month }))
    .doc(date);

  const inHouseWorkCollectionRef = firestore.collection(
    replacePathParams(DAILY_IN_HOUSE_WORK_COLLECTION_PATH, { uid, month, day: date }),
  );
  const inHouseWorkDocumentRefs = await readInHouseWorks(uid, date).then((inHouseWorks) =>
    inHouseWorks.map(({ id }) => inHouseWorkCollectionRef.doc(id)),
  );

  const restTimeCollectionRef = firestore.collection(
    replacePathParams(DAILY_REST_TIME_COLLECTION_PATH, { uid, month, day: date }),
  );
  const restTimes = await readRestTimes(uid, date).then((restTimes) =>
    restTimes.map(({ id }) => restTimeCollectionRef.doc(id)),
  );

  const batch = firestore.batch();
  [rootDocumentRef, ...inHouseWorkDocumentRefs, ...restTimes].forEach((doc) => {
    batch.delete(doc);
  });

  await batch.commit();
};

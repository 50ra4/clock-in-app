import { useCallback, useEffect, useMemo, useState } from 'react';
import { firestore } from 'services/firebase';
import { replacePathParams } from 'utils/pathUtil';
import { DAILY_RECORDS_COLLECTION_PATH } from 'constants/firestore';
import { DailyTimeRecord, InHouseWork, RestTime } from 'types';
import { getRestTimesAndInHouseWorks, queryToDailyTimeRecord, saveDailyTimeRecord } from 'services/dailyTimeRecord';
import { usePreviousRef } from './usePreviousRef';

type Props = {
  uid: string;
  month: string;
};

// FIXME: name
type SubCollection = {
  inHouseWorks: InHouseWork[];
  restTimes: RestTime[];
};

export const useMonthlyTimeCard = ({ uid, month }: Props) => {
  const [dailyTimeRecords, setDailyTimeRecords] = useState(new Map<string, DailyTimeRecord>());
  // FIXME: var-name
  const [subCollectionData, setSubCollectionData] = useState(new Map<string, SubCollection>());

  const createDailyTimeRecord = useCallback(
    (data: DailyTimeRecord) => {
      // TODO: error handling
      saveDailyTimeRecord(uid, data);
    },
    [uid],
  );

  const previousDailyTimeRecords = usePreviousRef(dailyTimeRecords);

  useEffect(() => {
    if (!uid || !month) {
      return;
    }

    const collectionPath = replacePathParams(DAILY_RECORDS_COLLECTION_PATH, { uid, month });
    const unsubscribe = firestore.collection(collectionPath).onSnapshot(
      (snapshot) => {
        const changedDocs = snapshot.docChanges().map(({ type, doc }) => ({ id: doc.id, doc, type }));
        const updated = new Map(previousDailyTimeRecords.current);
        changedDocs.forEach(({ id, doc, type }) => {
          if (type === 'removed') {
            updated.delete(id);
            return;
          }
          updated.set(id, queryToDailyTimeRecord(doc));
        });
        setDailyTimeRecords(updated);
      },
      (error) => {
        // TODO: error handling
        // eslint-disable-next-line no-console
        console.error(collectionPath, error);
      },
      () => {
        // TODO: ???
        // eslint-disable-next-line no-console
        console.log('changed onSnapshot');
      },
    );
    return () => {
      unsubscribe();
      setDailyTimeRecords(new Map());
    };
  }, [month, previousDailyTimeRecords, uid]);

  useEffect(() => {
    const days = Array.from(dailyTimeRecords.keys());
    if (!uid || !month || days.length < 1) {
      return;
    }

    const getDataOfMonth = days.map(async (day) => ({
      day,
      ...(await getRestTimesAndInHouseWorks(uid, day)),
    }));

    Promise.all(getDataOfMonth).then((res) => {
      const updatedData = new Map<string, SubCollection>();
      res.forEach(({ day, ...rest }) => {
        updatedData.set(day, rest);
      });
      setSubCollectionData(updatedData);
    });
    // TODO: errorHanding
  }, [dailyTimeRecords, month, uid]);

  const data = useMemo(() => {
    // FIXME: modify the dailyRecords type definition
    const dailyRecords = Array.from(dailyTimeRecords.values()).map((record) => ({
      ...record,
      ...subCollectionData.get(record.date),
    }));
    // TODO: remove
    // eslint-disable-next-line no-console
    console.log(dailyRecords);
    return { month, dailyRecords };
  }, [dailyTimeRecords, month, subCollectionData]);

  return {
    data,
    createDailyTimeRecord,
  };
};

import { useCallback, useEffect, useMemo, useState } from 'react';
import { firestore } from 'services/firebase';
import { replacePathParams } from 'utils/pathUtil';
import { DAILY_RECORDS_COLLECTION_PATH } from 'constants/firestore';
import { DailyTimeRecord, InHouseWork } from 'types';
import { getInHouseWorks, queryToDailyTimeRecord, saveDailyTimeRecord } from 'services/dailyTimeRecord';
import { usePreviousRef } from './usePreviousRef';

type Props = {
  uid: string;
  month: string;
};

export const useMonthlyTimeCard = ({ uid, month }: Props) => {
  const [dailyTimeRecords, setDailyTimeRecords] = useState(new Map<string, DailyTimeRecord>());
  const [inHouseWorks, setInHouseWorks] = useState(new Map<string, InHouseWork[]>());

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
        const updated = new Map(previousDailyTimeRecords.current);
        snapshot.docChanges().forEach(({ type, doc }) => {
          if (type === 'removed') {
            updated.delete(doc.id);
            return;
          }
          updated.set(doc.id, queryToDailyTimeRecord(doc));
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
    };
  }, [month, previousDailyTimeRecords, uid]);

  useEffect(() => {
    if (!uid || !month) {
      return;
    }

    const days = Array.from(dailyTimeRecords.keys());
    const getInHouseWorksOfMonth = days.map(async (date) => ({
      date,
      inHouseWorks: await getInHouseWorks(uid, date),
    }));

    Promise.all(getInHouseWorksOfMonth).then((res) => {
      const updated = new Map<string, InHouseWork[]>();
      res.forEach(({ date, inHouseWorks }) => updated.set(date, inHouseWorks));
      setInHouseWorks(updated);
    });
  }, [dailyTimeRecords, month, uid]);

  const data = useMemo(() => {
    // FIXME: modify the dailyRecords type definition
    const dailyRecords = Array.from(dailyTimeRecords.values()).map((record) => ({
      ...record,
      inHouseWorks: inHouseWorks.get(record.date) ?? [],
    }));
    // TODO: remove
    // eslint-disable-next-line no-console
    console.log(dailyRecords);
    return { month, dailyRecords };
  }, [dailyTimeRecords, inHouseWorks, month]);

  return {
    data,
    createDailyTimeRecord,
  };
};

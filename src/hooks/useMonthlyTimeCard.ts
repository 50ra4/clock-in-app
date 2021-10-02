import { useCallback, useEffect, useMemo, useState } from 'react';
import { firestore, firebase } from 'services/firebase';
import { replacePathParams } from 'utils/pathUtil';
import { DAILY_RECORDS_COLLECTION_PATH } from 'constants/firestore';
import { DailyTimeRecord } from 'types';
import { omitUndefinedProps } from 'utils/converterUtil';

type Props = {
  uid: string;
  month: string;
};

export const useMonthlyTimeCard = ({ uid, month }: Props) => {
  const [timecard, setTimeCard] = useState(new Map<string, DailyTimeRecord>());

  const createDailyTimeRecord = useCallback(
    (data: DailyTimeRecord) => {
      // FIXME: Save restTimes and inHouseWorks separately
      const { restTimes, inHouseWorks, ...rest } = data;
      const path = replacePathParams(DAILY_RECORDS_COLLECTION_PATH, { uid, month });
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      firestore
        .collection(path)
        .doc(rest.date)
        .set({
          ...omitUndefinedProps<Omit<DailyTimeRecord, 'restTimes' | 'inHouseWorks'>>(rest),
          // FIXME: Do not update createdAt if data already exists
          createdAt: timestamp,
          updatedAt: timestamp,
        });
    },
    [month, uid],
  );

  useEffect(() => {
    const path = replacePathParams(DAILY_RECORDS_COLLECTION_PATH, { uid, month });
    const unsubscribe = firestore.collection(path).onSnapshot(
      (snapshot) => {
        setTimeCard((prev) => {
          const updated = new Map(prev);
          snapshot.forEach((doc) => {
            const date = doc.get('date');
            const start = doc.get('start');
            const end = doc.get('end');
            const remarks = doc.get('remarks');
            updated.set(date, { date, start, end, remarks, restTimes: [], inHouseWorks: [] });
          });
          return updated;
        });
      },
      (error) => {
        // TODO: error handling
        // eslint-disable-next-line no-console
        console.error(path, error);
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
  }, [month, uid]);

  const data = useMemo(() => {
    // FIXME: modify the dailyRecords type definition
    const dailyRecords = Array.from(timecard.values());
    return { month, dailyRecords };
  }, [month, timecard]);

  return {
    data,
    createDailyTimeRecord,
  };
};

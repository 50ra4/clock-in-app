import { useCallback, useEffect, useMemo, useState } from 'react';
import { firestore, FirestoreError } from 'services/firebase';
import { replacePathParams } from 'utils/pathUtil';
import { DAILY_RECORDS_COLLECTION_PATH } from 'constants/firestore';
import { DailyTimeRecord, InHouseWork, RestTime } from 'types';
import {
  readRestTimesAndInHouseWorks,
  queryToDailyTimeRecord,
  writeDailyTimeRecord,
  deleteDailyTimeRecord,
} from 'services/dailyTimeRecord';
import { usePreviousRef } from './usePreviousRef';
import { AppError } from 'models/AppError';

type Props = {
  uid: string;
  month: string;
};

// FIXME: name
type SubCollection = {
  inHouseWorks: InHouseWork[];
  restTimes: RestTime[];
};

export const useDailyTimeRecordsOfMonth = ({ uid, month }: Props) => {
  // FIXME: var-name
  const [rootCollectionData, setRootCollectionData] = useState(new Map<string, DailyTimeRecord>());
  const [subCollectionData, setSubCollectionData] = useState(new Map<string, SubCollection>());
  const [error, setError] = useState<Error | null>(null);

  const previousRootCollectionData = usePreviousRef(rootCollectionData);

  const dailyTimeRecordsOfMonth = useMemo(() => {
    // FIXME: modify the dailyRecords type definition
    const modified = Array.from(rootCollectionData.values()).map((record) => ({
      ...record,
      ...subCollectionData.get(record.date),
    }));
    // TODO: remove
    // eslint-disable-next-line no-console
    console.log(modified);
    return modified;
  }, [rootCollectionData, subCollectionData]);

  const saveDailyTimeRecord = useCallback(
    (data: DailyTimeRecord) => {
      writeDailyTimeRecord(uid, data).catch((err: FirestoreError) => {
        // TODO: show popup
        setError(new AppError('FAILED_WRITE_DATA', { message: err.message, stack: err.stack }));
      });
    },
    [uid],
  );

  const removeDailyTimeRecord = useCallback(
    (date: string) => {
      deleteDailyTimeRecord(uid, date).catch((err: FirestoreError) => {
        // TODO: show popup
        setError(new AppError('FAILED_WRITE_DATA', { message: err.message, stack: err.stack }));
      });
    },
    [uid],
  );

  useEffect(() => {
    if (!error) {
      return;
    }
    throw error;
  });

  useEffect(() => {
    if (!uid || !month) {
      return;
    }

    const collectionPath = replacePathParams(DAILY_RECORDS_COLLECTION_PATH, { uid, month });
    const unsubscribe = firestore.collection(collectionPath).onSnapshot(
      (snapshot) => {
        const changedDocs = snapshot.docChanges().map(({ type, doc }) => ({ id: doc.id, doc, type }));
        const updated = new Map(previousRootCollectionData.current);
        changedDocs.forEach(({ id, doc, type }) => {
          if (type === 'removed') {
            updated.delete(id);
            return;
          }
          updated.set(id, queryToDailyTimeRecord(doc));
        });
        setRootCollectionData(updated);
      },
      (error) => {
        setError(new AppError('FAILED_READ_DATA', { message: error.message, stack: error.stack }));
      },
      () => {
        // TODO: ???
        // eslint-disable-next-line no-console
        console.log('changed onSnapshot');
      },
    );
    return () => {
      unsubscribe();
      setRootCollectionData(new Map());
    };
  }, [month, previousRootCollectionData, uid]);

  useEffect(() => {
    const days = Array.from(rootCollectionData.keys());
    if (!uid || !month || days.length < 1) {
      return;
    }

    const getDataOfMonth = days.map(async (day) => ({
      day,
      ...(await readRestTimesAndInHouseWorks(uid, day)),
    }));

    Promise.all(getDataOfMonth)
      .then((res) => {
        const updatedData = new Map<string, SubCollection>();
        res.forEach(({ day, ...rest }) => {
          updatedData.set(day, rest);
        });
        setSubCollectionData(updatedData);
      })
      .catch((error) => {
        setError(new AppError('FAILED_READ_DATA', { message: error.message, stack: error.stack }));
      });
  }, [rootCollectionData, month, uid]);

  return {
    dailyTimeRecordsOfMonth,
    saveDailyTimeRecord,
    removeDailyTimeRecord,
  };
};

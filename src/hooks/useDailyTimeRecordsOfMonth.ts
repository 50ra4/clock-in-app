import { useCallback, useEffect, useMemo, useState } from 'react';
import { firestore } from 'services/firebase';
import { replacePathParams } from 'utils/pathUtil';
import { DAILY_RECORDS_COLLECTION_PATH } from 'constants/firestore';
import { DailyTimeRecord, InHouseWork, RestTime } from 'types';
import {
  getRestTimesAndInHouseWorks,
  queryToDailyTimeRecord,
  createUpdateDailyTimeRecord,
} from 'services/dailyTimeRecord';
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

export const useDailyTimeRecordsOfMonth = ({ uid, month }: Props) => {
  // FIXME: var-name
  const [rootCollectionData, setRootCollectionData] = useState(new Map<string, DailyTimeRecord>());
  const [subCollectionData, setSubCollectionData] = useState(new Map<string, SubCollection>());

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
      // TODO: error handling
      createUpdateDailyTimeRecord(uid, data);
    },
    [uid],
  );

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
  }, [rootCollectionData, month, uid]);

  return {
    dailyTimeRecordsOfMonth,
    saveDailyTimeRecord,
  };
};

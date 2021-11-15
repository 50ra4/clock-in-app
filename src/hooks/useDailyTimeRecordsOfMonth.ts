import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import { AppState } from 'store/root';
import { FirestoreError } from 'services/firebase';
import { DailyTimeRecord, InHouseWork, RestTime } from 'types';
import {
  readRestTimesAndInHouseWorks,
  writeDailyTimeRecord,
  deleteDailyTimeRecord,
  onDailyTimeRecordDocumentChanges,
} from 'services/dailyTimeRecord';
import { usePreviousRef } from './usePreviousRef';
import { AppError } from 'models/AppError';
import { ConnectedDialogActions } from 'store/connectedDialog';
import { showAlertDialog, showConfirmDialog } from 'thunks/connectedDialog';
import { SnackbarActions } from 'store/snackbar';
import { showSnackbar } from 'thunks/snackbar';

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
  const dispatch = useDispatch<ThunkDispatch<AppState, unknown, ConnectedDialogActions | SnackbarActions>>();

  const [isLoading, setIsLoading] = useState(false);
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
    async (data: DailyTimeRecord) => {
      setIsLoading(true);
      await writeDailyTimeRecord(uid, data)
        .then(() => {
          dispatch(showSnackbar({ content: '勤怠情報を更新しました' }));
        })
        .catch((err: FirestoreError) => {
          dispatch(
            showAlertDialog({
              // TODO: move to constants
              title: 'エラー',
              message: '更新に失敗しました。お手数ですが、時間がたってから再度お試しください。',
            }),
          );
        })
        .finally(() => setIsLoading(false));
    },
    [dispatch, uid],
  );

  const removeDailyTimeRecord = useCallback(
    async (date: string) => {
      const result = await dispatch(
        showConfirmDialog({
          title: '確認',
          message: `${date}の勤怠情報を削除します。よろしいですか？`,
        }),
      );

      if (result !== 'ok') {
        return;
      }

      setIsLoading(true);
      await deleteDailyTimeRecord(uid, date)
        .then(() => {
          dispatch(showSnackbar({ content: `${date}の勤怠を削除しました` }));
        })
        .catch((err: FirestoreError) => {
          dispatch(
            showAlertDialog({
              // TODO: move to constants
              title: 'エラー',
              message: '更新に失敗しました。お手数ですが、時間がたってから再度お試しください。',
            }),
          );
        })
        .finally(() => setIsLoading(false));
    },
    [dispatch, uid],
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
    const unsubscribe = onDailyTimeRecordDocumentChanges(uid, month)(
      (docChanges) => {
        // TODO: remove
        // eslint-disable-next-line no-console
        console.log('docChanges', docChanges);
        const updated = new Map(previousRootCollectionData.current);
        docChanges.forEach((changed) => {
          if (changed.type === 'removed') {
            updated.delete(changed.id);
            return;
          }
          updated.set(changed.id, changed.data);
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
    isLoading,
    dailyTimeRecordsOfMonth,
    saveDailyTimeRecord,
    removeDailyTimeRecord,
  };
};

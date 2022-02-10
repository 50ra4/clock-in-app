import { useCallback, useEffect, useMemo, useState } from 'react';
import { FirestoreError } from 'services/firebase';
import { DailyTimeRecord } from 'types';
import { writeDailyTimeRecord, deleteDailyTimeRecord } from 'services/dailyTimeRecord';
import { showAlertDialog, showConfirmDialog } from 'thunks/connectedDialog';
import { showSnackbar } from 'thunks/snackbar';
import { loadMonthlyRecord } from 'thunks/dailyTimeRecord';
import { useAppDispatch } from './useAppDispatch';
import { useSelector } from 'react-redux';
import { AppState } from 'store/root';
import { isNonNullable } from 'utils/typeGuard';

type Props = {
  uid: string;
  month: string;
};

export const useDailyTimeRecordsOfMonth = ({ uid, month }: Props) => {
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const dailyTimeRecordsOfMonthByUser = useSelector((state: AppState) => state.dailyTimeRecord?.[uid]?.[month]);
  const dailyTimeRecordsOfMonth = useMemo(
    () =>
      Object.values(dailyTimeRecordsOfMonthByUser ?? {})
        .filter(isNonNullable)
        .map(({ data }) => data),
    [dailyTimeRecordsOfMonthByUser],
  );

  useEffect(() => {
    setIsLoading(true);
    dispatch(loadMonthlyRecord(uid, month))
      .catch(setError)
      .finally(() => setIsLoading(false));
  }, [dispatch, month, uid]);

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
    if (!error) return;
    throw error;
  });

  return {
    isLoading,
    dailyTimeRecordsOfMonth,
    saveDailyTimeRecord,
    removeDailyTimeRecord,
  };
};

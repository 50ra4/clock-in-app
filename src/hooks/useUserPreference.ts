import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { FirestoreError } from 'services/firebase';
import { writeTimecardUserPreference } from 'services/userPreference';
import { ConnectedDialogActions } from 'store/connectedDialog';

import { AppState } from 'store/root';
import { UserPreferenceActions } from 'store/userPreference';
import { showAlertDialog } from 'thunks/connectedDialog';
import { syncUserPreference, updateTimecardUserPreference } from 'thunks/userPreference';
import { TimecardUserPreference } from 'types';

export const useUserPreference = (uid: string) => {
  const [isFetching, setIsFetching] = useState(false);

  const dispatch =
    useDispatch<ThunkDispatch<AppState, Record<string, never>, ConnectedDialogActions | UserPreferenceActions>>();

  const userPreferenceState = useSelector((state: AppState) => state.userPreference[uid]);

  const saveTimeCardPreference = useCallback(
    async (data: TimecardUserPreference) => {
      if (isFetching) return;
      setIsFetching(true);

      await writeTimecardUserPreference(uid, data)
        .then(() => {
          dispatch(updateTimecardUserPreference(uid)).finally(() => {
            setIsFetching(false);
          });
        })
        .catch((err: FirestoreError) => {
          setIsFetching(false);
          dispatch(
            showAlertDialog({
              // TODO: move to constants
              title: 'エラー',
              message: '更新に失敗しました。お手数ですが、時間がたってから再度お試しください。',
            }),
          );
        });
    },
    [dispatch, isFetching, uid],
  );

  useEffect(() => {
    dispatch(syncUserPreference(uid));
  }, [dispatch, uid]);

  useEffect(() => {
    if (!userPreferenceState?.error) {
      return;
    }
    throw userPreferenceState.error;
  }, [userPreferenceState?.error]);

  return {
    isFetching: isFetching || typeof userPreferenceState?.data === 'undefined',
    userPreference: userPreferenceState?.data,
    saveTimeCardPreference,
  };
};

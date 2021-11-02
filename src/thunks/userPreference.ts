import { ThunkDispatch } from 'redux-thunk';
import { readTimecardUserPreference } from 'services/timecardUserPreference';
import { AppState } from 'store/root';
import { UserPreferenceActions, userPreferenceActions } from 'store/userPreference';

export const updateUserPreference =
  (uid: string) =>
  async (dispatch: ThunkDispatch<AppState, Record<string, never>, UserPreferenceActions>): Promise<void> => {
    Promise.all([readTimecardUserPreference(uid)])
      .then(([timecardPreference]) => {
        dispatch(userPreferenceActions.updateAll({ uid, userPreference: { timecard: timecardPreference } }));
      })
      .catch((error) => {
        dispatch(userPreferenceActions.updateAll({ uid, error }));
      });
  };

export const updateTimecardUserPreference =
  (uid: string) =>
  async (dispatch: ThunkDispatch<AppState, Record<string, never>, UserPreferenceActions>): Promise<void> => {
    readTimecardUserPreference(uid)
      .then((timecardPreference) => {
        dispatch(userPreferenceActions.updateTimecardPreference({ uid, timecardPreference }));
      })
      .catch((error) => {
        dispatch(userPreferenceActions.updateTimecardPreference({ uid, error }));
      });
  };

export const syncUserPreference =
  (uid: string) =>
  async (
    dispatch: ThunkDispatch<AppState, Record<string, never>, UserPreferenceActions>,
    getState: () => AppState,
  ): Promise<void> => {
    const current = getState().userPreference[uid]?.data;
    if (typeof current !== 'undefined') {
      return;
    }
    return dispatch(updateUserPreference(uid));
  };

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IndexedEntityState, TimecardUserPreference } from 'types';

type UserPreference = {
  timecard: TimecardUserPreference;
};

type State = IndexedEntityState<UserPreference | undefined>;

const INITIAL_USER_STATE: NonNullable<State[string]> = {
  data: undefined,
};
const initialState: State = {};

const userPreferenceModule = createSlice({
  name: '[store/userPreference]',
  initialState: initialState,
  reducers: {
    updateAll: (
      state: State,
      {
        payload: { uid, userPreference, error },
      }: PayloadAction<{ uid: string; userPreference?: UserPreference; error?: Error }>,
    ) => {
      return {
        ...state,
        [uid]: {
          data: userPreference,
          error,
          updatedAt: new Date().toISOString(),
        },
      };
    },
    updateTimecardPreference: (
      state: State,
      {
        payload: { uid, timecardPreference, error },
      }: PayloadAction<{ uid: string; timecardPreference?: TimecardUserPreference; error?: Error }>,
    ) => {
      const currentState = state[uid] ?? INITIAL_USER_STATE;

      return {
        ...state,
        [uid]: {
          ...currentState,
          data: timecardPreference
            ? {
                ...(currentState.data ?? {}),
                timecard: timecardPreference,
              }
            : currentState.data,
          error,
        },
      };
    },
  },
});

const { actions: userPreferenceActions, reducer: userPreferenceReducer } = userPreferenceModule;

export type UserPreferenceActions = ReturnType<typeof userPreferenceActions[keyof typeof userPreferenceActions]>;

export { userPreferenceActions, userPreferenceReducer };

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FETCH_STATUS_ENUM, LOGIN_STATUS_ENUM } from 'constants/enum';
import { Authentication, SingleEntityState } from 'types';

type State = SingleEntityState<Authentication>;

const initialData: Authentication = {
  emailVerified: false,
  loginStatus: LOGIN_STATUS_ENUM.initialized,
  uid: '',
};
const initialState: State = {
  fetchStatus: FETCH_STATUS_ENUM.initialized,
  data: {
    ...initialData,
  },
  error: undefined,
  updatedAt: undefined,
};

const { actions: authenticationActions, reducer: authenticationReducer } = createSlice({
  name: '[store/authentication]',
  initialState: initialState,
  reducers: {
    loggingIn: (state: State, _: PayloadAction<void>) => {
      return {
        ...state,
        fetchStatus: FETCH_STATUS_ENUM.fetching,
      };
    },
    success: (state: State, _: PayloadAction<void>) => {
      return {
        ...state,
        data: { ...state.data, loginStatus: LOGIN_STATUS_ENUM.success },
        fetchStatus: FETCH_STATUS_ENUM.fetched,
        updatedAt: new Date().toISOString(),
      };
    },
    setData: (state: State, action: PayloadAction<{ emailVerified: boolean; uid: string }>) => {
      const { emailVerified, uid } = action.payload;

      return {
        ...state,
        data: { ...state.data, emailVerified, uid },
        updatedAt: new Date().toISOString(),
      };
    },
    failed: (state: State, action: PayloadAction<{ error: Error }>) => {
      const { error } = action.payload;
      return {
        ...state,
        data: { ...state.data, loginStatus: LOGIN_STATUS_ENUM.failed },
        fetchStatus: FETCH_STATUS_ENUM.fetched,
        error,
        updatedAt: new Date().toISOString(),
      };
    },
    logout: () => {
      return {
        ...initialState,
        data: {
          ...initialState.data,
        },
      };
    },
  },
});

export type AuthenticationActions = ReturnType<typeof authenticationActions[keyof typeof authenticationActions]>;

export { authenticationActions, authenticationReducer };

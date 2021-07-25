import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FETCH_STATUS_ENUM } from 'constants/enum';
import { Profile, SingleEntityState } from 'types';

type State = SingleEntityState<Profile>;

const initialData: Profile = {
  email: null,
  photoURL: null,
  displayName: null,
  firstName: '',
  lastName: '',
};
const initialState: State = {
  fetchStatus: FETCH_STATUS_ENUM.initialized,
  data: {
    ...initialData,
  },
  error: undefined,
  updatedAt: undefined,
};

const { actions: myProfileActions, reducer: myProfileReducer } = createSlice({
  name: '[store/myProfile]',
  initialState: initialState,
  reducers: {
    fetching: (state: State, _: PayloadAction<void>) => {
      return {
        ...state,
        fetchStatus: FETCH_STATUS_ENUM.fetching,
        updatedAt: new Date().toISOString(),
      };
    },
    setUserName: (state: State, action: PayloadAction<{ firstName: string; lastName: string }>) => {
      const { firstName, lastName } = action.payload;
      return {
        ...state,
        data: { ...state.data, firstName, lastName },
        fetchStatus: FETCH_STATUS_ENUM.fetched,
        updatedAt: new Date().toISOString(),
      };
    },
    failed: (state: State, action: PayloadAction<{ error: Error }>) => {
      const { error } = action.payload;
      return {
        ...state,
        error,
        fetchStatus: FETCH_STATUS_ENUM.fetching,
        updatedAt: new Date().toISOString(),
      };
    },
  },
});

export { myProfileActions, myProfileReducer };
export type MyProfileActions = ReturnType<typeof myProfileActions[keyof typeof myProfileActions]>;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SingleEntityState } from 'types';
import { DialogWithResolver } from 'types/dialog';

type State = Omit<SingleEntityState<DialogWithResolver | undefined>, 'fetchStatus'>;

const initialState: State = {
  data: undefined,
  error: undefined,
  updatedAt: undefined,
};

const modules = createSlice({
  name: '[store/connectedDialog]',
  initialState: initialState,
  reducers: {
    showDialog: (state: State, action: PayloadAction<DialogWithResolver>) => {
      return {
        ...state,
        data: action.payload,
        updatedAt: new Date().toISOString(),
      };
    },
    hideDialog: (state: State, _: PayloadAction<void>) => {
      return {
        ...state,
        data: undefined,
        updatedAt: new Date().toISOString(),
      };
    },
  },
});

const { actions: connectedDialogActions, reducer: connectedDialogReducer } = modules;

export type ConnectedDialogActions = ReturnType<typeof connectedDialogActions[keyof typeof connectedDialogActions]>;

export { connectedDialogActions, connectedDialogReducer };

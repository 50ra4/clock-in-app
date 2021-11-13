import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SnackbarSeverity } from 'presentation/styles/theme';

export type SnackbarParams = {
  id: string;
  content: string;
  severity?: SnackbarSeverity;
  duration?: number;
  onClose?: () => void;
};
type State = SnackbarParams[];
const initialState: State = [];

const modules = createSlice({
  name: '[store/ui/snackbar]',
  initialState,
  reducers: {
    enqueue: (state: State, action: PayloadAction<SnackbarParams>) => {
      return [...state, action.payload];
    },
    dequeue: (state: State, action: PayloadAction<{ id: string }>) => {
      return state.filter(({ id }) => id !== action.payload.id);
    },
  },
});

const { actions: snackbarActions, reducer: snackbarReducer } = modules;

export type SnackbarActions = ReturnType<typeof snackbarActions[keyof typeof snackbarActions]>;

export { snackbarActions, snackbarReducer };

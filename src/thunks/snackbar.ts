import { ThunkDispatch } from 'redux-thunk';
import { AppState } from 'store/root';
import { snackbarActions, SnackbarActions, SnackbarParams } from 'store/snackbar';
import { createId } from 'utils/idUtil';

export const showSnackbar =
  (params: Omit<SnackbarParams, 'id'>) => (dispatch: ThunkDispatch<AppState, unknown, SnackbarActions>) =>
    dispatch(snackbarActions.enqueue({ ...params, id: createId() }));

import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from 'store/root';
import { SnackbarParams, snackbarActions } from 'store/snackbar';
import { Snackbar } from 'presentation/components/feedback/Snackbar/Snackbar';

export function ConnectedSnackbar() {
  const dispatch = useDispatch();
  const snackbar = useSelector<AppState, SnackbarParams | undefined>((state: AppState) => state.snackbar[0]);

  const handleOnClose = useCallback(() => {
    if (!snackbar?.id) {
      return;
    }
    dispatch(snackbarActions.dequeue({ id: snackbar.id }));
  }, [dispatch, snackbar?.id]);

  return !snackbar ? null : (
    <Snackbar
      open={true}
      content={snackbar.content}
      severity={snackbar.severity ?? 'info'}
      duration={snackbar.duration ?? 3000}
      onClose={handleOnClose}
    />
  );
}

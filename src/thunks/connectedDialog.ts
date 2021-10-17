import { ThunkDispatch } from 'redux-thunk';
import { AppState } from 'store/root';
import { ConnectedDialogActions, connectedDialogActions } from 'store/connectedDialog';
import {
  Dialog,
  DialogResolveKey,
  PopupDialog,
  AlertDialog,
  ConfirmDialog,
  SelectDialog,
  // CustomDialog,
} from 'types/dialog';

const showDialog =
  <T extends Dialog, K extends string = '', R = DialogResolveKey<T['type'], K>>(dialog: T) =>
  async (dispatch: ThunkDispatch<AppState, unknown, ConnectedDialogActions>): Promise<R> => {
    return new Promise((res) => {
      dispatch(
        connectedDialogActions.showDialog({
          ...dialog,
          resolve: (key: string) => {
            res(key as unknown as R);
          },
        }),
      );
    });
  };

type OmittedType<T> = Omit<T, 'type'>;

export const showPopupDialog = (data: OmittedType<PopupDialog>) => showDialog({ ...data, type: 'popup' });
export const showAlertDialog = (data: OmittedType<AlertDialog>) => showDialog({ ...data, type: 'alert' });
export const showConfirmDialog = (data: OmittedType<ConfirmDialog>) => showDialog({ ...data, type: 'confirm' });
export const showSelectDialog = (data: OmittedType<SelectDialog>) => showDialog({ ...data, type: 'select' });
// export const showCustomDialog = <K extends string>(data: OmittedType<CustomDialog>) =>
//   showDialog<CustomDialog, K>({ ...data, type: 'custom' });

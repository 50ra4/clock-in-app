import React, { useCallback } from 'react';
import styled, { css } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { AppState } from 'store/root';
import { DIALOG_TYPE } from 'constants/dialog';
import { AlertDialog } from 'presentation/components/feedback/Dialogs/AlertDialog';
import { ConfirmDialog } from 'presentation/components/feedback/Dialogs/ConfirmDialog';
import { PopupDialog } from 'presentation/components/feedback/Dialogs/PopupDialog';
import { SelectDialog } from 'presentation/components/feedback/Dialogs/SelectDialog';
import { connectedDialogActions } from 'store/connectedDialog';
import { CustomDialogClassNames } from 'presentation/components/feedback/Dialogs/CustomDialog';

type DialogState = AppState['connectedDialog'];

type Props = {
  dialog: DialogState['data'];
  onClose: () => void;
};

// eslint-disable-next-line complexity
const Dialog = React.memo(function Dialogs({ dialog, onClose }: Props) {
  if (!dialog) {
    return null;
  }

  switch (dialog.type) {
    case DIALOG_TYPE.popup:
      return (
        <StyledPopupDialog
          open={true}
          onClose={() => {
            onClose();
            dialog.resolve('close');
          }}
          title={dialog.title}
          message={dialog.message}
        />
      );

    case DIALOG_TYPE.alert:
      return (
        <StyledAlertDialog
          open={true}
          onClose={() => {
            onClose();
            dialog.resolve('close');
          }}
          onClickOK={() => {
            dialog.resolve('ok');
          }}
          title={dialog.title}
          message={dialog.message}
        />
      );

    case DIALOG_TYPE.confirm:
      return (
        <StyledConfirmDialog
          open={true}
          onClose={() => {
            onClose();
            dialog.resolve('close');
          }}
          onClickOK={() => {
            dialog.resolve('ok');
          }}
          title={dialog.title}
          message={dialog.message}
        />
      );

    case DIALOG_TYPE.select:
      return (
        <StyledSelectDialog
          open={true}
          onClose={() => {
            onClose();
            dialog.resolve('close');
          }}
          onClickYes={() => {
            dialog.resolve('yes');
          }}
          onClickNo={() => {
            dialog.resolve('no');
          }}
          title={dialog.title}
          message={dialog.message}
        />
      );

    // case DIALOG_TYPE.custom:
    //   return (
    //     <CustomDialog
    //       id={dialog.id}
    //       open={true}
    //       title={dialog.title}
    //       actions={dialog.actions}
    //       onClose={() => {
    //         dialog.resolve('close');
    //       }}
    //     >
    //       {dialog.children}
    //     </CustomDialog>
    //   );

    default:
      return null;
  }
});

const DialogStyle = css`
  max-width: 550px;
  & .${CustomDialogClassNames.contents} {
    min-height: 100px;
  }
`;
const StyledAlertDialog = styled(AlertDialog)`
  ${DialogStyle}
`;
const StyledConfirmDialog = styled(ConfirmDialog)`
  ${DialogStyle}
`;
const StyledPopupDialog = styled(PopupDialog)`
  ${DialogStyle}
`;
const StyledSelectDialog = styled(SelectDialog)`
  ${DialogStyle}
`;

export const ConnectedDialog = () => {
  // TODO: remove
  // eslint-disable-next-line no-console
  console.log('rerender ConnectedDialogs');

  const dispatch = useDispatch();
  const dialog = useSelector((state: AppState) => state.connectedDialog.data);
  const onClose = useCallback(() => {
    dispatch(connectedDialogActions.hideDialog());
  }, [dispatch]);

  return <Dialog dialog={dialog} onClose={onClose} />;
};

import React from 'react';
import styled from 'styled-components';
import { CustomDialog } from './CustomDialog';
import { AlertDialogActions } from './DialogActions';

type OwnProps = {
  className?: string;
  open?: boolean;
  onClickOK?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onClose?: (event: React.MouseEvent<unknown, MouseEvent>) => void;
  title?: string;
  message?: string | React.ReactNode;
};

export type AlertDialogProps = OwnProps;

const UnStyledAlertDialog = React.memo(function AlertDialog({
  open = false,
  onClickOK,
  onClose,
  className,
  message,
  ...otherProps
}: AlertDialogProps) {
  return (
    <CustomDialog
      {...otherProps}
      id="alert"
      open={open}
      className={className}
      onClose={onClose}
      actions={<AlertDialogActions onClickOK={onClickOK} onClose={onClose} />}
    >
      {message}
    </CustomDialog>
  );
});

export const AlertDialog = styled(UnStyledAlertDialog)``;

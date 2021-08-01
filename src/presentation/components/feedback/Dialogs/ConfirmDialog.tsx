import React from 'react';
import styled from 'styled-components';
import { CustomDialog } from './CustomDialog';
import { ConfirmDialogActions } from './DialogActions';

type OwnProps = {
  className?: string;
  open?: boolean;
  onClickOK?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onClose?: (event: React.MouseEvent<unknown, MouseEvent>) => void;
  title?: string;
  message?: string | React.ReactNode;
};

export type ConfirmDialogProps = OwnProps;

const UnStyledConfirmDialog = React.memo(function ConfirmDialog({
  open = false,
  onClickOK,
  onClose,
  className,
  message,
  ...otherProps
}: ConfirmDialogProps) {
  return (
    <CustomDialog
      {...otherProps}
      id="confirm"
      open={open}
      className={className}
      onClose={onClose}
      actions={<ConfirmDialogActions onClickOK={onClickOK} onClose={onClose} />}
    >
      {message}
    </CustomDialog>
  );
});

export const ConfirmDialog = styled(UnStyledConfirmDialog)``;

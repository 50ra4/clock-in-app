import React, { useCallback } from 'react';
import styled from 'styled-components';
import { CustomDialog } from './CustomDialog';
import { Button } from 'presentation/components/inputs/Button/Button';

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

const AlertDialogActions = React.memo(function AlertDialogAction({
  onClose,
  onClickOK,
}: Pick<OwnProps, 'onClose' | 'onClickOK'>) {
  const handleClickOK = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      if (onClickOK) {
        onClickOK(e);
      }
      if (onClose) {
        onClose(e);
      }
    },
    [onClickOK, onClose],
  );

  return (
    <>
      <Button color="primary" onClick={handleClickOK}>
        OK
      </Button>
    </>
  );
});

export const AlertDialog = styled(UnStyledAlertDialog)``;

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

const ConfirmDialogActions = React.memo(function ConfirmDialogAction({
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
      <Button color="secondary" onClick={onClose}>
        キャンセル
      </Button>
      <Button color="primary" onClick={handleClickOK}>
        OK
      </Button>
    </>
  );
});

export const ConfirmDialog = styled(UnStyledConfirmDialog)``;

import React, { useCallback } from 'react';
import styled from 'styled-components';
import { CustomDialog } from './CustomDialog';
import { Button } from 'presentation/components/inputs/Button/Button';

type OwnProps = {
  className?: string;
  open?: boolean;
  onClickYes?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onClickNo?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onClose?: (event: React.MouseEvent<unknown, MouseEvent>) => void;
  title?: string;
  message?: string | React.ReactNode;
};

export type SelectDialogProps = OwnProps;

const UnStyledSelectDialog = React.memo(function SelectDialog({
  open = false,
  onClickYes,
  onClickNo,
  onClose,
  className,
  message,
  ...otherProps
}: SelectDialogProps) {
  return (
    <CustomDialog
      {...otherProps}
      id="select"
      open={open}
      className={className}
      onClose={onClose}
      actions={<SelectDialogActions onClickYes={onClickYes} onClickNo={onClickNo} onClose={onClose} />}
    >
      {message}
    </CustomDialog>
  );
});

const SelectDialogActions = React.memo(function SelectDialogAction({
  onClose,
  onClickYes,
  onClickNo,
}: Pick<OwnProps, 'onClose' | 'onClickYes' | 'onClickNo'>) {
  const handleClickYes = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      if (onClickYes) {
        onClickYes(e);
      }
      if (onClose) {
        onClose(e);
      }
    },
    [onClickYes, onClose],
  );

  const handleClickNo = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      if (onClickNo) {
        onClickNo(e);
      }
      if (onClose) {
        onClose(e);
      }
    },
    [onClickNo, onClose],
  );

  return (
    <>
      <Button color="secondary" onClick={handleClickNo}>
        いいえ
      </Button>
      <Button color="primary" onClick={handleClickYes}>
        はい
      </Button>
    </>
  );
});

export const SelectDialog = styled(UnStyledSelectDialog)``;

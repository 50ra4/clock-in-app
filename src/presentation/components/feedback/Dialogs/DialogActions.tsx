import React, { useCallback } from 'react';
import { Button } from 'presentation/components/inputs/Button/Button';

import { ConfirmDialogProps } from './ConfirmDialog';
import { AlertDialogProps } from './AlertDialog';
import { SelectDialogProps } from './SelectDialog';

export const ConfirmDialogActions = React.memo(function ConfirmDialogAction({
  onClose,
  onClickOK,
}: Pick<ConfirmDialogProps, 'onClose' | 'onClickOK'>) {
  const handleOnClickOK = useCallback(
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
      <Button color="default" onClick={onClose} text="キャンセル" />
      <Button color="primary" onClick={handleOnClickOK} text="OK" />
    </>
  );
});

export const AlertDialogActions = React.memo(function AlertDialogAction({
  onClose,
  onClickOK,
}: Pick<AlertDialogProps, 'onClose' | 'onClickOK'>) {
  const handleOnClickOK = useCallback(
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
      <Button color="primary" onClick={handleOnClickOK} text="OK" />
    </>
  );
});

export const SelectDialogActions = React.memo(function SelectDialogAction({
  onClose,
  onClickYes,
  onClickNo,
}: Pick<SelectDialogProps, 'onClose' | 'onClickYes' | 'onClickNo'>) {
  const handleOnClickYes = useCallback(
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

  const handleOnClickNo = useCallback(
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
      <Button color="secondary" onClick={handleOnClickNo} text="いいえ" />
      <Button color="primary" onClick={handleOnClickYes} text="はい" />
    </>
  );
});

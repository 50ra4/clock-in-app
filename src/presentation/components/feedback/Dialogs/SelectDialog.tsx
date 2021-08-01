import React from 'react';
import styled from 'styled-components';
import { CustomDialog } from './CustomDialog';
import { SelectDialogActions } from './DialogActions';

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

export const SelectDialog = styled(UnStyledSelectDialog)``;

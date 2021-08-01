import React from 'react';
import styled from 'styled-components';
import { CustomDialog } from './CustomDialog';

type OwnProps = {
  className?: string;
  open?: boolean;
  onClose?: (event: React.MouseEvent<unknown, MouseEvent>) => void;
  title?: string;
  message?: string | React.ReactNode;
};

export type PopupDialogProps = OwnProps;

const UnStyledPopupDialog = React.memo(function PopupDialog({
  open = false,
  onClose,
  className,
  message,
  ...otherProps
}: PopupDialogProps) {
  return (
    <CustomDialog {...otherProps} id="popup" open={open} className={className} onClose={onClose}>
      {message}
    </CustomDialog>
  );
});

export const PopupDialog = styled(UnStyledPopupDialog)``;

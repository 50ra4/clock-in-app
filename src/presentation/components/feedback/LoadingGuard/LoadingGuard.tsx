import React from 'react';
import styled from 'styled-components';
import { Backdrop } from '../Backdrop/Backdrop';
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';

type OwnProps = {
  className?: string;
  open?: boolean;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  message?: string | React.ReactNode;
};

export type LoadingGuardProps = OwnProps;

const UnStyledLoadingGuard = React.memo(function LoadingGuard({
  open = false,
  onClick,
  className,
  message,
  ...otherProps
}: LoadingGuardProps) {
  return (
    <Backdrop {...otherProps} open={open} className={className} onClick={onClick}>
      <LoadingSpinner iconSize="extraLarge" message={message} />
    </Backdrop>
  );
});

export const LoadingGuard = styled(UnStyledLoadingGuard)``;

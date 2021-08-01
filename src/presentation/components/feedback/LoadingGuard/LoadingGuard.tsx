import { StopPropagation } from 'presentation/components/utils/StopPropagation/StopPropagation';
import React from 'react';
import styled from 'styled-components';
import { Backdrop } from '../Backdrop/Backdrop';
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';

type OwnProps = {
  className?: string;
  open?: boolean;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  stopPropagation?: boolean;
  message?: string | React.ReactNode;
};

export type LoadingGuardProps = OwnProps;

const UnStyledLoadingGuard = React.memo(function LoadingGuard({
  open = false,
  onClick,
  className,
  stopPropagation,
  message,
  ...otherProps
}: LoadingGuardProps) {
  return (
    <Backdrop {...otherProps} open={open} className={className} onClick={onClick}>
      <StyledStopPropagation stopPropagation={stopPropagation}>
        <LoadingSpinner iconSize="extraLarge" message={message} />
      </StyledStopPropagation>
    </Backdrop>
  );
});

const StyledStopPropagation = styled(StopPropagation)``;
export const LoadingGuard = styled(UnStyledLoadingGuard)`
  & > ${StyledStopPropagation} {
    display: inline-block;
  }
`;

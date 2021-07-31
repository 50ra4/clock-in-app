import React, { useCallback } from 'react';
import styled from 'styled-components';
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
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      event.preventDefault();
      if (onClick) {
        onClick(event);
      }
    },
    [onClick],
  );

  if (!open) {
    return null;
  }

  return (
    <div {...otherProps} className={className} area-hidden="true" role="none" onClick={handleClick}>
      <LoadingSpinner iconSize="extraLarge" message={message} />
    </div>
  );
});

export const LoadingGuard = styled(UnStyledLoadingGuard)`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  position: fixed;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
  z-index: ${({ theme }) => theme.zIndex.drawer + 1};
`;

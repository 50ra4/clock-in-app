import React from 'react';
import styled from 'styled-components';

type OwnProps = {
  className?: string;
  open?: boolean;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  children?: React.ReactNode;
};

export type BackdropProps = OwnProps;

function UnStyledBackdrop({ open = false, onClick, children = null, className, ...otherProps }: BackdropProps) {
  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    if (onClick) {
      onClick(event);
    }
  };

  if (!open) {
    return null;
  }

  return (
    <div {...otherProps} className={className} area-hidden="true" role="none" onClick={handleClick}>
      {children}
    </div>
  );
}

export const Backdrop = styled(UnStyledBackdrop)`
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

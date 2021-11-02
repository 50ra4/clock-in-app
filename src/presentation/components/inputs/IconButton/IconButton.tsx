import React from 'react';
import styled from 'styled-components';

type OwnProps = {
  className?: string;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children?: React.ReactNode;
};
type InheritedProps = Omit<JSX.IntrinsicElements['button'], keyof OwnProps>;

export type IconButtonProps = OwnProps & InheritedProps;

function UnStyledIconButton({
  className,
  type = 'button',
  disabled = false,
  onClick,
  children = null,
  ...otherProps
}: IconButtonProps) {
  return (
    <button {...otherProps} type={type} className={className} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

export const IconButton = styled(UnStyledIconButton)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: inherit;
  padding: ${({ theme }) => theme.space.middle}px;
  &:focus {
    outline: 2px solid ${({ theme }) => theme.color.palette.secondary.background};
  }
`;

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

const UnStyledIconButton = React.memo(function UnStyledIconButton({
  className,
  disabled = false,
  onClick,
  children = null,
  ...otherProps
}: IconButtonProps) {
  return (
    <button {...otherProps} className={className} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
});

export const IconButton = styled(UnStyledIconButton)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: inherit;
  padding: ${({ theme }) => theme.space.middle}px;
`;

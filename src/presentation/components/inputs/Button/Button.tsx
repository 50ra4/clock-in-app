import React from 'react';
import styled, { css } from 'styled-components';

type OwnProps = {
  fullWidth?: boolean;
};
type InheritedProps = Omit<JSX.IntrinsicElements['button'], keyof OwnProps>;

export type ButtonProps = OwnProps & InheritedProps;

export const UnStyledButton = React.memo(function Button({ fullWidth = false, children, ...otherProps }: ButtonProps) {
  return <button {...otherProps}>{children}</button>;
});

export const Button = styled(UnStyledButton)`
  color: ${({ theme }) => theme.color.palette.main.font};
  ${({ fullWidth }) =>
    !!fullWidth &&
    css`
      width: 100%;
    `};
`;

import React from 'react';
import styled, { css } from 'styled-components';
import { ColorPalette } from 'styles/theme';

type OwnProps = {
  fullWidth?: boolean;
  color?: ColorPalette;
};
type InheritedProps = Omit<JSX.IntrinsicElements['button'], keyof OwnProps>;

export type ButtonProps = OwnProps & InheritedProps;

export const UnStyledButton = React.memo(function Button({ fullWidth = false, children, ...otherProps }: ButtonProps) {
  return <button {...otherProps}>{children}</button>;
});

export const Button = styled(UnStyledButton)`
  ${({ theme, color = 'default' }) => css`
    color: ${theme.color.palette[color].font};
    background-color: ${theme.color.palette[color].background};
  `}
  ${({ fullWidth }) =>
    !!fullWidth &&
    css`
      width: 100%;
    `};
`;

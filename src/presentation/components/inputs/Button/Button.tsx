import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';
import { ColorPalette } from 'styles/theme';

type OwnProps = {
  fullWidth?: boolean;
  color?: ColorPalette;
  disabled?: boolean;
  variant?: 'outline' | 'default';
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  text?: string;
  children?: React.ReactNode;
};
type InheritedProps = Omit<JSX.IntrinsicElements['button'], keyof OwnProps>;

export type ButtonProps = OwnProps & InheritedProps;

const ButtonRootClassName = 'button';
export const ButtonClassNames = {
  root: ButtonRootClassName,
  text: `${ButtonRootClassName}__text`,
} as const;

export const UnStyledButton = React.memo(function Button({
  className = '',
  fullWidth = false,
  disabled = false,
  text,
  children = null,
  ...otherProps
}: ButtonProps) {
  // eslint-disable-next-line complexity
  useEffect(() => {
    if ((text && children) || (!text && !children)) {
      throw Error('<Button /> Props accepts only text or children');
    }
  }, [text, children]);

  return (
    <button {...otherProps} className={[className, ButtonClassNames.root].join(' ')} disabled={disabled}>
      {text ? <p className={ButtonClassNames.text}>{text}</p> : children}
    </button>
  );
});

export const Button = styled(UnStyledButton)`
  display: inline-block;
  font-size: ${({ theme }) => theme.font.size.middle}px;
  border: 1px solid ${({ theme, color = 'default' }) => theme.color.palette[color].background};
  ${({ theme, color = 'default', variant = 'default' }) =>
    variant === 'default'
      ? css`
          color: ${theme.color.palette[color].font};
          background-color: ${theme.color.palette[color].background};
        `
      : css`
          color: ${({ theme }) => theme.color.palette[color].background};
          background-color: inherit;
        `}
  ${({ theme, disabled, variant = 'default' }) =>
    !!disabled &&
    css`
      border: 1px solid ${theme.color.palette.negative.background};
      color: ${variant === 'outline' && theme.color.palette.negative.background};
      background-color: ${variant === 'default' && theme.color.palette.negative.background};
    `};
  ${({ fullWidth }) =>
    !!fullWidth &&
    css`
      width: 100%;
    `};
  & > .${ButtonClassNames.text} {
    height: 38px;
    line-height: 38px;
    margin: 0 ${({ theme }) => theme.space.large}px;
  }
`;

/* eslint-disable complexity */
import React from 'react';
import styled, { css } from 'styled-components';
import { ColorPalette } from 'presentation/styles/theme';

export type ChipStyle = {
  disabled?: boolean;
  color?: ColorPalette;
  variant?: 'outline' | 'default';
};

type OwnProps = ChipStyle & {
  className?: string;
  disabled?: boolean;
  children: React.ReactNode;
};

export type ChipProps = OwnProps;

export const UnStyledChip = ({ children, ...otherProps }: ChipProps) => {
  return <div {...otherProps}>{children}</div>;
};

const outlineStyle = (isOutline: boolean, color: ColorPalette) =>
  isOutline &&
  css`
    color: ${({ theme }) => theme.color.palette[color].background};
    background-color: inherit;
  `;

const disabledStyle = (isOutline: boolean, disabled: boolean) =>
  disabled &&
  css`
    color: ${({ theme }) => theme.color.palette['negative'][isOutline ? 'background' : 'font']};
    background-color: ${({ theme }) => (isOutline ? 'inherit' : theme.color.palette['negative'].background)};
    border: 1px solid ${({ theme }) => theme.color.palette['negative'].background};
  `;

export const chipStyle = ({ disabled = false, color = 'default', variant = 'default' }: ChipStyle) => css`
  color: ${({ theme }) => theme.color.palette[color].font};
  font-size: ${({ theme }) => theme.font.size.small}px;
  font-family: ${({ theme }) => theme.font.family};
  background-color: ${({ theme }) => theme.color.palette[color].background};
  border: 1px solid ${({ theme }) => theme.color.palette[color].background};
  border-radius: 33px;
  ${outlineStyle(variant === 'outline', color)}
  ${disabledStyle(variant === 'outline', disabled)}
`;

export const Chip = styled(UnStyledChip)`
  ${({ disabled, color, variant }) => chipStyle({ disabled, color, variant })}
  display: inline-block;
  padding: ${({ theme }) => `${theme.space.small}px ${theme.space.large}px`};
`;

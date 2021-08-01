/* eslint-disable complexity */
import React from 'react';
import styled, { css } from 'styled-components';
import { ColorPalette } from 'styles/theme';

type OwnProps = {
  className?: string;
  disabled?: boolean;
  color?: ColorPalette;
  variant?: 'outline' | 'default';
  onClick?: (event: React.MouseEvent<unknown, MouseEvent>) => void;
  children: React.ReactNode;
};

export type ChipProps = OwnProps;

export const UnStyledChip = React.memo(function Chip({ children, ...otherProps }: ChipProps) {
  return <button {...otherProps}>{children}</button>;
});

const outlineStyle = (isOutline: boolean, color: ColorPalette) =>
  isOutline &&
  css`
    color: ${({ theme }) => theme.color.palette[color].background};
    background-color: inherit;
  `;

const disabledStyle = (disabled: boolean) =>
  disabled &&
  css`
    color: ${({ theme }) => theme.color.palette['negative'].font};
    background-color: ${({ theme }) => theme.color.palette['negative'].background};
    border: 1px solid ${({ theme }) => theme.color.palette['negative'].background};
  `;

export const Chip = styled(UnStyledChip)`
  ${({ color = 'default', variant = 'default', disabled, onClick }) => css`
    display: inline-block;
    color: ${({ theme }) => theme.color.palette[color].font};
    font-size: ${({ theme }) => theme.font.size.small}px;
    background-color: ${({ theme }) => theme.color.palette[color].background};
    border: 1px solid ${({ theme }) => theme.color.palette[color].background};
    border-radius: 33px;
    padding: ${({ theme }) => `${theme.space.small}px ${theme.space.large}px`};
    cursor: ${!disabled && !!onClick ? 'pointer' : 'default'};
    // for outline
    ${outlineStyle(variant === 'outline', color)}
    // disable
    ${disabledStyle(!!disabled)}
  `}
`;

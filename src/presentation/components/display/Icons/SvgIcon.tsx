import React from 'react';
import styled from 'styled-components';
import { ColorPalette, IconSize } from 'styles/theme';

export type IconProps = {
  className?: string;
  titleAccess?: string;
  color?: ColorPalette;
  size?: IconSize;
};

export type SvgIconProps = IconProps & {
  viewBox?: string;
  children: React.ReactNode;
};

type StyledProps = Required<Pick<SvgIconProps, 'color' | 'size'>>;
const StyledSvg = styled.svg<StyledProps>`
  fill: ${({ color, theme }) => theme.color.palette[color].background};
  min-width: ${({ size, theme }) => `${theme.icon.size[size]}px`};
  min-height: ${({ size, theme }) => `${theme.icon.size[size]}px`};
`;

/**
 * @see https://github.com/mui-org/material-ui/blob/next/packages/material-ui/src/SvgIcon/SvgIcon.js
 */
export function SvgIcon({
  className,
  titleAccess,
  viewBox = '0 0 24 24',
  color = 'default',
  size = 'medium',
  children = null,
}: SvgIconProps) {
  return (
    <StyledSvg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      color={color}
      size={size}
      aria-hidden={titleAccess ? undefined : true}
      aria-label={titleAccess || undefined}
      role={titleAccess ? 'img' : undefined}
      viewBox={viewBox}
    >
      {children}
    </StyledSvg>
  );
}

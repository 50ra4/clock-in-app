import React from 'react';

import { SvgIcon, IconProps } from './SvgIcon';

/**
 * @see https://fonts.google.com/icons
 */
export const MenuIcon = React.memo(function MenuIcon({ className, titleAccess, color, size }: IconProps) {
  return (
    <SvgIcon className={className} titleAccess={titleAccess} color={color} size={size}>
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />{' '}
    </SvgIcon>
  );
});

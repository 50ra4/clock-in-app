import React from 'react';

import { SvgIcon, IconProps } from './SvgIcon';

/**
 * @see https://fonts.google.com/icons
 */
export const ArrowLeftIcon = React.memo(function ArrowLeftIcon({ className, titleAccess, color, size }: IconProps) {
  return (
    <SvgIcon className={className} titleAccess={titleAccess} color={color} size={size}>
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" />
    </SvgIcon>
  );
});

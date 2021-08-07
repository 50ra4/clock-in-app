import React from 'react';

import { SvgIcon, IconProps } from './SvgIcon';

/**
 * @see https://fonts.google.com/icons
 */
export const ArrowDropDownIcon = React.memo(function ArrowDropDownIcon({
  className,
  titleAccess,
  color,
  size,
}: IconProps) {
  return (
    <SvgIcon className={className} titleAccess={titleAccess} color={color} size={size}>
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M7 10l5 5 5-5z" />
    </SvgIcon>
  );
});

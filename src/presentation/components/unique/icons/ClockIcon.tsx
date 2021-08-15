import React from 'react';
import { IconProps, SvgIcon } from 'presentation/components/display/Icons/SvgIcon';

/**
 * watch_later icon
 * @see https://fonts.google.com/icons
 */
export const ClockIcon = React.memo(function ClockIcon({ className, titleAccess, color, size }: IconProps) {
  return (
    <SvgIcon className={className} titleAccess={titleAccess} color={color} size={size} viewBox="0 0 24 24">
      <g>
        <rect fill="none" x="0" />
      </g>
      <g>
        <g>
          <path d="M12,2C6.5,2,2,6.5,2,12s4.5,10,10,10s10-4.5,10-10S17.5,2,12,2z M12,20c-4.41,0-8-3.59-8-8s3.59-8,8-8s8,3.59,8,8 S16.41,20,12,20z M12.5,7H11v6l5.2,3.2l0.8-1.3l-4.5-2.7V7z" />
        </g>
      </g>
    </SvgIcon>
  );
});

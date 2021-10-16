import { BackSpaceIcon } from 'presentation/components/display/Icons/BackSpaceIcon';
import React from 'react';
import { IconButton, IconButtonProps } from '../IconButton/IconButton';

export type BackSpaceButtonProps = Omit<IconButtonProps, 'children'> & { ariaLabel?: string };

export const BackSpaceButton = React.memo(function BackSpaceButton({
  ref,
  ariaLabel = '削除',
  ...otherProps
}: BackSpaceButtonProps) {
  return (
    <IconButton aria-label={ariaLabel} {...otherProps}>
      <BackSpaceIcon />
    </IconButton>
  );
});

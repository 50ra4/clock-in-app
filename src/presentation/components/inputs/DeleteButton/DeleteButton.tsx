import { DeleteIcon } from 'presentation/components/display/Icons/DeleteIcon';
import React from 'react';
import { IconButton, IconButtonProps } from '../IconButton/IconButton';

export type DeleteButtonProps = Omit<IconButtonProps, 'children'> & { ariaLabel?: string };

export const DeleteButton = React.memo(function DeleteButton({
  ref,
  ariaLabel = '削除',
  ...otherProps
}: DeleteButtonProps) {
  return (
    <IconButton aria-label={ariaLabel} {...otherProps}>
      <DeleteIcon />
    </IconButton>
  );
});

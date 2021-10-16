import { DeleteIcon } from 'presentation/components/display/Icons/DeleteIcon';
import React from 'react';
import { IconButton, IconButtonProps } from '../IconButton/IconButton';

export type InputDeleteButtonProps = Omit<IconButtonProps, 'children'> & { areaLabel?: string };

export const InputDeleteButton = React.memo(function InputDeleteButton({
  ref,
  areaLabel = '削除',
  ...otherProps
}: InputDeleteButtonProps) {
  return (
    <IconButton aria-label={areaLabel} {...otherProps}>
      <DeleteIcon />
    </IconButton>
  );
});

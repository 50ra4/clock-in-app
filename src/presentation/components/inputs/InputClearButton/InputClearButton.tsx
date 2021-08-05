import { HighLightOffIcon } from 'presentation/components/display/Icons/HighLightOff';
import React from 'react';
import { IconButton, IconButtonProps } from '../IconButton/IconButton';

export type InputClearButtonProps = Omit<IconButtonProps, 'children'>;

export const InputClearButton = React.memo(function InputClearButton({ ref, ...otherProps }: IconButtonProps) {
  return (
    <IconButton aria-label="クリア" {...otherProps}>
      <HighLightOffIcon />
    </IconButton>
  );
});

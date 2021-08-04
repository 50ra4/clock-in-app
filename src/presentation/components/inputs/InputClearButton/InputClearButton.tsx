import { HighLightOffIcon } from 'presentation/components/display/Icons/HighLightOff';
import React from 'react';
import styled from 'styled-components';
import { IconButton, IconButtonProps } from '../IconButton/IconButton';

export type InputClearButtonProps = Omit<IconButtonProps, 'children'>;

const UnStyledInputClearButton = React.memo(function UnStyledInputClearButton({ ref, ...otherProps }: IconButtonProps) {
  return (
    <IconButton {...otherProps}>
      <HighLightOffIcon />
    </IconButton>
  );
});

export const InputClearButton = styled(UnStyledInputClearButton)``;

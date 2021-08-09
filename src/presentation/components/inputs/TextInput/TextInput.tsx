import React from 'react';
import styled from 'styled-components';
import { InputBase, InputBaseProps } from '../InputBase/InputBase';
import { InputClearButton } from '../InputClearButton/InputClearButton';

type OwnProps = {
  type?: 'email' | 'tel' | 'text' | 'url';
  description?: string;
  onClear?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export type TextInputProps = OwnProps & Omit<InputBaseProps, keyof OwnProps>;

export const UnStyledTextInput = React.memo(function TextInput({
  ref,
  className,
  type = 'text',
  error,
  description,
  value = '',
  onClear,
  ...otherProps
}: TextInputProps) {
  return (
    <div className={className}>
      <InputBase {...otherProps} type={type} rightIcon={true} error={error} value={value} />
      {value && <StyledInputClearButton onClick={onClear} />}
    </div>
  );
});

const StyledInputClearButton = styled(InputClearButton)``;
export const TextInput = styled(UnStyledTextInput)`
  width: 100%;
  position: relative;
  & > ${StyledInputClearButton} {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
  }
`;

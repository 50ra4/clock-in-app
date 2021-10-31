import React from 'react';
import styled from 'styled-components';
import { InputBase, InputBaseProps } from '../InputBase/InputBase';
import { InputClearButton } from '../InputClearButton/InputClearButton';

type OwnProps = {
  value: number | undefined;
  min?: number;
  max?: number;
  description?: string;
  onClear?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export type NumberInputProps = OwnProps & Omit<InputBaseProps, keyof OwnProps | 'type'>;

export function UnStyledNumberInput({
  ref,
  className,
  error,
  description,
  value,
  disabled,
  readOnly,
  onClear,
  ...otherProps
}: NumberInputProps) {
  const showClearIcon = typeof value === 'number' && !readOnly;

  return (
    <div className={className}>
      <InputBase
        {...otherProps}
        type="number"
        disabled={disabled}
        readOnly={readOnly}
        rightIcon={showClearIcon}
        error={error}
        value={`${value ?? ''}`}
      />
      {showClearIcon && <StyledInputClearButton disabled={disabled} onClick={onClear} />}
    </div>
  );
}

const StyledInputClearButton = styled(InputClearButton)``;
export const NumberInput = styled(UnStyledNumberInput)`
  width: 100%;
  position: relative;
  & > ${StyledInputClearButton} {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
  }
`;

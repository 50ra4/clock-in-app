import React from 'react';
import styled from 'styled-components';
import format from 'date-fns/format';

import { InputBase, InputBaseProps } from '../InputBase/InputBase';
import { DATE_FORMAT } from 'constants/dateFormat';

type OwnProps = {
  className?: string;
  id: string;
  name: string;
  value?: string;
  error?: string;
  placeholder?: string;
  max?: Date;
  min?: Date;
  onChange: (date: string, event?: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (date: string, event?: React.FocusEvent<HTMLInputElement>) => void;
  onClear?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

type ExcludeProps = 'children' | 'type' | 'ref';
export type DateInputProps = OwnProps & Omit<InputBaseProps, ExcludeProps | keyof OwnProps>;

export const UnStyledDateInput = React.memo(function DateInput({
  className,
  id,
  name,
  value,
  error,
  placeholder,
  min,
  max,
  onChange,
}: DateInputProps) {
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.currentTarget.value, e);
  };

  const maxDateString = max ? format(max, DATE_FORMAT.dateISO) : undefined;
  const minDateString = min ? format(min, DATE_FORMAT.dateISO) : undefined;

  return (
    <div className={className}>
      <InputBase
        type="date"
        id={id}
        name={name}
        className={className}
        value={value}
        max={maxDateString}
        min={minDateString}
        error={error}
        placeholder={placeholder}
        onChange={handleOnChange}
      />
    </div>
  );
});

export const DateInput = styled(UnStyledDateInput)``;

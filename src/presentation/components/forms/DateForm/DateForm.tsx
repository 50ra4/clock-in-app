import React from 'react';
import styled from 'styled-components';
import { isMobile } from 'react-device-detect';

import { FormBaseProps } from '../FormBase/FormBase';
import { DescriptionForForm } from '../DescriptionForForm/DescriptionForForm';
import { ErrorMessageForForm } from '../ErrorMessageForForm/ErrorMessageForForm';
import { WithLabelForForm } from '../WithLabelForForm/WithLabelForForm';
import { DateInput } from 'presentation/components/inputs/DateInput/DateInput';
import { DateSelect } from 'presentation/components/inputs/DateSelect/DateSelect';

type OwnProps = {
  type?: 'select' | 'input';
  min?: Date;
  max?: Date;
  onChange: (date: string, event?: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onBlur: (date: string, event?: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onClear?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export type DateFormProps = OwnProps & Omit<FormBaseProps<string>, keyof OwnProps>;

// eslint-disable-next-line complexity
export const UnStyledDateForm = React.memo(function DateForm({
  className,
  type = isMobile ? 'input' : 'select',
  id,
  name,
  value,
  placeholder,
  readOnly,
  label,
  required,
  inline,
  error,
  description,
  min,
  max,
  onChange,
  onBlur,
}: DateFormProps) {
  return (
    <div className={className}>
      <WithLabelForForm htmlFor={id} label={label} required={required} inline={inline}>
        {description && <DescriptionForForm description={description} />}
        {type === 'input' ? (
          <DateInput
            id={id}
            name={name}
            value={value}
            error={error}
            placeholder={placeholder}
            readOnly={readOnly}
            min={min}
            max={max}
            onChange={(date) => {
              onChange(date);
            }}
            onBlur={(date) => {
              onBlur(date);
            }}
          />
        ) : (
          <DateSelect
            id={id}
            name={name}
            value={value}
            error={error}
            min={min}
            max={max}
            onChange={(date) => {
              onChange(date);
            }}
            onBlur={(date) => {
              onBlur(date);
            }}
          />
        )}
        {error && <ErrorMessageForForm message={error} />}
      </WithLabelForForm>
    </div>
  );
});

export const DateForm = styled(UnStyledDateForm)``;

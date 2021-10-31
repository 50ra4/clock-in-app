import React from 'react';
import styled from 'styled-components';
import { DescriptionForForm } from '../DescriptionForForm/DescriptionForForm';
import { ErrorMessageForForm } from '../ErrorMessageForForm/ErrorMessageForForm';
import { WithLabelForForm } from '../WithLabelForForm/WithLabelForForm';
import { FormBaseProps } from '../FormBase/FormBase';
import { NumberInput } from 'presentation/components/inputs/NumberInput/NumberInput';

type OwnProps = {
  min?: number;
  max?: number;
  onChange?: (number: number) => void;
  onBlur?: (number: number) => void;
  onClear?: () => void;
};

export type MinuteFormProps = OwnProps & Omit<FormBaseProps<number>, keyof OwnProps>;

export const UnStyledMinuteForm = React.memo(function MinuteForm({
  className,
  id,
  name,
  value,
  min,
  max,
  placeholder,
  readOnly,
  label,
  required,
  inline,
  error,
  description,
  onChange,
  onBlur,
  onClear,
}: MinuteFormProps) {
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!onChange) return;
    const targetValue = event.currentTarget.value;
    onChange(parseInt(targetValue, 10));
  };

  const handleOnBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (!onBlur) return;
    const targetValue = event.currentTarget.value;
    onBlur(parseInt(targetValue, 10));
  };

  return (
    <div className={className}>
      <WithLabelForForm htmlFor={id} label={label} required={required} inline={inline}>
        {description && <DescriptionForForm description={description} />}
        <NumberInput
          id={id}
          name={name}
          value={value}
          min={min}
          max={max}
          error={error}
          placeholder={placeholder}
          readOnly={readOnly}
          onChange={handleOnChange}
          onBlur={handleOnBlur}
          onClear={onClear}
        />
        {error && <ErrorMessageForForm message={error} />}
      </WithLabelForForm>
    </div>
  );
});

export const MinuteForm = styled(UnStyledMinuteForm)``;

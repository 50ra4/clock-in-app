import React from 'react';
import styled from 'styled-components';
import { DescriptionForForm } from '../DescriptionForForm/DescriptionForForm';
import { ErrorMessageForForm } from '../ErrorMessageForForm/ErrorMessageForForm';
import { WithLabelForForm } from '../WithLabelForForm/WithLabelForForm';
import { FormBaseProps } from '../FormBase/FormBase';
import { TextInput, TextInputProps } from 'presentation/components/inputs/TextInput/TextInput';

type OwnProps = {
  type?: TextInputProps['type'];
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onClear?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export type TextFormProps = OwnProps & Omit<FormBaseProps<string>, keyof OwnProps>;

export const UnStyledTextForm = React.memo(function TextForm({
  className,
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
  type,
  onChange,
  onBlur,
  onClear,
}: TextFormProps) {
  return (
    <div className={className}>
      <WithLabelForForm htmlFor={id} label={label} required={required} inline={inline}>
        {description && <DescriptionForForm description={description} />}
        <TextInput
          type={type}
          id={id}
          name={name}
          value={value}
          error={error}
          placeholder={placeholder}
          readOnly={readOnly}
          onChange={onChange}
          onBlur={onBlur}
          onClear={onClear}
        />
        {error && <ErrorMessageForForm message={error} />}
      </WithLabelForForm>
    </div>
  );
});

export const TextForm = styled(UnStyledTextForm)``;

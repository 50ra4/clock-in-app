import React from 'react';
import styled from 'styled-components';
import { DescriptionForForm } from '../DescriptionForForm/DescriptionForForm';
import { ErrorMessageForForm } from '../ErrorMessageForForm/ErrorMessageForForm';
import { PasswordInput } from 'presentation/components/inputs/PasswordInput/PasswordInput';
import { WithLabelForForm } from '../WithLabelForForm/WithLabelForForm';
import { FormBaseProps } from '../FormBase/FormBase';

type OwnProps = {
  name?: string;
  label?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
};

export type PasswordFormProps = OwnProps & Omit<FormBaseProps<string>, keyof OwnProps>;

export const UnStyledPasswordForm = React.memo(function PasswordForm({
  className,
  id,
  name = 'password',
  value,
  placeholder,
  readOnly,
  label = 'パスワード',
  required,
  inline,
  error,
  description,
  onChange,
  onBlur,
}: PasswordFormProps) {
  return (
    <div className={className}>
      <WithLabelForForm htmlFor={id} label={label} required={required} inline={inline}>
        {description && <DescriptionForForm description={description} />}
        <PasswordInput
          id={id}
          name={name}
          value={value}
          error={error}
          placeholder={placeholder}
          readOnly={readOnly}
          onChange={onChange}
          onBlur={onBlur}
        />
        {error && <ErrorMessageForForm message={error} />}
      </WithLabelForForm>
    </div>
  );
});

export const PasswordForm = styled(UnStyledPasswordForm)``;

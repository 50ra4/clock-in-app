import React from 'react';
import styled from 'styled-components';
import { DescriptionForForm } from '../DescriptionForForm/DescriptionForForm';
import { ErrorMessageForForm } from '../ErrorMessageForForm/ErrorMessageForForm';
import { WithLabelForForm } from '../WithLabelForForm/WithLabelForForm';
import { FormBaseProps } from '../FormBase/FormBase';
import { TextArea } from 'presentation/components/inputs/TextArea/TextArea';

type OwnProps = {
  row?: number;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
};

export type TextAreaFormProps = OwnProps & Omit<FormBaseProps<string>, keyof OwnProps>;

export const UnStyledTextAreaForm = React.memo(function TextAreaForm({
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
  row,
  onChange,
  onBlur,
}: TextAreaFormProps) {
  return (
    <div className={className}>
      <WithLabelForForm htmlFor={id} label={label} required={required} inline={inline}>
        {description && <DescriptionForForm description={description} />}
        <TextArea
          id={id}
          name={name}
          value={value}
          error={!!error}
          placeholder={placeholder}
          readOnly={readOnly}
          row={row}
          onChange={onChange}
          onBlur={onBlur}
        />
        {error && <ErrorMessageForForm message={error} />}
      </WithLabelForForm>
    </div>
  );
});

export const TextAreaForm = styled(UnStyledTextAreaForm)``;

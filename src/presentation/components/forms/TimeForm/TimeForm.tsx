import React from 'react';
import styled from 'styled-components';
import { isMobile } from 'react-device-detect';

import { FormBaseProps } from '../FormBase/FormBase';
import { DescriptionForForm } from '../DescriptionForForm/DescriptionForForm';
import { ErrorMessageForForm } from '../ErrorMessageForForm/ErrorMessageForForm';
import { WithLabelForForm } from '../WithLabelForForm/WithLabelForForm';
import { TimeTextInput } from 'presentation/components/inputs/TimeTextInput/TimeTextInput';
import { TimeInput } from 'presentation/components/inputs/TimeInput/TimeInput';
import { Time } from 'types';

type OwnProps = {
  type?: 'text' | 'input';
  onChange: (time: Time, event?: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onBlur: (time: Time, event?: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onClear?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export type TimeFormProps = OwnProps & Omit<FormBaseProps<Time>, keyof OwnProps>;

// eslint-disable-next-line complexity
export const UnStyledTimeForm = React.memo(function TimeForm({
  className,
  type = isMobile ? 'input' : 'text',
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
  onChange,
  onBlur,
}: TimeFormProps) {
  return (
    <div className={className}>
      <WithLabelForForm htmlFor={id} label={label} required={required} inline={inline}>
        {description && <DescriptionForForm description={description} />}
        {type === 'input' ? (
          <TimeInput
            id={id}
            name={name}
            value={value}
            error={error}
            placeholder={placeholder}
            readOnly={readOnly}
            onChange={(time) => {
              onChange(time);
            }}
          />
        ) : (
          <TimeTextInput
            id={id}
            name={name}
            value={value}
            error={error}
            onBlur={(time) => {
              onBlur(time);
            }}
          />
        )}
        {error && <ErrorMessageForForm message={error} />}
      </WithLabelForForm>
    </div>
  );
});

export const TimeForm = styled(UnStyledTimeForm)``;

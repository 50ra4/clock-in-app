import React from 'react';
import styled from 'styled-components';

import { InHouseWork, Time, Range } from 'types';
import { FormBaseProps } from 'presentation/components/forms/FormBase/FormBase';
import { DescriptionForForm } from 'presentation/components/forms/DescriptionForForm/DescriptionForForm';
import { ErrorMessageForForm } from 'presentation/components/forms/ErrorMessageForForm/ErrorMessageForForm';
import { WithLabelForForm } from 'presentation/components/forms/WithLabelForForm/WithLabelForForm';
import { TimeTextInput } from 'presentation/components/inputs/TimeTextInput/TimeTextInput';
import { TimeInput } from 'presentation/components/inputs/TimeInput/TimeInput';
import { TextInput } from 'presentation/components/inputs/TextInput/TextInput';

type OwnProps = {
  type?: 'text' | 'input';
  row?: number;
  onChange: (value: InHouseWork, row: number) => void;
  onBlur?: (value: InHouseWork, row: number) => void;
};

export type InHouseWorkFormProps = OwnProps & Omit<FormBaseProps<InHouseWork>, keyof OwnProps>;

// eslint-disable-next-line complexity
export const InHouseWorkForm = React.memo(function InHouseWorkForm({
  className,
  type = 'text',
  id,
  name,
  row = 0,
  value = { id: undefined },
  readOnly,
  disabled,
  label,
  required,
  inline,
  error,
  description,
  onChange,
}: InHouseWorkFormProps) {
  const handleOnChangeTime = (time: Time, key: keyof Range<Time>) => {
    onChange({ ...value, [key]: time }, row);
  };

  const handleOnChangeRemarks = (remarks: string) => {
    onChange({ ...value, remarks }, row);
  };

  return (
    <div className={className}>
      <WithLabelForForm htmlFor={id} label={label} required={required} inline={inline}>
        {description && <DescriptionForForm description={description} />}
        <StyledInputWrapper>
          {type === 'text' ? (
            <StyledTimeTextInput
              id={id}
              name={name}
              value={value?.start}
              placeholder="hh:mm"
              readOnly={readOnly}
              disabled={disabled}
              error={error}
              onBlur={(time) => {
                handleOnChangeTime(time, 'start');
              }}
            />
          ) : (
            <StyledTimeInput
              id={id}
              name={name}
              value={value?.start}
              placeholder="hh:mm"
              readOnly={readOnly}
              disabled={disabled}
              error={error}
              onChange={(time) => {
                handleOnChangeTime(time, 'start');
              }}
            />
          )}
          <StyledSeparator aria-label="から">~</StyledSeparator>
          {type === 'text' ? (
            <StyledTimeTextInput
              id={`${id}-end`}
              name={`${name}-end`}
              value={value?.end}
              placeholder="hh:mm"
              readOnly={readOnly}
              disabled={disabled}
              error={error}
              onBlur={(time) => {
                handleOnChangeTime(time, 'end');
              }}
            />
          ) : (
            <StyledTimeInput
              id={`${id}-end`}
              name={`${name}-end`}
              value={value?.end}
              placeholder="hh:mm"
              readOnly={readOnly}
              disabled={disabled}
              error={error}
              onChange={(time) => {
                handleOnChangeTime(time, 'end');
              }}
            />
          )}
          <StyledTextInput
            id={`${id}-remarks`}
            name="inHouseWork-remarks"
            value={value.remarks}
            error={error}
            placeholder="内訳を入力してください"
            readOnly={readOnly}
            disabled={disabled}
            onChange={(e) => {
              handleOnChangeRemarks(e.currentTarget?.value ?? '');
            }}
            onClear={(e) => {
              handleOnChangeRemarks('');
            }}
          />
        </StyledInputWrapper>
        {error && <ErrorMessageForForm message={error} />}
      </WithLabelForForm>
    </div>
  );
});

const StyledInputWrapper = styled.div`
  height: 48px;
  display: flex;
  align-items: center;
  flex-direction: row;
`;
const StyledSeparator = styled.span`
  display: block;
  width: 24px;
  flex-shrink: 0;
  line-height: 48px;
  text-align: center;
  font-size: ${({ theme }) => theme.font.size.large}px;
  font-weight: ${({ theme }) => theme.font.weight.bold};
`;
const StyledTimeTextInput = styled(TimeTextInput)`
  width: 64px;
  flex-shrink: 0;
`;
const StyledTimeInput = styled(TimeInput)`
  width: 64px;
  flex-shrink: 0;
`;
const StyledTextInput = styled(TextInput)`
  flex-shrink: 1;
  margin-left: ${({ theme }) => theme.space.large}px;
`;

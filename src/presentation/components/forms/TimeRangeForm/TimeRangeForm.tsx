import React from 'react';
import styled from 'styled-components';

import { Time, Range } from 'types';
import { FormBaseProps } from 'presentation/components/forms/FormBase/FormBase';
import { DescriptionForForm } from 'presentation/components/forms/DescriptionForForm/DescriptionForForm';
import { ErrorMessageForForm } from 'presentation/components/forms/ErrorMessageForForm/ErrorMessageForForm';
import { WithLabelForForm } from 'presentation/components/forms/WithLabelForForm/WithLabelForForm';
import { TimeTextInput } from 'presentation/components/inputs/TimeTextInput/TimeTextInput';
import { TimeInput } from 'presentation/components/inputs/TimeInput/TimeInput';
import { DeleteButton } from 'presentation/components/inputs/DeleteButton/DeleteButton';

type TimeRange = Range<Time>;
type OwnProps = {
  type?: 'text' | 'input';
  extendInput?: boolean;
  onChange: (value: TimeRange) => void;
  onClear?: () => void;
  onBlur?: (value: TimeRange) => void;
};

export type TimeRangeFormProps = OwnProps & Omit<FormBaseProps<TimeRange>, keyof OwnProps>;

// eslint-disable-next-line complexity
export const TimeRangeForm = React.memo(function TimeRangeForm({
  className,
  type = 'text',
  id,
  name,
  extendInput = true,
  value = {},
  readOnly,
  disabled,
  label,
  required,
  inline,
  error,
  description,
  onChange,
  onClear,
}: TimeRangeFormProps) {
  const handleOnChangeTime = (time: Time, key: keyof Range<Time>) => {
    onChange({ ...value, [key]: time });
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
          <StyledSeparator aria-label="??????">~</StyledSeparator>
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
          {!extendInput && <StyledEmptyArea />}
          {!readOnly && !!onClear && (
            <StyledDeleteButton disabled={disabled} ariaLabel={`${label}???????????????`} onClick={() => onClear()} />
          )}
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
  flex-grow: 1;
`;
const StyledTimeInput = styled(TimeInput)`
  width: 64px;
  flex-shrink: 0;
  flex-grow: 1;
`;
const StyledEmptyArea = styled.div`
  width: 100%;
  flex-shrink: 1;
`;
const StyledDeleteButton = styled(DeleteButton)`
  flex-shrink: 0;
  margin-left: ${({ theme }) => theme.space.middle}px;
`;

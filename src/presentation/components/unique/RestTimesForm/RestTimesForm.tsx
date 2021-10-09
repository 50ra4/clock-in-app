import React from 'react';
import styled from 'styled-components';
import { isMobile } from 'react-device-detect';

import { Time, Range, RestTime } from 'types';
import { FormBaseProps } from 'presentation/components/forms/FormBase/FormBase';
import { DescriptionForForm } from 'presentation/components/forms/DescriptionForForm/DescriptionForForm';
import { ErrorMessageForForm } from 'presentation/components/forms/ErrorMessageForForm/ErrorMessageForForm';
import { WithLabelForForm } from 'presentation/components/forms/WithLabelForForm/WithLabelForForm';
import { TimeTextInput } from 'presentation/components/inputs/TimeTextInput/TimeTextInput';
import { TimeInput } from 'presentation/components/inputs/TimeInput/TimeInput';
import { Button } from 'presentation/components/inputs/Button/Button';
import { AddCircleIcon } from 'presentation/components/display/Icons/AddCircleIcon';

type OwnProps = {
  type?: 'text' | 'input';
  onChange: (values: RestTime[]) => void;
  onBlur?: (values: RestTime[]) => void;
};

export type RestTimesFormProps = OwnProps & Omit<FormBaseProps<RestTime[]>, keyof OwnProps>;

const rootClassName = 'time-range-group-form';
export const RestTimesFormClassNames = {
  root: rootClassName,
  wrap: `${rootClassName}__wrap`,
} as const;

// eslint-disable-next-line complexity
export const UnStyledRestTimesForm = React.memo(function RestTimesForm({
  className,
  type = isMobile ? 'input' : 'text',
  id,
  name,
  value: values = [],
  placeholder,
  readOnly,
  disabled,
  label,
  required,
  inline,
  error,
  description,
  onChange,
}: RestTimesFormProps) {
  const handleOnChange = (time: Time, rowIndex: number, key: keyof Range<Time>) => {
    onChange(values.map((v, i) => (rowIndex !== i ? v : { ...v, [key]: time })));
  };

  return (
    <div className={className}>
      <WithLabelForForm htmlFor={id} label={label} required={required} inline={inline}>
        {description && <DescriptionForForm description={description} />}
        {values.map((value, rowIndex) => {
          return (
            <div key={`${id}-${rowIndex}`} className={RestTimesFormClassNames.wrap}>
              {type === 'text' ? (
                <StyledTimeTextInput
                  id={id}
                  name={name}
                  value={value?.start}
                  placeholder={placeholder}
                  readOnly={readOnly}
                  disabled={disabled}
                  error={error}
                  onBlur={(time) => {
                    handleOnChange(time, rowIndex, 'start');
                  }}
                />
              ) : (
                <StyledTimeInput
                  id={id}
                  name={name}
                  value={value?.start}
                  placeholder={placeholder}
                  readOnly={readOnly}
                  disabled={disabled}
                  error={error}
                  onChange={(time) => {
                    handleOnChange(time, rowIndex, 'start');
                  }}
                />
              )}
              <span>~</span>
              {type === 'text' ? (
                <StyledTimeTextInput
                  id={`${id}-end`}
                  name={`${name}-end`}
                  value={value?.end}
                  placeholder={placeholder}
                  readOnly={readOnly}
                  disabled={disabled}
                  error={error}
                  onBlur={(time) => {
                    handleOnChange(time, rowIndex, 'end');
                  }}
                />
              ) : (
                <StyledTimeInput
                  id={`${id}-end`}
                  name={`${name}-end`}
                  value={value?.end}
                  placeholder={placeholder}
                  readOnly={readOnly}
                  disabled={disabled}
                  error={error}
                  onChange={(time) => {
                    handleOnChange(time, rowIndex, 'end');
                  }}
                />
              )}
            </div>
          );
        })}
        {!readOnly && (
          <StyledButton
            disabled={disabled}
            onClick={() => {
              onChange([...values, { id: undefined, start: undefined, end: undefined }]);
            }}
          >
            <div>
              <AddCircleIcon color="main" />
              {label}を追加
            </div>
          </StyledButton>
        )}
        {error && <ErrorMessageForForm message={error} />}
      </WithLabelForForm>
    </div>
  );
});

const StyledTimeTextInput = styled(TimeTextInput)``;
const StyledTimeInput = styled(TimeInput)``;
const StyledButton = styled(Button)``;
export const RestTimesForm = styled(UnStyledRestTimesForm)`
  div.${RestTimesFormClassNames.wrap} {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    & > ${StyledTimeTextInput} {
      width: 82px;
    }
    & > ${StyledTimeInput} {
      /* FIXME adjust size */
      width: 100px;
    }
    & > span {
      max-width: 28px;
      height: 28px;
      line-height: 28px;
      text-align: center;
      font-size: ${({ theme }) => theme.font.size.large}px;
      font-weight: ${({ theme }) => theme.font.weight.bold};
    }
    margin-bottom: ${({ theme }) => theme.space.large}px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  ${StyledButton} {
    min-width: 160px;
    & > div {
      height: 48px;
      display: flex;
      justify-content: center;
      align-items: center;
      & > svg {
        width: 24px;
        height: 24px;
      }
    }
  }
`;

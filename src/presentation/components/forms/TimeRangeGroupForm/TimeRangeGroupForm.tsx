import React from 'react';
import styled from 'styled-components';
import { isMobile } from 'react-device-detect';

import { Time, Range } from 'types';
import { FormBaseProps } from '../FormBase/FormBase';
import { DescriptionForForm } from '../DescriptionForForm/DescriptionForForm';
import { ErrorMessageForForm } from '../ErrorMessageForForm/ErrorMessageForForm';
import { WithLabelForForm } from '../WithLabelForForm/WithLabelForForm';
import { TimeTextInput } from 'presentation/components/inputs/TimeTextInput/TimeTextInput';
import { TimeInput } from 'presentation/components/inputs/TimeInput/TimeInput';
import { Button } from 'presentation/components/inputs/Button/Button';
import { AddCircleIcon } from 'presentation/components/display/Icons/AddCircleIcon';

type OwnProps = {
  type?: 'text' | 'input';
  onChange: (values: Range<Time>[]) => void;
  onBlur?: (values: Range<Time>[]) => void;
};

export type TimeRangeGroupFormProps = OwnProps & Omit<FormBaseProps<Range<Time>[]>, keyof OwnProps>;

const rootClassName = 'time-range-group-form';
export const TimeRangeGroupFormClassNames = {
  root: rootClassName,
  wrap: `${rootClassName}__wrap`,
} as const;

// eslint-disable-next-line complexity
export const UnStyledTimeRangeGroupForm = React.memo(function TimeRangeGroupForm({
  className,
  type = isMobile ? 'input' : 'text',
  id,
  name,
  value: values = [],
  placeholder,
  readOnly,
  label,
  required,
  inline,
  error,
  description,
  onChange,
}: TimeRangeGroupFormProps) {
  const handleOnChange = (time: Time, rowIndex: number, key: keyof Range<Time>) => {
    onChange(values.map((v, i) => (rowIndex !== i ? v : { ...v, [key]: time })));
  };

  return (
    <div className={className}>
      <WithLabelForForm htmlFor={id} label={label} required={required} inline={inline}>
        {description && <DescriptionForForm description={description} />}
        {values.map((value, rowIndex) => {
          return (
            <div key={`${id}-${rowIndex}`} className={TimeRangeGroupFormClassNames.wrap}>
              {type === 'text' ? (
                <StyledTimeTextInput
                  id={id}
                  name={name}
                  value={value?.start}
                  placeholder={placeholder}
                  readOnly={readOnly}
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
                  error={error}
                  onChange={(time) => {
                    handleOnChange(time, rowIndex, 'end');
                  }}
                />
              )}
            </div>
          );
        })}
        <StyledButton
          onClick={() => {
            onChange([...values, { start: undefined, end: undefined }]);
          }}
        >
          <div>
            <AddCircleIcon color="main" />
            {label}を追加
          </div>
        </StyledButton>
        {error && <ErrorMessageForForm message={error} />}
      </WithLabelForForm>
    </div>
  );
});

const StyledTimeTextInput = styled(TimeTextInput)``;
const StyledTimeInput = styled(TimeInput)``;
const StyledButton = styled(Button)``;
export const TimeRangeGroupForm = styled(UnStyledTimeRangeGroupForm)`
  div.${TimeRangeGroupFormClassNames.wrap} {
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

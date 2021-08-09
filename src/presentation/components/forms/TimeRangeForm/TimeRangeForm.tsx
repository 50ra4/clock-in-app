import React, { useCallback } from 'react';
import styled from 'styled-components';
import { isMobile } from 'react-device-detect';

import { Time, Range } from 'types';
import { FormBaseProps } from '../FormBase/FormBase';
import { DescriptionForForm } from '../DescriptionForForm/DescriptionForForm';
import { ErrorMessageForForm } from '../ErrorMessageForForm/ErrorMessageForForm';
import { WithLabelForForm } from '../WithLabelForForm/WithLabelForForm';
import { TimeTextInput } from 'presentation/components/inputs/TimeTextInput/TimeTextInput';
import { TimeInput } from 'presentation/components/inputs/TimeInput/TimeInput';

type OwnProps = {
  type?: 'text' | 'input';
  // FIXME: type?
  onChange: (fn: (prev: Range<Time>) => Range<Time>) => void;
  // TODO:
  onBlur: (time: Range<Time>) => void;
  onClear?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export type TimeRangeFormProps = OwnProps & Omit<FormBaseProps<Range<Time>>, keyof OwnProps>;

const rootClassName = 'time-range-form';
export const TimeRangeFormClassNames = {
  root: rootClassName,
  wrap: `${rootClassName}__wrap`,
} as const;

// eslint-disable-next-line complexity
export const UnStyledTimeRangeForm = React.memo(function TimeRangeForm({
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
}: TimeRangeFormProps) {
  const handleOnChangeStart = useCallback(
    (time: Time) => {
      onChange((prev) => ({ ...prev, start: time }));
    },
    [onChange],
  );
  const handleOnChangeEnd = useCallback(
    (time: Time) => {
      onChange((prev) => ({ ...prev, end: time }));
    },
    [onChange],
  );
  const handleOnBlurStart = useCallback(
    (time: Time) => {
      onChange((prev) => ({ ...prev, start: time }));
    },
    [onChange],
  );
  const handleOnBlurEnd = useCallback(
    (time: Time) => {
      onChange((prev) => ({ ...prev, end: time }));
    },
    [onChange],
  );

  return (
    <div className={className}>
      <WithLabelForForm htmlFor={id} label={label} required={required} inline={inline}>
        {description && <DescriptionForForm description={description} />}
        <div className={TimeRangeFormClassNames.wrap}>
          {type === 'text' ? (
            <StyledTimeTextInput
              id={id}
              name={name}
              value={value?.start}
              placeholder={placeholder}
              readOnly={readOnly}
              error={error}
              onBlur={handleOnBlurStart}
            />
          ) : (
            <StyledTimeInput
              id={id}
              name={name}
              value={value?.start}
              placeholder={placeholder}
              readOnly={readOnly}
              error={error}
              onChange={handleOnChangeStart}
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
              onBlur={handleOnBlurEnd}
            />
          ) : (
            <StyledTimeInput
              id={`${id}-end`}
              name={`${name}-end`}
              value={value?.end}
              placeholder={placeholder}
              readOnly={readOnly}
              error={error}
              onChange={handleOnChangeEnd}
            />
          )}
        </div>
        {error && <ErrorMessageForForm message={error} />}
      </WithLabelForForm>
    </div>
  );
});

const StyledTimeTextInput = styled(TimeTextInput)``;
const StyledTimeInput = styled(TimeInput)``;
export const TimeRangeForm = styled(UnStyledTimeRangeForm)`
  div.${TimeRangeFormClassNames.wrap} {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    & > ${StyledTimeTextInput}, & > ${StyledTimeInput} {
      width: 100px;
    }
    & > span {
      width: 38px;
      height: 38px;
      line-height: 38px;
      text-align: center;
      font-size: ${({ theme }) => theme.font.size.large}px;
      font-weight: ${({ theme }) => theme.font.weight.bold};
    }
  }
`;

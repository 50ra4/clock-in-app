import React, { useCallback } from 'react';
import styled from 'styled-components';
import { isMobile } from 'react-device-detect';

import { DescriptionForInput } from '../DescriptionForInput/DescriptionForInput';
import { ErrorMessageForInput } from '../ErrorMessageForInput/ErrorMessageForInput';
import { TimeInputBase, TimeInputBaseProps } from '../TimeInput/TimeInputBase';
import { Time, Range } from 'types';
import { InputClearButton } from '../InputClearButton/InputClearButton';

type OwnProps = {
  forceText?: boolean;
  className?: string;
  id: string;
  name: string;
  value?: Range<Time>;
  // FIXME: type?
  onChange: (fn: (prev: Range<Time>) => Range<Time>) => void;
  // TODO:
  onBlur: (time: Range<Time>) => void;
  onClear?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  description?: string;
  error?: string;
};

export type TimeRangeInputProps = OwnProps & Omit<TimeInputBaseProps, keyof OwnProps>;

// eslint-disable-next-line complexity
export const UnStyledTimeRangeInput = React.memo(function TimeRangeInput({
  className,
  id,
  name,
  forceText = !isMobile,
  value,
  onChange,
  onClear,
  error,
  description,
}: TimeRangeInputProps) {
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

  const showClearButton = !!onClear && (typeof value?.start !== 'undefined' || typeof value?.end !== 'undefined');

  return (
    <div className={className}>
      {/* fix: reRender */}
      {description && <DescriptionForInput description={description} />}
      <div>
        <StyledTimeInputBase
          id={id}
          name={name}
          error={error}
          forceText={forceText}
          value={value?.start}
          onChange={handleOnChangeStart}
          onBlur={handleOnBlurStart}
        />
        <span>~</span>
        <StyledTimeInputBase
          id={`${id}-end`}
          name={`${name}-end`}
          value={value?.end}
          error={error}
          forceText={forceText}
          onChange={handleOnChangeEnd}
          onBlur={handleOnBlurEnd}
        />
        {showClearButton && <InputClearButton onClick={onClear} />}
      </div>
      {error && <ErrorMessageForInput message={error} />}
    </div>
  );
});

const StyledTimeInputBase = styled(TimeInputBase)``;
export const TimeRangeInput = styled(UnStyledTimeRangeInput)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  & > div {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    & > ${StyledTimeInputBase} {
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

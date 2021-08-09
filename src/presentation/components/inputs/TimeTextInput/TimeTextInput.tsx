import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Time } from 'types';
import { stringToTimeString, timeStringToTime, timeToTimeString } from 'utils/timeUtil';
import { InputBase, InputBaseProps } from '../InputBase/InputBase';
import { InputClearButton } from '../InputClearButton/InputClearButton';

type OwnProps = {
  ref?: React.RefObject<HTMLInputElement> | null;
  className?: string;
  id: string;
  name: string;
  value?: Time;
  error?: string;
  placeholder?: string;
  onBlur: (time: Time, event?: React.FocusEvent<HTMLInputElement>) => void;
  onClear?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export type Props = OwnProps & Omit<InputBaseProps, 'children' | 'type' | keyof OwnProps>;

export const UnStyledTimeTextInput = React.memo(function TimeTextInput({
  ref,
  className,
  id,
  name,
  value,
  error,
  placeholder,
  onBlur,
  onClear,
}: Props) {
  const [timeString, setTimeString] = useState(timeToTimeString(value));

  useEffect(() => {
    const currentValue = timeToTimeString(value);
    if (currentValue) {
      setTimeString(currentValue);
    }
  }, [value]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimeString(e.currentTarget.value);
  };

  const handleOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const _timeString = stringToTimeString(e.currentTarget.value);
    const time = timeStringToTime(_timeString);
    setTimeString(_timeString);
    onBlur(time, e);
  };

  const handleOnClear = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setTimeString('00:00');
    if (onClear) {
      onClear(e);
    }
  };

  const showClearIcon = !!timeString && !!onClear;

  return (
    <div className={className}>
      <InputBase
        ref={ref}
        type="text"
        id={id}
        name={name}
        value={timeString}
        onBlur={handleOnBlur}
        onChange={handleOnChange}
        rightIcon={showClearIcon}
        placeholder={placeholder}
        error={error}
      />
      {showClearIcon && <InputClearButton onClick={handleOnClear} />}
    </div>
  );
});
export const TimeTextInput = styled(UnStyledTimeTextInput)`
  width: 100%;
  position: relative;
  & > button {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
  }
`;

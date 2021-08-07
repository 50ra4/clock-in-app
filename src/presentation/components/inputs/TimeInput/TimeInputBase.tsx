import React, { useEffect, useState } from 'react';
import { Time } from 'types';
import { stringToTimeString, timeStringToTime, timeToTimeString } from 'utils/timeUtil';
import { InputBase, InputBaseProps } from '../InputBase/InputBase';
import { InputClearButton } from '../InputClearButton/InputClearButton';

type TimeInputBaseOwnProps = {
  forceText?: boolean;
  ref?: React.RefObject<HTMLInputElement> | null;
  className?: string;
  id: string;
  name: string;
  value?: Time;
  onChange: (time: Time, event?: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (time: Time, event?: React.FocusEvent<HTMLInputElement>) => void;
  onClear: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  error?: string;
  placeholder?: string;
};

export type TimeInputBaseProps = TimeInputBaseOwnProps &
  Omit<InputBaseProps, 'children' | 'type' | keyof TimeInputBaseOwnProps>;

export const TimeInputBase = React.memo(function TimeInputBase({
  className,
  forceText,
  value,
  onBlur,
  onClear,
  onChange,
  ...otherProps
}: TimeInputBaseProps) {
  const [timeString, setTimeString] = useState(timeToTimeString(value));

  useEffect(() => {
    const currentValue = timeToTimeString(value);
    if (currentValue) {
      setTimeString(currentValue);
    }
  }, [value]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (forceText) {
      setTimeString(e.currentTarget.value);
    } else {
      const _timeString = stringToTimeString(e.currentTarget.value);
      const time = timeStringToTime(_timeString);
      onChange(time, e);
    }
  };

  if (forceText) {
    const handleOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      const _timeString = stringToTimeString(e.currentTarget.value);
      const time = timeStringToTime(_timeString);
      setTimeString(_timeString);
      onBlur(time, e);
    };

    const handleOnClear = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      setTimeString('00:00');
      onClear(e);
    };

    return (
      <div className={className}>
        <InputBase
          {...otherProps}
          type="text"
          rightIcon={true}
          value={timeString}
          onBlur={handleOnBlur}
          onChange={handleOnChange}
        />
        {!!timeString && !!onClear && <InputClearButton onClick={handleOnClear} />}
      </div>
    );
  }

  return (
    <div className={className}>
      <InputBase {...otherProps} type="time" value={timeString} onChange={handleOnChange} />
    </div>
  );
});

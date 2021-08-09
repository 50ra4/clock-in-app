import React from 'react';
import styled from 'styled-components';

import { Time } from 'types';
import { stringToTimeString, timeStringToTime, timeToTimeString } from 'utils/timeUtil';
import { InputBase, InputBaseProps } from '../InputBase/InputBase';

type OwnProps = {
  ref?: React.RefObject<HTMLInputElement> | null;
  className?: string;
  id: string;
  name: string;
  value?: Time;
  onChange: (time: Time, event?: React.ChangeEvent<HTMLInputElement>) => void;
  onClear?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  error?: string;
  placeholder?: string;
};
export type TimeInputProps = OwnProps & Omit<InputBaseProps, 'type' | keyof OwnProps>;

export const UnStyledTimeInput = React.memo(function TimeInput({
  ref,
  className,
  value,
  onChange,
  ...otherProps
}: TimeInputProps) {
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const _timeString = stringToTimeString(e.currentTarget.value);
    const time = timeStringToTime(_timeString);
    onChange(time, e);
  };

  const timeString = timeToTimeString(value);

  return (
    <div className={className}>
      <InputBase {...otherProps} type="time" ref={ref} value={timeString} onChange={handleOnChange} />
    </div>
  );
});

export const TimeInput = styled(UnStyledTimeInput)`
  width: 100%;
  position: relative;
  & > button {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
  }
`;

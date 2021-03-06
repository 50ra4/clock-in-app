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
    // FIXME: remove
    // eslint-disable-next-line no-console
    console.log(e.currentTarget.value);
    const time = timeStringToTime(stringToTimeString(e.currentTarget.value));
    onChange(time, e);
  };
  return (
    <div className={className}>
      <InputBase {...otherProps} type="time" ref={ref} value={timeToTimeString(value)} onChange={handleOnChange} />
    </div>
  );
});

export const TimeInput = styled(UnStyledTimeInput)`
  width: 100%;
  position: relative;
  & > input {
    &::-webkit-calendar-picker-indicator {
      /* 
      * for chrome
      * @see https://stackoverflow.com/questions/61934148/hide-the-icon-on-a-html-time-input-field-in-chrome 
      */
      background: none;
      background-color: transparent;
      width: 100%;
      position: absolute;
    }
  }
`;

import { TimeInput } from './TimeInput';
import { createStoryMeta, createStoryTemplate } from 'utils/storybookUtils';
import { useState } from 'react';
import { Time } from 'types';

export default createStoryMeta(TimeInput, {
  title: 'inputs/TimeInput',
});

const Template = createStoryTemplate(TimeInput);

const initialTime: Time = { hour: 1, minute: 59 };

// eslint-disable-next-line @typescript-eslint/no-empty-function
const voidFunction = () => {};

export const Docs = Template;
Docs.args = {
  id: 'docs',
  name: 'docs',
  value: initialTime,
  description: 'please enter phone number.',
  onChange: voidFunction,
  onBlur: voidFunction,
  onClear: voidFunction,
};

export const Error = () => (
  <TimeInput
    id="error"
    name="error"
    value={initialTime}
    error="enter time"
    forceText={false}
    onChange={voidFunction}
    onBlur={voidFunction}
    onClear={voidFunction}
  />
);

/**
 * For native time picker
 */
export const TimeType = () => {
  const [time, setTime] = useState<Time | undefined>(initialTime);
  const handleOnChange = (time: Time) => {
    setTime(time);
  };
  return (
    <TimeInput
      id="text"
      name="text"
      value={time}
      forceText={false}
      onChange={handleOnChange}
      onClear={voidFunction}
      onBlur={voidFunction}
    />
  );
};

/**
 * For Textbox
 */
export const TextType = () => {
  const [time, setTime] = useState<Time>(initialTime);
  const handleOnBlur = (time: Time) => {
    setTime(time);
  };

  const handleOnClear = () => {
    setTime({});
  };

  return (
    <TimeInput
      id="text"
      name="text"
      value={time}
      forceText={true}
      onBlur={handleOnBlur}
      onClear={handleOnClear}
      onChange={voidFunction}
    />
  );
};

import { TimeForm } from './TimeForm';
import { createStoryMeta, createStoryTemplate } from 'utils/storybookUtils';
import { useState } from 'react';
import { Time } from 'types';

export default createStoryMeta(TimeForm, {
  title: 'forms/TimeForm',
});

const Template = createStoryTemplate(TimeForm);

const voidFunction = () => {};

const initialTime: Time = { hour: 10, minute: 10 };

export const Docs = Template;
Docs.args = {
  id: 'docs',
  name: 'docs',
  label: '始業時間',
  value: initialTime,
  description: 'enter the date to book',
  onChange: voidFunction,
  onBlur: voidFunction,
  onClear: voidFunction,
};

/**
 * For native time picker
 */
export const TimeInputType = () => {
  const [time, setTime] = useState<Time | undefined>(initialTime);
  const handleOnChange = (time: Time) => {
    setTime(time);
  };
  return (
    <TimeForm
      id="date"
      name="date"
      value={time}
      label="始業時間"
      type="input"
      error="required"
      required={true}
      inline={true}
      onChange={handleOnChange}
      onClear={voidFunction}
      onBlur={voidFunction}
    />
  );
};

/**
 * Text Type
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
    <TimeForm
      id="select"
      name="select"
      value={time}
      type="text"
      label="始業時間"
      onBlur={handleOnBlur}
      onClear={handleOnClear}
      onChange={voidFunction}
    />
  );
};

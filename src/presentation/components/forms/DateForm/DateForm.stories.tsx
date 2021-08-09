import { DateForm } from './DateForm';
import { createStoryMeta, createStoryTemplate } from 'utils/storybookUtils';
import { useState } from 'react';

export default createStoryMeta(DateForm, {
  title: 'forms/DateForm',
});

const Template = createStoryTemplate(DateForm);

// eslint-disable-next-line @typescript-eslint/no-empty-function
const voidFunction = () => {};

const initialDate = '2021-07-23';
const dateMin = new Date('2021-06-01');
const dateMax = new Date('2021-07-31');

export const Docs = Template;
Docs.args = {
  id: 'docs',
  name: 'docs',
  label: '予約日',
  value: initialDate,
  description: 'enter the date to book',
  min: dateMin,
  max: dateMax,
  onChange: voidFunction,
  onBlur: voidFunction,
  onClear: voidFunction,
};

/**
 * For native time picker
 */
export const DateInputType = () => {
  const [date, setDate] = useState<string>(initialDate);
  const handleOnChange = (d: string) => {
    setDate(d);
  };
  return (
    <DateForm
      id="date"
      name="date"
      value={date}
      label="予約日"
      type="input"
      error="required"
      required={true}
      inline={true}
      min={dateMin}
      max={dateMax}
      onChange={handleOnChange}
      onClear={voidFunction}
      onBlur={voidFunction}
    />
  );
};

/**
 * Select Type
 */
export const SelectType = () => {
  const [date, setDate] = useState<string>(initialDate);
  const handleOnChange = (d: string) => {
    setDate(d);
  };
  return (
    <DateForm
      id="select"
      name="select"
      value={date}
      type="select"
      label="予約日"
      min={dateMin}
      max={dateMax}
      onBlur={voidFunction}
      onClear={voidFunction}
      onChange={handleOnChange}
    />
  );
};

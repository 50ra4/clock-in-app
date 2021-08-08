import { DateInput } from './DateInput';
import { createStoryMeta, createStoryTemplate } from 'utils/storybookUtils';
import { useState } from 'react';

export default createStoryMeta(DateInput, {
  title: 'inputs/DateInput',
});

const Template = createStoryTemplate(DateInput);

// eslint-disable-next-line @typescript-eslint/no-empty-function
const voidFunction = () => {};

const initialDate = '2021-07-23';

export const Docs = Template;
Docs.args = {
  id: 'docs',
  name: 'docs',
  value: initialDate,
  description: 'please enter phone number.',
  onChange: voidFunction,
  onBlur: voidFunction,
  onClear: voidFunction,
};

export const Error = () => (
  <DateInput
    id="error"
    name="error"
    value={initialDate}
    error="enter time"
    onChange={voidFunction}
    onBlur={voidFunction}
    onClear={voidFunction}
  />
);

/**
 * For native time picker
 */
export const DateType = () => {
  const [date, setDate] = useState<string>(initialDate);
  const handleOnChange = (d: string) => {
    setDate(d);
  };
  return (
    <DateInput
      id="date"
      name="date"
      value={date}
      forceSelect={false}
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
    <DateInput
      id="text"
      name="text"
      value={date}
      forceSelect={true}
      onBlur={voidFunction}
      onClear={voidFunction}
      onChange={handleOnChange}
    />
  );
};

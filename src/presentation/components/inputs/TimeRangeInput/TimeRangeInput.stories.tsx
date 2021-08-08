import { TimeRangeInput } from './TimeRangeInput';
import { createStoryMeta, createStoryTemplate } from 'utils/storybookUtils';
import { useState } from 'react';
import { Time, Range } from 'types';

export default createStoryMeta(TimeRangeInput, {
  title: 'inputs/TimeRangeInput',
});

const Template = createStoryTemplate(TimeRangeInput);

const initialTime: Range<Time> = { start: { hour: 1, minute: 59 }, end: { hour: 2, minute: 30 } };

// eslint-disable-next-line @typescript-eslint/no-empty-function
const voidFunction = () => {};

export const Docs = Template;
Docs.args = {
  id: 'docs',
  name: 'docs',
  value: initialTime,
  description: 'please enter rest time.',
  onChange: voidFunction,
  onBlur: voidFunction,
  onClear: voidFunction,
};

export const Error = () => (
  <TimeRangeInput
    id="error"
    name="error"
    value={initialTime}
    error="enter time"
    forceText={false}
    onChange={voidFunction}
    onBlur={voidFunction}
  />
);

/**
 * For native time picker
 */
export const TimeType = () => {
  const [timeRange, setTimeRange] = useState<Range<Time>>(initialTime);
  return (
    <TimeRangeInput
      id="time"
      name="time"
      value={timeRange}
      forceText={false}
      onChange={setTimeRange}
      onBlur={voidFunction}
    />
  );
};

/**
 * For Textbox
 */
export const TextType = () => {
  const [timeRange, setTimeRange] = useState<Range<Time>>(initialTime);
  const handleOnClear = () => {
    setTimeRange({});
  };

  return (
    <TimeRangeInput
      id="text"
      name="text"
      value={timeRange}
      forceText={true}
      onChange={setTimeRange}
      onClear={handleOnClear}
      onBlur={voidFunction}
    />
  );
};

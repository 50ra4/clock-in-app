import { TimeRangeForm } from './TimeRangeForm';
import { createStoryMeta, createStoryTemplate } from 'utils/storybookUtils';
import { useState } from 'react';
import { Time, Range } from 'types';

export default createStoryMeta(TimeRangeForm, {
  title: 'forms/TimeRangeForm',
});

const Template = createStoryTemplate(TimeRangeForm);

const initialTime: Range<Time> = { start: { hour: 1, minute: 59 }, end: { hour: 2, minute: 30 } };

// eslint-disable-next-line @typescript-eslint/no-empty-function
const voidFunction = () => {};

export const Docs = Template;
Docs.args = {
  id: 'docs',
  name: 'docs',
  label: '休憩時間',
  value: initialTime,
  description: 'please enter rest time.',
  onChange: voidFunction,
  onBlur: voidFunction,
  onClear: voidFunction,
};

/**
 * For native time picker
 */
export const TimeType = () => {
  const [timeRange, setTimeRange] = useState<Range<Time>>(initialTime);
  return (
    <TimeRangeForm
      id="time"
      name="time"
      label="休憩時間"
      value={timeRange}
      type="input"
      error="enter time"
      inline={true}
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
    <TimeRangeForm
      id="text"
      name="text"
      label="休憩時間"
      value={timeRange}
      type="text"
      description="please enter rest time"
      onChange={setTimeRange}
      onClear={handleOnClear}
      onBlur={voidFunction}
    />
  );
};

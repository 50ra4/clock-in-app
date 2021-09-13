import { TimeRangeGroupForm } from './TimeRangeGroupForm';
import { createStoryMeta, createStoryTemplate } from 'utils/storybookUtils';
import { useState } from 'react';
import { Time, Range } from 'types';

export default createStoryMeta(TimeRangeGroupForm, {
  title: 'forms/TimeRangeGroupForm',
});

const Template = createStoryTemplate(TimeRangeGroupForm);

// eslint-disable-next-line @typescript-eslint/no-empty-function
const voidFunction = () => {};

const initialTime: Range<Time>[] = [{ start: { hour: 1, minute: 59 }, end: { hour: 2, minute: 30 } }];

export const Docs = Template;
Docs.args = {
  id: 'docs',
  name: 'docs',
  label: '休憩時間',
  value: initialTime,
  description: 'enter rest times',
  onChange: voidFunction,
  onBlur: voidFunction,
  onClear: voidFunction,
};

/**
 * For native time picker
 */
export const TimeInputType = () => {
  const [values, setValues] = useState<Range<Time>[]>([]);

  return (
    <TimeRangeGroupForm
      id="input"
      name="input"
      value={values}
      label="休憩時間"
      type="input"
      error="required"
      required={true}
      inline={true}
      onChange={(v) => {
        setValues(v);
      }}
    />
  );
};

/**
 * Text Type
 */
export const TextType = () => {
  const [values, setValues] = useState<Range<Time>[]>([]);
  return (
    <TimeRangeGroupForm
      id="text"
      name="text"
      value={values}
      type="text"
      label="休憩時間"
      onChange={(v) => {
        setValues(v);
      }}
    />
  );
};

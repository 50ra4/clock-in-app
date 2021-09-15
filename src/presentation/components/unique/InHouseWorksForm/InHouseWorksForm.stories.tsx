import { InHouseWorksForm } from './InHouseWorksForm';
import { createStoryMeta, createStoryTemplate } from 'utils/storybookUtils';
import { useState } from 'react';
import { InHouseWork } from 'types';

export default createStoryMeta(InHouseWorksForm, {
  title: 'unique/InHouseWorksForm',
});

const Template = createStoryTemplate(InHouseWorksForm);

// eslint-disable-next-line @typescript-eslint/no-empty-function
const voidFunction = () => {};

const initialTime: InHouseWork[] = [
  { start: { hour: 1, minute: 59 }, end: { hour: 2, minute: 30 }, remarks: '移動時間' },
];

export const Docs = Template;
Docs.args = {
  id: 'docs',
  name: 'docs',
  label: '社内作業',
  value: initialTime,
  description: 'enter in house work times',
  onChange: voidFunction,
  onBlur: voidFunction,
  onClear: voidFunction,
};

/**
 * For native time picker
 */
export const TimeInputType = () => {
  const [values, setValues] = useState<InHouseWork[]>([]);

  return (
    <InHouseWorksForm
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
  const [values, setValues] = useState<InHouseWork[]>([]);
  return (
    <InHouseWorksForm
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

import { InHouseWorkFormGroup } from './InHouseWorkFormGroup';
import { createStoryMeta, createStoryTemplate } from 'utils/storybookUtils';
import { useState } from 'react';
import { InHouseWork } from 'types';

export default createStoryMeta(InHouseWorkFormGroup, {
  title: 'unique/InHouseWorkFormGroup',
});

const Template = createStoryTemplate(InHouseWorkFormGroup);

const initialValue: InHouseWork[] = [
  { id: '1', start: { hour: 1, minute: 59 }, end: { hour: 2, minute: 30 }, remarks: '移動時間' },
];

export const Docs = Template;
Docs.args = {
  label: '',
  value: initialValue,
  error: 'required',
  onChange: () => {},
  onBlur: () => {},
};

/**
 * For native time picker
 */
export const TimeInputType = () => {
  const [values, setValues] = useState<InHouseWork[]>([]);

  return (
    <InHouseWorkFormGroup
      value={values}
      type="input"
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
    <InHouseWorkFormGroup
      value={values}
      type="text"
      onChange={(v) => {
        setValues(v);
      }}
    />
  );
};

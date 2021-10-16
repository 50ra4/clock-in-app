import { InHouseWorkForm } from './InHouseWorkForm';
import { createStoryMeta, createStoryTemplate } from 'utils/storybookUtils';
import { useState } from 'react';
import { InHouseWork } from 'types';

export default createStoryMeta(InHouseWorkForm, {
  title: 'unique/InHouseWorkForm',
});

const Template = createStoryTemplate(InHouseWorkForm);

const initial: InHouseWork = {
  id: undefined,
  start: { hour: 1, minute: 59 },
  end: { hour: 2, minute: 30 },
  remarks: '移動時間',
};
export const Docs = Template;
Docs.args = {
  id: 'docs',
  name: 'docs',
  label: '社内作業',
  value: initial,
  description: 'enter in house work time',
  onChange: () => {},
  onClear: () => {},
  onBlur: () => {},
};

/**
 * For native time picker
 */
export const TimeInputType = () => {
  const [value, setValue] = useState<InHouseWork>({ ...initial });

  return (
    <InHouseWorkForm
      id="input"
      name="input"
      value={value}
      label="社内作業"
      type="input"
      error="required"
      required={true}
      inline={true}
      onChange={(v) => {
        setValue(v);
      }}
      onClear={() => {}}
    />
  );
};

/**
 * Text Type
 */
export const TextType = () => {
  const [value, setValue] = useState<InHouseWork>({ ...initial });
  return (
    <InHouseWorkForm
      id="text"
      name="text"
      value={value}
      type="text"
      label="社内作業"
      onChange={(v) => {
        setValue(v);
      }}
      onClear={() => {}}
    />
  );
};

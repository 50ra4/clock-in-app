import { RestTimeForm } from './RestTimeForm';
import { createStoryMeta, createStoryTemplate } from 'utils/storybookUtils';
import { useState } from 'react';
import { RestTime } from 'types';

export default createStoryMeta(RestTimeForm, {
  title: 'unique/RestTimeForm',
});

const Template = createStoryTemplate(RestTimeForm);

const initial: RestTime = {
  id: undefined,
  start: { hour: 1, minute: 59 },
  end: { hour: 2, minute: 30 },
};
export const Docs = Template;
Docs.args = {
  id: 'docs',
  name: 'docs',
  label: '休憩時間',
  value: initial,
  description: 'enter rest time',
  onChange: () => {},
  onClear: () => {},
  onBlur: () => {},
};

/**
 * For native time picker
 */
export const TimeInputType = () => {
  const [value, setValue] = useState<RestTime>({ ...initial });

  return (
    <RestTimeForm
      id="input"
      name="input"
      value={value}
      label="休憩時間"
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
  const [value, setValue] = useState<RestTime>({ ...initial });
  return (
    <RestTimeForm
      id="text"
      name="text"
      value={value}
      type="text"
      label="休憩時間"
      alignTrashRight={true}
      onChange={(v) => {
        setValue(v);
      }}
      onClear={() => {}}
    />
  );
};

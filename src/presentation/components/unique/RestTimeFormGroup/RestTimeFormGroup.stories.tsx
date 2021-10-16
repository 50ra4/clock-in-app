import { RestTimeFormGroup } from './RestTimeFormGroup';
import { createStoryMeta, createStoryTemplate } from 'utils/storybookUtils';
import { useState } from 'react';
import { RestTime } from 'types';

export default createStoryMeta(RestTimeFormGroup, {
  title: 'unique/RestTimeFormGroup',
});

const Template = createStoryTemplate(RestTimeFormGroup);

const initialValue: RestTime[] = [{ id: '1', start: { hour: 1, minute: 59 }, end: { hour: 2, minute: 30 } }];

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
  const [values, setValues] = useState<RestTime[]>([]);

  return (
    <RestTimeFormGroup
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
  const [values, setValues] = useState<RestTime[]>([]);

  return (
    <RestTimeFormGroup
      value={values}
      type="text"
      extendInput={true}
      onChange={(v) => {
        setValues(v);
      }}
    />
  );
};

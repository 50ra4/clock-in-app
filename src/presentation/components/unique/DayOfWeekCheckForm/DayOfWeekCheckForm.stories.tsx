import { DayOfWeekCheckForm } from './DayOfWeekCheckForm';
import { createStoryMeta, createStoryTemplate } from 'utils/storybookUtils';
import { useState } from 'react';
import { DayOfWeekCode } from 'types';
import { DAY_OF_WEEK_ENUM } from 'constants/enum';

export default createStoryMeta(DayOfWeekCheckForm, {
  title: 'unique/DayOfWeekCheckForm',
});

const Template = createStoryTemplate(DayOfWeekCheckForm);

export const Docs = Template;
Docs.args = {
  id: 'docs',
  name: 'docs',
  label: '曜日',
  values: [DAY_OF_WEEK_ENUM.friday],
  description: 'select day of week',
  onChange: () => {},
};

export const WithState = () => {
  const [value, setValue] = useState<DayOfWeekCode[]>([]);

  return (
    <DayOfWeekCheckForm
      id="input"
      name="input"
      values={value}
      label="休日"
      error={value.length ? undefined : 'required'}
      required={true}
      onChange={setValue}
    />
  );
};

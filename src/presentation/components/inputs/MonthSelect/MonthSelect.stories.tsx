import { MonthSelect } from './MonthSelect';
import { createStoryMeta, createStoryTemplate } from 'utils/storybookUtils';

export default createStoryMeta(MonthSelect, {
  title: 'inputs/MonthSelect',
});

const Template = createStoryTemplate(MonthSelect);

const range = { start: new Date('2020-01-01'), end: new Date('2021-03-01') };

export const Docs = Template;
Docs.args = {
  id: 'docs',
  name: 'docs',
  selectedMonth: '2021-01',
  range,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange: () => {},
};

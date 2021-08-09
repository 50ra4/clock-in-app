import { DateSelect } from './DateSelect';
import { createStoryMeta, createStoryTemplate } from 'utils/storybookUtils';

export default createStoryMeta(DateSelect, {
  title: 'inputs/DateSelect',
});

const Template = createStoryTemplate(DateSelect);

// eslint-disable-next-line @typescript-eslint/no-empty-function
const voidFunction = () => {};

const initialDate = '2021-07-23';
const dateMin = new Date('2021-07-01');
const dateMax = new Date('2021-07-31');

export const Docs = Template;
Docs.args = {
  id: 'docs',
  name: 'docs',
  value: initialDate,
  onChange: voidFunction,
  onBlur: voidFunction,
  onClear: voidFunction,
  min: dateMin,
  max: dateMax,
};

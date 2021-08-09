import { DateInput } from './DateInput';
import { createStoryMeta, createStoryTemplate } from 'utils/storybookUtils';

export default createStoryMeta(DateInput, {
  title: 'inputs/DateInput',
});

const Template = createStoryTemplate(DateInput);

// eslint-disable-next-line @typescript-eslint/no-empty-function
const voidFunction = () => {};

export const Docs = Template;
Docs.args = {
  id: 'docs',
  name: 'docs',
  value: '2021-07-23',
  min: new Date('2021-07-01'),
  max: new Date('2021-07-31'),
  description: 'please enter phone number.',
  onChange: voidFunction,
  onBlur: voidFunction,
  onClear: voidFunction,
};

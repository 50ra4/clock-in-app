import { TimeInput } from './TimeInput';
import { createStoryMeta, createStoryTemplate } from 'utils/storybookUtils';
import { Time } from 'types';

export default createStoryMeta(TimeInput, {
  title: 'inputs/TimeInput',
});

const Template = createStoryTemplate(TimeInput);

const initialTime: Time = { hour: 1, minute: 59 };

// eslint-disable-next-line @typescript-eslint/no-empty-function
const voidFunction = () => {};

export const Docs = Template;
Docs.args = {
  id: 'docs',
  name: 'docs',
  value: initialTime,
  onChange: voidFunction,
  onClear: voidFunction,
};

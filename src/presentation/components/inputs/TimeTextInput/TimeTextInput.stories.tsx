import { TimeTextInput } from './TimeTextInput';
import { createStoryMeta, createStoryTemplate } from 'utils/storybookUtils';
import { Time } from 'types';

export default createStoryMeta(TimeTextInput, {
  title: 'inputs/TimeTextInput',
});

const Template = createStoryTemplate(TimeTextInput);

const initialTime: Time = { hour: 1, minute: 59 };

// eslint-disable-next-line @typescript-eslint/no-empty-function
const voidFunction = () => {};

export const Docs = Template;
Docs.args = {
  id: 'docs',
  name: 'docs',
  value: initialTime,
  onBlur: voidFunction,
  onClear: voidFunction,
};

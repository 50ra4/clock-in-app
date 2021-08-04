/* eslint-disable @typescript-eslint/no-empty-function */
import { TextInput } from './TextInput';
import { createStoryMeta, createStoryTemplate } from 'utils/storybookUtils';

export default createStoryMeta(TextInput, {
  title: 'inputs/TextInput',
});

const Template = createStoryTemplate(TextInput);

export const Docs = Template;
Docs.args = {
  id: 'docs',
  name: 'docs',
  value: '012012341234',
  description: 'please enter phone number.',
  onChange: () => {},
};

export const Error = () => (
  <TextInput id="error" name="error" value="0120-1234-1234" error="enter without hyphens" onChange={() => {}} />
);

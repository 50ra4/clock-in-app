import { TextInput } from './TextInput';
import { createStoryMeta, createStoryTemplate } from 'utils/storybookUtils';

export default createStoryMeta(TextInput, {
  title: 'inputs/TextInput',
});

const Template = createStoryTemplate(TextInput);

const voidFunction = () => {};

export const Docs = Template;
Docs.args = {
  id: 'docs',
  type: 'tel',
  name: 'docs',
  value: '012012341234',
  description: 'please enter phone number.',
  onChange: voidFunction,
};

export const Error = () => (
  <TextInput
    id="error"
    type="tel"
    name="error"
    value="0120-1234-1234"
    error="enter without hyphens"
    onChange={voidFunction}
  />
);

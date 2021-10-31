import { NumberInput } from './NumberInput';
import { createStoryMeta, createStoryTemplate } from 'utils/storybookUtils';

export default createStoryMeta(NumberInput, {
  title: 'inputs/NumberInput',
});

const Template = createStoryTemplate(NumberInput);

const voidFunction = () => {};

export const Docs = Template;
Docs.args = {
  id: 'docs',
  name: 'docs',
  value: 20,
  description: 'please enter number.',
  onChange: voidFunction,
};

export const Error = () => (
  <NumberInput id="error" name="error" max={60} value={61} error="enter without hyphens" onChange={voidFunction} />
);

/* eslint-disable @typescript-eslint/no-empty-function */
import { SelectInput } from './SelectInput';
import { createStoryMeta, createStoryTemplate } from 'utils/storybookUtils';
import { Lookup } from 'types';

export default createStoryMeta(SelectInput, {
  title: 'inputs/SelectInput',
});

const Template = createStoryTemplate(SelectInput);

const options: Lookup[] = [
  { id: '1', value: 'Strawberry' },
  { id: '2', value: 'Melon' },
  { id: '3', value: 'Grapes' },
  { id: '4', value: 'Cherry' },
];

export const Docs = Template;
Docs.args = {
  id: 'docs',
  name: 'docs',
  value: '012012341234',
  description: 'please enter phone number.',
  options,
  onChange: () => {},
};

export const Error = () => (
  <SelectInput id="error" name="error" value="1" error="enter without hyphens" options={options} />
);

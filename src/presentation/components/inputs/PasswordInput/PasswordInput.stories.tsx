/* eslint-disable @typescript-eslint/no-empty-function */
import { PasswordInput } from './PasswordInput';
import { createStoryMeta, createStoryTemplate } from 'utils/storybookUtils';

export default createStoryMeta(PasswordInput, {
  title: 'inputs/PasswordInput',
});

const Template = createStoryTemplate(PasswordInput);

export const Docs = Template;
Docs.args = {
  id: 'docs',
  name: 'docs',
  value: 'password1234',
  description: 'please enter password.',
  onChange: () => {},
};

export const Error = () => (
  <PasswordInput
    id="error"
    name="error"
    value="password1234"
    description="please enter password."
    error="incorrect password"
    onChange={() => {}}
  />
);

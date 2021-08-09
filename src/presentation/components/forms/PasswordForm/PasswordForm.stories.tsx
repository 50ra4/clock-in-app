/* eslint-disable @typescript-eslint/no-empty-function */
import { PasswordForm } from './PasswordForm';
import { createStoryMeta, createStoryTemplate } from 'utils/storybookUtils';

export default createStoryMeta(PasswordForm, {
  title: 'forms/PasswordForm',
});

const Template = createStoryTemplate(PasswordForm);

export const Docs = Template;
Docs.args = {
  id: 'docs',
  name: 'docs',
  value: 'password1234',
  description: 'please enter password.',
  required: true,
  onChange: () => {},
};

export const Error = () => (
  <PasswordForm
    id="error"
    name="error"
    value="password1234"
    description="please enter password."
    error="incorrect password"
    onChange={() => {}}
  />
);

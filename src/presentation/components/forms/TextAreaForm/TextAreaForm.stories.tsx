import { TextAreaForm } from './TextAreaForm';
import { createStoryMeta, createStoryTemplate } from 'utils/storybookUtils';

export default createStoryMeta(TextAreaForm, {
  title: 'forms/TextAreaForm',
});

const Template = createStoryTemplate(TextAreaForm);

// eslint-disable-next-line @typescript-eslint/no-empty-function
const emptyFunction = () => {};

const text =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

export const Docs = Template;
Docs.args = {
  id: 'docs',
  name: 'docs',
  label: '備考',
  value: text,
  description: 'please enter remarks.',
  required: true,
  inline: true,
  onChange: emptyFunction,
};

export const Error = () => (
  <TextAreaForm
    id="error"
    name="error"
    label="備考"
    row={2}
    value={text}
    description="please enter remarks."
    error="too long"
    onChange={emptyFunction}
  />
);

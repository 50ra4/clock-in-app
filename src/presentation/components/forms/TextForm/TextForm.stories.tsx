import { TextForm } from './TextForm';
import { createStoryMeta, createStoryTemplate } from 'utils/storybookUtils';

export default createStoryMeta(TextForm, {
  title: 'forms/TextForm',
});

const Template = createStoryTemplate(TextForm);

// eslint-disable-next-line @typescript-eslint/no-empty-function
const emptyFunction = () => {};

export const Docs = Template;
Docs.args = {
  id: 'docs',
  name: 'docs',
  label: 'メールアドレス',
  type: 'email',
  value: 'example@example.com',
  description: 'please enter remarks.',
  required: true,
  onChange: emptyFunction,
};

export const Error = () => (
  <TextForm
    id="error"
    name="error"
    label="電話番号"
    type="tel"
    inline={true}
    value="0000-0000-0000-0000"
    description="please enter phone number."
    error="too long"
    onChange={emptyFunction}
  />
);

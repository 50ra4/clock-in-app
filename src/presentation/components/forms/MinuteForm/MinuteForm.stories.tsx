import { MinuteForm } from './MinuteForm';
import { createStoryMeta, createStoryTemplate } from 'utils/storybookUtils';

export default createStoryMeta(MinuteForm, {
  title: 'forms/MinuteForm',
});

const Template = createStoryTemplate(MinuteForm);

const emptyFunction = () => {};

export const Docs = Template;
Docs.args = {
  id: 'docs',
  name: 'docs',
  label: '分',
  value: 22,
  description: 'please enter minutes.',
  required: true,
  onChange: () => {},
};

export const Error = () => (
  <MinuteForm
    id="error"
    name="error"
    label="分"
    inline={true}
    value={99}
    description="please enter minutes."
    error="too long"
    onChange={emptyFunction}
  />
);

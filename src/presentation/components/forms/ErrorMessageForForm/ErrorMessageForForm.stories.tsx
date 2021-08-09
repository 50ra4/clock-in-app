import { createStoryMeta, createStoryTemplate } from 'utils/storybookUtils';
import { ErrorMessageForForm } from './ErrorMessageForForm';

export default createStoryMeta(ErrorMessageForForm, {
  title: 'forms/ErrorMessageForForm',
});

const Template = createStoryTemplate(ErrorMessageForForm);

export const Docs = Template;
Docs.args = {
  message: "Don't enter phone number with hyphens.",
};

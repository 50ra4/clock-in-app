import { createStoryMeta, createStoryTemplate } from 'utils/storybookUtils';
import { ErrorMessageForInput } from './ErrorMessageForInput';

export default createStoryMeta(ErrorMessageForInput, {
  title: 'inputs/ErrorMessageForInput',
});

const Template = createStoryTemplate(ErrorMessageForInput);

export const Docs = Template;
Docs.args = {
  message: "Don't enter phone number with hyphens.",
};

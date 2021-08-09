import { createStoryMeta, createStoryTemplate } from 'utils/storybookUtils';
import { DescriptionForForm } from './DescriptionForForm';

export default createStoryMeta(DescriptionForForm, {
  title: 'forms/DescriptionForForm',
});

const Template = createStoryTemplate(DescriptionForForm);

export const Docs = Template;
Docs.args = {
  description: 'Please enter phone number without hyphens.',
};

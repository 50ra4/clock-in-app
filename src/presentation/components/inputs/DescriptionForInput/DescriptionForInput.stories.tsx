import { createStoryMeta, createStoryTemplate } from 'utils/storybookUtils';
import { DescriptionForInput } from './DescriptionForInput';

export default createStoryMeta(DescriptionForInput, {
  title: 'inputs/DescriptionForInput',
});

const Template = createStoryTemplate(DescriptionForInput);

export const Docs = Template;
Docs.args = {
  description: 'Please enter phone number without hyphens.',
};

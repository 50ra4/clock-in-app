import { createStoryMeta, createStoryTemplate } from 'utils/storybookUtils';
import { InputDeleteButton } from './InputDeleteButton';

export default createStoryMeta(InputDeleteButton, {
  title: 'inputs/InputDeleteButton',
});

const Template = createStoryTemplate(InputDeleteButton);

export const Docs = Template.bind({});
Docs.args = {};

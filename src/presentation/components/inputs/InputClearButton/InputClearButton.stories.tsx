import { createStoryMeta, createStoryTemplate } from 'utils/storybookUtils';
import { InputClearButton } from './InputClearButton';

export default createStoryMeta(InputClearButton, {
  title: 'inputs/InputClearButton',
});

const Template = createStoryTemplate(InputClearButton);

export const Docs = Template.bind({});
Docs.args = {};

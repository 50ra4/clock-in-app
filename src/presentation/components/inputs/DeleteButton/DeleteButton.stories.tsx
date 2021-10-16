import { createStoryMeta, createStoryTemplate } from 'utils/storybookUtils';
import { DeleteButton } from './DeleteButton';

export default createStoryMeta(DeleteButton, {
  title: 'inputs/DeleteButton',
});

const Template = createStoryTemplate(DeleteButton);

export const Docs = Template.bind({});
Docs.args = {};

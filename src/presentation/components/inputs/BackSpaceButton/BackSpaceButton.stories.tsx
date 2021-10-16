import { createStoryMeta, createStoryTemplate } from 'utils/storybookUtils';
import { BackSpaceButton } from './BackSpaceButton';

export default createStoryMeta(BackSpaceButton, {
  title: 'inputs/BackSpaceButton',
});

const Template = createStoryTemplate(BackSpaceButton);

export const Docs = Template.bind({});
Docs.args = {};

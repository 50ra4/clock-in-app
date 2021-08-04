import { createStoryMeta, createStoryTemplate } from 'utils/storybookUtils';
import { CloseIcon } from 'presentation/components/display/Icons/CloseIcon';
import { IconButton } from './IconButton';

export default createStoryMeta(IconButton, {
  title: 'inputs/IconButton',
});

const Template = createStoryTemplate(IconButton);

export const Docs = Template.bind({});
Docs.args = {
  children: <CloseIcon color="primary" />,
};

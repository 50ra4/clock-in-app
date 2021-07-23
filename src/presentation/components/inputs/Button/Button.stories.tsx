import { Button } from './Button';
import { createStoryMeta, createStoryTemplate } from 'utils/storybookUtils';

export default createStoryMeta(Button, {
  title: 'inputs/Button',
});

const Template = createStoryTemplate(Button);

export const Docs = Template.bind({});
Docs.args = {
  fullWidth: false,
  children: 'button sample',
};

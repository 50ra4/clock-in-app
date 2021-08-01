import { Button } from './Button';
import { createStoryMeta, createStoryTemplate } from 'utils/storybookUtils';

export default createStoryMeta(Button, {
  title: 'inputs/Button',
});

const Template = createStoryTemplate(Button);

export const Docs = Template.bind({});
Docs.args = {
  color: 'primary',
  fullWidth: false,
  children: 'button sample',
};

export const FullWidth = () => (
  <Button color="primary" fullWidth={true}>
    full width
  </Button>
);

export const Outline = () => (
  <Button color="primary" variant="outline">
    outline
  </Button>
);

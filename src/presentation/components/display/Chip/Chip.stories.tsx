import { Chip } from './Chip';
import { createStoryMeta, createStoryTemplate } from 'utils/storybookUtils';

export default createStoryMeta(Chip, {
  title: 'display/Chip',
});

const Template = createStoryTemplate(Chip);

export const Docs = Template.bind({});
Docs.args = {
  color: 'primary',
  children: 'docs',
};

export const Secondary = () => <Chip color="secondary">Secondary</Chip>;

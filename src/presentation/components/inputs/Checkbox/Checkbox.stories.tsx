import { Checkbox } from './Checkbox';
import { createStoryMeta, createStoryTemplate } from 'utils/storybookUtils';

export default createStoryMeta(Checkbox, {
  title: 'inputs/Checkbox',
});

const Template = createStoryTemplate(Checkbox);

export const Docs = Template.bind({});
Docs.args = {
  checked: true,
  color: 'secondary',
  id: 'checkbox',
  label: 'Checkbox',
};

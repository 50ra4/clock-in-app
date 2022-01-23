import { Tabs } from './Tabs';
import { createStoryMeta, createStoryTemplate } from 'utils/storybookUtils';

export default createStoryMeta(Tabs, {
  title: 'navigation/Tabs',
});

const Template = createStoryTemplate(Tabs);

export const Docs = Template;
Docs.args = {
  items: [
    { label: 'one', isActive: true },
    { label: 'two', isActive: false },
    { label: 'three', isActive: false },
  ],
};

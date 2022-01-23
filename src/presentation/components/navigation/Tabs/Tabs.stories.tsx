import { Tabs } from './Tabs';
import { createStoryMeta, createStoryTemplate } from 'utils/storybookUtils';

export default createStoryMeta(Tabs, {
  title: 'navigation/Tabs',
});

const Template = createStoryTemplate(Tabs);

export const Docs = Template;
Docs.args = {
  value: 'one',
  items: [{ label: 'one' }, { label: 'two' }, { label: 'three' }],
};

import { Tabs } from './Tabs';
import { createStoryMeta, createStoryTemplate } from 'utils/storybookUtils';

export default createStoryMeta(Tabs, {
  title: 'navigation/Tabs',
});

const Template = createStoryTemplate(Tabs);

const labels = ['one', 'two', 'three'] as const;
const items = labels.map((label) => ({ label, value: label }));

export const Docs = Template;
Docs.args = {
  value: labels[1],
  items: items,
};

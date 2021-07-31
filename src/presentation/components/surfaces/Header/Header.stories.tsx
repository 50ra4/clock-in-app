import { Header } from './Header';
import { createStoryMeta, createStoryTemplate } from 'utils/storybookUtils';

export default createStoryMeta(Header, {
  title: 'surfaces/Header',
});

const Template = createStoryTemplate(Header);

export const Docs = Template;
Docs.args = {};

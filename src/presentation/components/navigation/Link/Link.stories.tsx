import { Link } from './Link';
import { createStoryMeta, createStoryTemplate, withBrowserRouter } from 'utils/storybookUtils';

export default createStoryMeta(Link, {
  title: 'navigation/Link',
  decorators: [withBrowserRouter],
});

const Template = createStoryTemplate(Link);

export const Docs = Template;
Docs.args = {
  to: '/#',
  children: 'Link sample',
};

import { Header } from './Header';
import { createStoryMeta, createStoryTemplate, withBrowserRouter } from 'utils/storybookUtils';
import { Logo } from 'presentation/components/unique/Logo/Logo';

export default createStoryMeta(Header, {
  title: 'surfaces/Header',
  decorators: [withBrowserRouter],
});

const Template = createStoryTemplate(Header);

export const Docs = Template;
Docs.args = {
  title: <Logo />,
};

export const TextHeader = () => <Header title="ログイン" />;

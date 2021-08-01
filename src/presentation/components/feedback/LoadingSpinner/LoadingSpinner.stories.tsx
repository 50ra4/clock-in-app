import { LoadingSpinner } from './LoadingSpinner';
import { createStoryMeta, createStoryTemplate } from 'utils/storybookUtils';

export default createStoryMeta(LoadingSpinner, {
  title: 'feedback/LoadingSpinner',
});

const Template = createStoryTemplate(LoadingSpinner);

export const Docs = Template;
Docs.args = {
  iconSize: 'extraLarge',
};

export const WithMessage = () => <LoadingSpinner message="ローディング中" />;
export const WithChildren = () => <LoadingSpinner message={<p>ローディング中</p>} />;

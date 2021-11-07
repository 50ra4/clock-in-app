import { Card } from './Card';
import { createStoryMeta, createStoryTemplate } from 'utils/storybookUtils';

export default createStoryMeta(Card, {
  title: 'surfaces/Card',
  decorators: [
    (story) => (
      <div
        style={{
          backgroundColor: '#e8eaed',
          padding: '20px',
        }}
      >
        {story()}
      </div>
    ),
  ],
});

const Template = createStoryTemplate(Card);

const text =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

export const Docs = Template;
Docs.args = {
  title: 'Sample card',
  children: <p>{text}</p>,
};

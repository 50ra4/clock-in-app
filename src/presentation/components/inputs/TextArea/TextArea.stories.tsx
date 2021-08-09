/* eslint-disable @typescript-eslint/no-empty-function */
import { TextArea } from './TextArea';
import { createStoryMeta, createStoryTemplate } from 'utils/storybookUtils';

export default createStoryMeta(TextArea, {
  title: 'inputs/TextArea',
});

const Template = createStoryTemplate(TextArea);

export const Docs = Template;
Docs.args = {
  id: 'docs',
  name: 'docs',
  value: '012012341234',
  description: 'please enter phone number.',
  onChange: () => {},
};

export const Error = () => <TextArea id="error" name="error" value="0120-1234-1234" error={true} onChange={() => {}} />;

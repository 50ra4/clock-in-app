import { AdditionalButton } from './AdditionalButton';
import { createStoryMeta, createStoryTemplate } from 'utils/storybookUtils';

export default createStoryMeta(AdditionalButton, {
  title: 'unique/AdditionalButton',
});

const Template = createStoryTemplate(AdditionalButton);

export const Docs = Template;
Docs.args = {
  label: '社内作業を追加',
  onClick: () => {},
};

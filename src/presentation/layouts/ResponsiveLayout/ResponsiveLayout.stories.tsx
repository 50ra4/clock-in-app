import styled from 'styled-components';

import { ResponsiveLayout } from './ResponsiveLayout';
import { createStoryMeta, createStoryTemplate } from 'utils/storybookUtils';

export default createStoryMeta(ResponsiveLayout, {
  title: 'layouts/ResponsiveLayout',
});

const Content = styled.div`
  height: 200px;
  background-color: palegreen;
`;

const Template = createStoryTemplate(ResponsiveLayout);
export const Docs = Template.bind({});
Docs.args = {
  children: <Content>Responsive</Content>,
};

import { Logo } from './Logo';
import { createStoryMeta, createStoryTemplate, withBrowserRouter, StoryMetaDecorator } from 'utils/storybookUtils';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  background-color: #000000;
`;
const WithWrapper: StoryMetaDecorator = (f) => {
  return <StyledWrapper>{f()}</StyledWrapper>;
};

export default createStoryMeta(Logo, {
  title: 'unique/Logo',
  decorators: [withBrowserRouter, WithWrapper],
});

const Template = createStoryTemplate(Logo);

export const Docs = Template;
Docs.args = {
  to: '/',
  children: 'Logo sample',
};

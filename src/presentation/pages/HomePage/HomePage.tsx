import styled from 'styled-components';
import { WithHeaderLayout } from 'presentation/layouts/WithHeaderLayout/WithHeaderLayout';

const HomePage = () => {
  return (
    <WithHeaderLayout>
      <HomePageContents />
    </WithHeaderLayout>
  );
};

const HomePageContents = () => {
  return (
    <StyledRoot>
      <h2>HomePage</h2>
    </StyledRoot>
  );
};

const StyledRoot = styled.div``;

export default HomePage;

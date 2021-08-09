import { Header, headerHeight } from 'presentation/components/surfaces/Header/Header';
import styled from 'styled-components';

const TopPage = () => {
  return (
    <StyledRoot>
      <div className="top-page__header">
        <Header />
      </div>
      <div className="top-page__content">
        <p>TopPage</p>
      </div>
    </StyledRoot>
  );
};

const StyledRoot = styled.div`
  & > div.top-page__header {
    position: fixed;
    width: 100%;
    height: ${headerHeight}px;
  }
  & > div.top-page__content {
    position: fixed;
    width: 100%;
    margin-top: ${headerHeight}px;
    min-height: calc(100vh - ${headerHeight}px);
  }
`;

export default TopPage;

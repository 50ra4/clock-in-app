import styled from 'styled-components';
import { WithHeaderLayout } from 'presentation/layouts/WithHeaderLayout/WithHeaderLayout';

const TimecardDetailPage = () => {
  return (
    <WithHeaderLayout>
      <StyledRoot>
        <h2>TimecardDetailPage</h2>
      </StyledRoot>
    </WithHeaderLayout>
  );
};

const StyledRoot = styled.div``;

export default TimecardDetailPage;

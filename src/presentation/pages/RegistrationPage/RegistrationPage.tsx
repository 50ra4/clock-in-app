import styled from 'styled-components';
import { WithHeaderLayout } from 'presentation/layouts/WithHeaderLayout/WithHeaderLayout';

const RegistrationPage = () => {
  return (
    <WithHeaderLayout>
      <StyledRoot>
        <h2>RegistrationPage</h2>
      </StyledRoot>
    </WithHeaderLayout>
  );
};

const StyledRoot = styled.div``;

export default RegistrationPage;

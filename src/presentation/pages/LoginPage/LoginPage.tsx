import styled from 'styled-components';
import { WithHeaderLayout } from 'presentation/layouts/WithHeaderLayout/WithHeaderLayout';

const LoginPage = () => {
  return (
    <WithHeaderLayout>
      <StyledRoot>
        <h2>LoginPage</h2>
      </StyledRoot>
    </WithHeaderLayout>
  );
};

const StyledRoot = styled.div``;

export default LoginPage;

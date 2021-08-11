import styled from 'styled-components';
import { WithHeaderLayout } from 'presentation/layouts/WithHeaderLayout/WithHeaderLayout';

type Props = {
  error: Error;
};

const ErrorPage = ({ error }: Props) => {
  return (
    <WithHeaderLayout>
      <StyledRoot>
        <h2>ErrorPage</h2>
        <div>
          <p>{error.message}</p>
        </div>
      </StyledRoot>
    </WithHeaderLayout>
  );
};

const StyledRoot = styled.div``;

export default ErrorPage;

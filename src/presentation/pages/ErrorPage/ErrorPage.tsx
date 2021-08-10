import styled from 'styled-components';
import { WithHeader } from 'presentation/layouts/WithHeader';

type Props = {
  error: Error;
};

const ErrorPage = ({ error }: Props) => {
  return (
    <WithHeader>
      <StyledRoot>
        <h2>ErrorPage</h2>
        <div>
          <p>{error.message}</p>
        </div>
      </StyledRoot>
    </WithHeader>
  );
};

const StyledRoot = styled.div``;

export default ErrorPage;

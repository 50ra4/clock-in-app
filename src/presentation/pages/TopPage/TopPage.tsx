import styled from 'styled-components';
import { WithHeader } from 'presentation/layouts/WithHeader';

const text =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

const TopPage = () => {
  return (
    <WithHeader>
      <StyledRoot>
        <h2>TopPage</h2>
        <div>
          <p>{text}</p>
        </div>
      </StyledRoot>
    </WithHeader>
  );
};

const StyledRoot = styled.div``;

export default TopPage;

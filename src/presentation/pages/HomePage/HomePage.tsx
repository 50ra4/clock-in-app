import React from 'react';
import styled from 'styled-components';

import { WithHeaderLayout } from 'presentation/layouts/WithHeaderLayout/WithHeaderLayout';
import { Link } from 'presentation/components/navigation/Link/Link';
import { useAuthentication, useLoginRedirection } from 'hooks/useAuthentication';
import { replacePathParams } from 'utils/pathUtil';
import { PAGE_PATH } from 'constants/path';

const HomePage = () => {
  useLoginRedirection();
  const { loggedInUid: uid } = useAuthentication();

  return (
    <WithHeaderLayout>
      <HomePageContents toTimeCard={replacePathParams(PAGE_PATH.timecardDetail, { uid })} />
    </WithHeaderLayout>
  );
};

const HomePageContents = React.memo(function HomePageContents({ toTimeCard }: { toTimeCard: string }) {
  return (
    <StyledRoot>
      <h2>HomePage</h2>
      <StyledDescription>
        <Link to={toTimeCard}>自分のタイムカードを確認する</Link>
      </StyledDescription>
    </StyledRoot>
  );
});

const StyledRoot = styled.div``;
const StyledDescription = styled.p`
  max-width: 300px;
  border: 1px solid ${({ theme }) => theme.color.border.dark};
  border-radius: 5px;
  padding: 15px 20px;
  margin: ${({ theme }) => theme.space.middle}px;
`;

export default HomePage;

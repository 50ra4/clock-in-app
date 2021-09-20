import styled from 'styled-components';
import { WithHeaderLayout } from 'presentation/layouts/WithHeaderLayout/WithHeaderLayout';
import { PAGE_PATH } from 'constants/path';
import { Link } from 'presentation/components/navigation/Link/Link';
import { ResponsiveLayout } from 'presentation/layouts/ResponsiveLayout/ResponsiveLayout';

const TopPage = () => {
  return (
    <WithHeaderLayout>
      <StyledRoot placement="left">
        <StyledPR>
          <strong>"Clock in"</strong>はブラウザ上で勤怠管理ができるWebアプリケーションです。
        </StyledPR>
        <StyledDescription>
          初めての方は<Link to={PAGE_PATH.registration}>新規アカウント登録</Link>
        </StyledDescription>
        <StyledDescription>
          既にアカウントをお持ちの方は<Link to={PAGE_PATH.login}>ログイン</Link>
        </StyledDescription>
      </StyledRoot>
    </WithHeaderLayout>
  );
};

const StyledRoot = styled(ResponsiveLayout)`
  ${({ theme }) =>
    theme.insetSafeArea.topBottom('min-height', `calc(100vh - ${theme.height.header - theme.space.large * 2}px)`, '-')};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & > div {
  }
`;
const StyledPR = styled.h2`
  font-size: ${({ theme }) => theme.font.size.extraLarge}px;
  color: ${({ theme }) => theme.color.font.black};
  & > strong {
    font-weight: ${({ theme }) => theme.font.weight.bold};
  }
  width: 100%;
  padding: 15px 20px;
  margin: ${({ theme }) => theme.space.middle}px;
`;
const StyledDescription = styled.p`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.color.border.dark};
  border-radius: 5px;
  padding: 15px 20px;
  margin: ${({ theme }) => theme.space.middle}px;
`;

export default TopPage;

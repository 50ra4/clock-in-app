import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { PAGE_PATH } from 'constants/path';
import { Backdrop } from 'presentation/components/feedback/Backdrop/Backdrop';
import { replacePathParams } from 'utils/pathUtil';
import { signOut } from 'services/authentication';

type OwnProps = {
  className?: string;
  open: boolean;
  onClose: () => void;
};

/**
 * @see https://www.w3schools.com/howto/howto_js_sidenav.asp
 */
export const SideNavigation = React.memo(function SideNavigation({ className, open, onClose }: OwnProps) {
  // FIXME:
  const uid = '1111';

  const onClickSignOut = async () => {
    await signOut();
  };

  return (
    <StyledBackdrop className={className} open={open} onClick={onClose}>
      <StyledRoot>
        <nav>
          <ul>
            <li>
              <Link to={PAGE_PATH.top}>Top</Link>
            </li>
            <li>
              <Link to={PAGE_PATH.login}>ログイン</Link>
            </li>
            <li>
              <Link to={PAGE_PATH.registration}>アカウント登録</Link>
            </li>
            <li>
              <Link to={replacePathParams(PAGE_PATH.timecardDetail, { uid })}>自分のタイムカード</Link>
            </li>
            <li>
              <button onClick={onClickSignOut}>ログアウト</button>
            </li>
          </ul>
        </nav>
      </StyledRoot>
    </StyledBackdrop>
  );
});

const StyledBackdrop = styled(Backdrop)`
  align-items: flex-start;
  justify-content: flex-end;
  ${({ theme }) => theme.insetSafeArea.top('top', `${theme.height.header}px`, '+')}
`;

const StyledRoot = styled.div`
  background-color: ${({ theme }) => theme.color.palette.main.background};
  width: 200px;
  height: 100%;
  & > nav {
    & > ul {
      & > li {
        & > a,
        & > button {
          display: inline-block;
          width: 100%;
          background-color: ${({ theme }) => theme.color.palette.main.background};
          text-align: left;
          font-size: ${({ theme }) => theme.font.size.large}px;
          font-weight: ${({ theme }) => theme.font.weight.bold};
          padding: ${({ theme }) => theme.space.large}px;
          padding-left: ${({ theme }) => theme.space.large * 2}px;
          text-decoration: none;
          color: ${({ theme }) => theme.color.font.darkGray};
        }
      }
    }
  }
`;

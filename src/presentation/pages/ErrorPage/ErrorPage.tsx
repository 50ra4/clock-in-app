import styled from 'styled-components';
import { useHistory } from 'react-router';

import { WithHeaderLayout } from 'presentation/layouts/WithHeaderLayout/WithHeaderLayout';
import { ErrorHeadingWithMessage } from 'types';
import { ERROR_HEADING_WITH_MESSAGE } from 'constants/error';
import { headerHeight } from 'presentation/components/surfaces/Header/Header';
import { WarningIcon } from 'presentation/components/display/Icons/WarningIcon';
import { Button } from 'presentation/components/inputs/Button/Button';
import { PAGE_PATH } from 'constants/path';

type Props = ErrorHeadingWithMessage & {
  crashed?: boolean;
};

const ErrorPage = ({ heading, message, crashed }: Props) => {
  const history = useHistory();
  const handleOnClick = () => {
    if (!crashed) {
      history.replace(PAGE_PATH.top);
      return;
    }
    window.location.href = window.location.origin;
  };

  return (
    <WithHeaderLayout>
      <StyledRoot>
        <div>
          <StyledWarningIcon color="secondary" />
          <h2>{heading || ERROR_HEADING_WITH_MESSAGE.UNKNOWN.heading}</h2>
          <p>{message || ERROR_HEADING_WITH_MESSAGE.UNKNOWN.message}</p>
          <Button onClick={handleOnClick} color="secondary">
            Topへ戻る
          </Button>
        </div>
      </StyledRoot>
    </WithHeaderLayout>
  );
};

const StyledWarningIcon = styled(WarningIcon)`
  width: 92px;
`;
const StyledRoot = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ theme }) => theme.insetSafeArea.top('height', `100vh - ${headerHeight + theme.space.large}px`, '+')}
  & > div {
    margin: 0 ${({ theme }) => theme.space.large * 2}px;
    text-align: center;
    & > h2 {
      color: ${({ theme }) => theme.color.palette.main.font};
      font-weight: ${({ theme }) => theme.font.weight.bold};
      font-size: ${({ theme }) => theme.font.size.extraLarge}px;
      margin-bottom: ${({ theme }) => theme.space.large * 2}px;
    }
    & > p {
      margin-bottom: ${({ theme }) => theme.space.large * 2}px;
    }
  }
`;

export default ErrorPage;

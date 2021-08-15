import styled from 'styled-components';
import { WithHeaderLayout } from 'presentation/layouts/WithHeaderLayout/WithHeaderLayout';
import { ErrorHeadingWithMessage } from 'types';
import { ERROR_HEADING_WITH_MESSAGE } from 'constants/error';
import { headerHeight } from 'presentation/components/surfaces/Header/Header';
import { WarningIcon } from 'presentation/components/display/Icons/WarningIcon';

type Props = ErrorHeadingWithMessage;

const ErrorPage = ({ heading, message }: Props) => {
  return (
    <WithHeaderLayout>
      <StyledRoot>
        <div>
          <StyledWarningIcon color="secondary" />
          <h2>{heading || ERROR_HEADING_WITH_MESSAGE.UNKNOWN.heading}</h2>
          <p>{message || ERROR_HEADING_WITH_MESSAGE.UNKNOWN.message}</p>
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
  }
`;

export default ErrorPage;

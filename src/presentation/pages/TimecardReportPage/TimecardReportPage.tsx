import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { useLoginRedirection } from 'hooks/useLoginRedirection';
import { WithHeaderLayout } from 'presentation/layouts/WithHeaderLayout/WithHeaderLayout';
import { getThisMonthDateString, isValidDateString } from 'utils/dateUtil';
import { DATE_FORMAT } from 'constants/dateFormat';
import { useSyncStateWithURLQueryString } from 'hooks/useSyncStateWithURLQueryString';
import { useUserPreference } from 'hooks/useUserPreference';
import { useDailyTimeRecordsOfMonth } from 'hooks/useDailyTimeRecordsOfMonth';
import { useMonthlyOverview } from 'hooks/useMonthlyOverview';
import { LoadingGuard } from 'presentation/components/feedback/LoadingGuard/LoadingGuard';
import { Button } from 'presentation/components/inputs/Button/Button';
import { TextArea } from 'presentation/components/inputs/TextArea/TextArea';

const THIS_MONTH_DATE_STRING = getThisMonthDateString();

const initialQuery = {
  month: THIS_MONTH_DATE_STRING,
};

const stringifyQuery = ({ month }: { month: string }): string => {
  const searchParams = new URLSearchParams();
  searchParams.append('month', month);
  return searchParams.toString();
};

const parseQuery = (queryString: string) => {
  const queryMonth = new URLSearchParams(queryString).get('month');
  const month =
    queryMonth && isValidDateString(queryMonth, DATE_FORMAT.yearMonthISO) ? queryMonth : THIS_MONTH_DATE_STRING;
  return { month };
};

const TimecardReportPage = () => {
  useLoginRedirection();

  const { uid } = useParams<{ uid: string }>();

  const [{ month: selectedMonth }] = useSyncStateWithURLQueryString({
    stringify: stringifyQuery,
    parser: parseQuery,
    initialQuery,
  });

  const { isFetching: isFetchingPreference, userPreference } = useUserPreference(uid);
  const { isLoading, dailyTimeRecordsOfMonth } = useDailyTimeRecordsOfMonth({
    month: selectedMonth,
    uid,
  });
  const { monthlyOverview, copyMonthlyOverviewToClipboard } = useMonthlyOverview({
    month: selectedMonth,
    dailyTimeRecords: dailyTimeRecordsOfMonth,
    preference: userPreference?.timecard,
  });

  return (
    <WithHeaderLayout>
      {isLoading || isFetchingPreference ? (
        <LoadingGuard open={true} />
      ) : (
        <>
          <StyledTextArea id="monthly-overview" name="monthly-overview" value={monthlyOverview} readOnly={true} />
          <ButtonWrapper>
            <StyledButton color="primary" onClick={copyMonthlyOverviewToClipboard} text="コピー" />
          </ButtonWrapper>
        </>
      )}
    </WithHeaderLayout>
  );
};

const StyledTextArea = styled(TextArea)`
  min-height: 300px;
`;
const StyledButton = styled(Button)`
  min-width: 80px;
`;
const ButtonWrapper = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
  & > ${StyledButton} + ${StyledButton} {
    margin-left: 10px;
  }
`;

export default TimecardReportPage;

import React, { useCallback } from 'react';
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
import { TabItem, Tabs } from 'presentation/components/navigation/Tabs/Tabs';

const ReportTypes = ['weeklyReport', 'monthlyReport'] as const;
type ReportType = typeof ReportTypes[number];
const isReportType = (x: string | null): x is ReportType => ReportTypes.some((t) => t === x);

const tabItems: TabItem<ReportType>[] = [
  {
    label: '週報用',
    value: 'weeklyReport',
  },
  {
    label: '作業報告書用',
    value: 'monthlyReport',
  },
];

type SearchQuery = {
  month: string;
  type: ReportType;
};

const THIS_MONTH_DATE_STRING = getThisMonthDateString();

const initialQuery: SearchQuery = {
  month: THIS_MONTH_DATE_STRING,
  type: 'weeklyReport',
};

const stringifyQuery = ({ month, type }: SearchQuery): string => {
  const searchParams = new URLSearchParams();
  searchParams.append('month', month);
  searchParams.append('type', type);
  return searchParams.toString();
};

const parseQuery = (queryString: string) => {
  const params = new URLSearchParams(queryString);
  const queryMonth = params.get('month');
  const month =
    queryMonth && isValidDateString(queryMonth, DATE_FORMAT.yearMonthISO) ? queryMonth : THIS_MONTH_DATE_STRING;

  const queryType = params.get('type');
  const type = isReportType(queryType) ? queryType : 'weeklyReport';
  return { month, type };
};

const TimecardReportPage = () => {
  useLoginRedirection();

  const { uid } = useParams<{ uid: string }>();

  const [{ month: selectedMonth, type: reportType }, setSearchParams] = useSyncStateWithURLQueryString({
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

  const onChangeTab = useCallback(
    (type: ReportType) => setSearchParams((prev) => ({ ...prev, type })),
    [setSearchParams],
  );

  return (
    <WithHeaderLayout>
      <Tabs value={reportType} onChange={onChangeTab} items={tabItems} />
      {isLoading || isFetchingPreference ? (
        <LoadingGuard open={true} />
      ) : (
        <StyledTextArea
          id={reportType}
          name={reportType}
          value={reportType === 'weeklyReport' ? monthlyOverview : 'TBD'}
          readOnly={true}
        />
      )}
      <ButtonWrapper>
        <StyledButton color="primary" onClick={copyMonthlyOverviewToClipboard} text="コピー" />
      </ButtonWrapper>
    </WithHeaderLayout>
  );
};

const StyledTextArea = styled(TextArea)`
  ${({ theme }) =>
    theme.insetSafeArea.topBottom(
      'min-height',
      `100vh - ${
        theme.height.header + theme.space.large + theme.height.tab + theme.space.large * 2 + theme.height.button
      }px`,
      '+',
    )};
`;
const StyledButton = styled(Button)`
  min-width: 80px;
`;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: ${({ theme }) => `${theme.space.large}px 0`};
  & > ${StyledButton} + ${StyledButton} {
    margin-left: ${({ theme }) => theme.space.large}px;
  }
`;
export default TimecardReportPage;

import React, { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { useLoginRedirection } from 'hooks/useLoginRedirection';
import { WithHeaderLayout } from 'presentation/layouts/WithHeaderLayout/WithHeaderLayout';
import { getThisMonthDateString } from 'utils/dateUtil';
import { useUrlQueryString } from 'hooks/useUrlQueryString';
import { useUserPreference } from 'hooks/useUserPreference';
import { useDailyTimeRecordsOfMonth } from 'hooks/useDailyTimeRecordsOfMonth';
import { useMonthlyOverview } from 'hooks/useMonthlyOverview';
import { LoadingGuard } from 'presentation/components/feedback/LoadingGuard/LoadingGuard';
import { Button } from 'presentation/components/inputs/Button/Button';
import { TextArea } from 'presentation/components/inputs/TextArea/TextArea';
import { TabItem, Tabs } from 'presentation/components/navigation/Tabs/Tabs';
import { Head } from 'Head';
import { createURLQueryParser, getGenericsOrElse, getMonthStringOrElse } from 'utils/urlQueryStringUtil';

const ReportTypes = ['weeklyReport', 'monthlyReport'] as const;
type ReportType = typeof ReportTypes[number];
const isReportType = (x: unknown): x is ReportType => ReportTypes.some((t) => t === x);

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

const THIS_MONTH_DATE_STRING = getThisMonthDateString();

const parser = createURLQueryParser({
  month: getMonthStringOrElse('month', () => THIS_MONTH_DATE_STRING),
  type: getGenericsOrElse<ReportType>('type', () => 'weeklyReport', isReportType),
});

const TimecardReportPage = () => {
  useLoginRedirection();

  const { uid } = useParams<{ uid: string }>();

  const [{ month: selectedMonth, type: reportType }, setSearchParams] = useUrlQueryString({
    parser,
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
      <Head title={`${selectedMonth}のレポート`} />
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

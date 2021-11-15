/* eslint-disable complexity */
import React, { useCallback, useState } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';

import { DATE_FORMAT } from 'constants/dateFormat';
import { isValidDateString, getThisMonthDateString, dateStringToDateString } from 'utils/dateUtil';
import { ResponsiveLayout } from 'presentation/layouts/ResponsiveLayout/ResponsiveLayout';
import { useSyncStateWithURLQueryString } from 'hooks/useSyncStateWithURLQueryString';
import { MonthSelector, monthSelectorHeight } from './components/MonthSelector';
import { MonthlyTimeCardTable } from './components/MonthlyTimeCardTable';
import { DailyTimeRecord } from 'types';
import { InputRecordDialog } from './components/InputRecordDialog';
import { useDailyTimeRecordsOfMonth } from 'hooks/useDailyTimeRecordsOfMonth';
import { useAuthentication } from 'hooks/useAuthentication';
import { useUserPreference } from 'hooks/useUserPreference';
import { LoadingGuard } from 'presentation/components/feedback/LoadingGuard/LoadingGuard';
import { LaunchIcon } from 'presentation/components/display/Icons/LaunchIcon';
import { MonthlyOverviewDialog } from './components/MonthlyOverviewDialog';
import { useMonthlyOverview } from 'hooks/useMonthlyOverview';

const THIS_MONTH_DATE_STRING = getThisMonthDateString();

const INITIAL_STATE: DailyTimeRecord = {
  date: '',
  start: undefined,
  end: undefined,
  inHouseWorks: [],
  restTimes: [],
  remarks: '',
};

const initialQuery = {
  month: THIS_MONTH_DATE_STRING,
} as const;

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

export function MobileView() {
  const [{ month: selectedMonth }, setQuery] = useSyncStateWithURLQueryString({
    stringify: stringifyQuery,
    parser: parseQuery,
    initialQuery,
  });
  const { uid } = useParams<{ uid: string }>();

  const { isFetching: isFetchingPreference, userPreference } = useUserPreference(uid);
  const { isLoading, dailyTimeRecordsOfMonth, saveDailyTimeRecord, removeDailyTimeRecord } = useDailyTimeRecordsOfMonth(
    {
      month: selectedMonth,
      uid,
    },
  );
  const { monthlyOverview, copyMonthlyOverviewToClipboard } = useMonthlyOverview({
    month: selectedMonth,
    dailyTimeRecords: dailyTimeRecordsOfMonth,
    preference: userPreference?.timecard,
  });

  const [editedRecord, setEditedRecord] = useState<DailyTimeRecord | undefined>(undefined);
  const [openInputDialog, setOpenInputDialog] = useState<boolean>(false);
  const [openOverviewDialog, setOpenOverviewDialog] = useState<boolean>(false);

  const { loggedInUid } = useAuthentication();
  const isLoggedInUser = loggedInUid === uid;
  const selectedMonthJP = dateStringToDateString(selectedMonth, {
    from: DATE_FORMAT.yearMonthISO,
    to: DATE_FORMAT.yearMonthJP,
  });

  const updateSelectedMonth = useCallback(
    (month: string) => {
      setQuery((prev) => ({ ...prev, month }));
    },
    [setQuery],
  );

  const selectEditedRecord = useCallback(
    (targetDate: string) => {
      const record = dailyTimeRecordsOfMonth.find(({ date }) => date === targetDate) ?? {
        ...INITIAL_STATE,
        date: targetDate,
      };
      setEditedRecord(record);
      setOpenInputDialog(true);
    },
    [dailyTimeRecordsOfMonth],
  );

  const closeInputDialog = useCallback(async () => {
    setOpenInputDialog(false);
  }, []);

  const onDeleteDailyTimeRecord = useCallback(
    async (date: string) => {
      await removeDailyTimeRecord(date);
      setOpenInputDialog(false);
    },
    [removeDailyTimeRecord],
  );

  const onSaveDailyTimeRecord = useCallback(
    async (record: DailyTimeRecord) => {
      if (!isLoggedInUser) {
        return;
      }
      await saveDailyTimeRecord(record);
      setOpenInputDialog(false);
    },
    [isLoggedInUser, saveDailyTimeRecord],
  );

  const onCloseMonthlyOverviewDialog = useCallback(() => setOpenOverviewDialog(false), []);

  return (
    <StyledRoot>
      <LoadingGuard open={isLoading || isFetchingPreference} />
      {!userPreference ? null : (
        <>
          <StyledMonthSelector selectedMonth={selectedMonth} onChangeMonth={updateSelectedMonth} />
          <StyledMonthlyTimeCardTable
            readOnly={!isLoggedInUser}
            month={selectedMonth}
            dailyRecords={dailyTimeRecordsOfMonth}
            preference={userPreference.timecard}
            onSelectDate={selectEditedRecord}
          />
          <FloatingExportButton onClick={() => setOpenOverviewDialog(true)}>
            <LaunchIcon color="main" titleAccess={`${selectedMonthJP}の勤怠の概要を表示する`} />
          </FloatingExportButton>
          <MonthlyOverviewDialog
            open={openOverviewDialog}
            readOnly={true}
            title={`${selectedMonthJP}の勤怠の概要`}
            onClose={onCloseMonthlyOverviewDialog}
            onClickCopy={copyMonthlyOverviewToClipboard}
            overview={monthlyOverview}
          />
          {openInputDialog && editedRecord && (
            <InputRecordDialog
              open={openInputDialog}
              readOnly={!isLoggedInUser}
              onClose={closeInputDialog}
              dailyTimeRecord={editedRecord}
              preference={userPreference.timecard}
              onSaveDailyTimeRecord={onSaveDailyTimeRecord}
              onDeleteDailyTimeRecord={onDeleteDailyTimeRecord}
            />
          )}
        </>
      )}
    </StyledRoot>
  );
}

const StyledRoot = styled(ResponsiveLayout)``;

const StyledMonthSelector = styled(MonthSelector)`
  margin-bottom: ${({ theme }) => theme.space.middle}px;
  position: sticky;
  ${({ theme }) => theme.insetSafeArea.top('top', `${theme.height.header}px`, '+')};
`;
const StyledMonthlyTimeCardTable = styled(MonthlyTimeCardTable)`
  overflow-y: auto;
  ${({ theme }) => theme.scrollBar.hidden()}
  ${({ theme }) =>
    theme.insetSafeArea.topBottom(
      'max-height',
      `100vh - ${theme.height.header + theme.space.large + monthSelectorHeight + theme.space.middle}px`,
      '+',
    )};
`;

const FloatingExportButton = styled.button`
  position: fixed;
  ${({ theme }) => theme.insetSafeArea.bottom('bottom', '24px', '+')};
  right: 24px;
  @media (min-width: ${({ theme }) => theme.breakpoint.small}px) {
    right: calc((100% - 600px) / 2 + 24px);
  }

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 50%;
  background-color: ${({ theme }) => theme.color.palette.primary.background};
  width: 48px;
  height: 48px;
  & > svg {
    width: 24px;
  }
`;

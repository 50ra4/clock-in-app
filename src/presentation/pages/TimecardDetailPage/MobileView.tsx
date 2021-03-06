/* eslint-disable complexity */
import React, { useCallback, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';

import { DATE_FORMAT } from 'constants/dateFormat';
import { getThisMonthDateString, dateStringToDateString } from 'utils/dateUtil';
import { ResponsiveLayout } from 'presentation/layouts/ResponsiveLayout/ResponsiveLayout';
import { MonthSelector, monthSelectorHeight } from './components/MonthSelector';
import { MonthlyTimeCardTable } from './components/MonthlyTimeCardTable';
import { DailyTimeRecord } from 'types';
import { InputRecordDialog } from './components/InputRecordDialog';
import { useDailyTimeRecordsOfMonth } from 'hooks/useDailyTimeRecordsOfMonth';
import { useAuthentication } from 'hooks/useAuthentication';
import { useUserPreference } from 'hooks/useUserPreference';
import { LoadingGuard } from 'presentation/components/feedback/LoadingGuard/LoadingGuard';
import { LaunchIcon } from 'presentation/components/display/Icons/LaunchIcon';
import { replacePathParams } from 'utils/pathUtil';
import { PAGE_PATH } from 'constants/path';
import { Head } from 'Head';
import { useHoliday } from 'hooks/useHoliday';
import { useURLQueryString } from 'hooks/useURLQueryString';
import { createURLQueryParser, getDateStringOrElse } from 'utils/URLQueryStringUtil';

const THIS_MONTH_DATE_STRING = getThisMonthDateString();

const INITIAL_STATE: DailyTimeRecord = {
  date: '',
  start: undefined,
  end: undefined,
  inHouseWorks: [],
  restTimes: [],
  remarks: '',
};

const stringifyQuery = ({ month }: { month: string }): string => {
  const searchParams = new URLSearchParams();
  searchParams.append('month', month);
  return searchParams.toString();
};

const parser = createURLQueryParser({
  month: getDateStringOrElse('month', () => THIS_MONTH_DATE_STRING, DATE_FORMAT.yearMonthISO),
});

export function MobileView() {
  const history = useHistory();
  const [{ month: selectedMonth }, setQuery] = useURLQueryString({
    parser,
  });
  const { uid } = useParams<{ uid: string }>();
  const { holiday } = useHoliday();

  const { isFetching: isFetchingPreference, userPreference } = useUserPreference(uid);
  const { isLoading, dailyTimeRecordsOfMonth, saveDailyTimeRecord, clearDailyTimeRecord } = useDailyTimeRecordsOfMonth({
    month: selectedMonth,
    uid,
  });

  const [editedRecord, setEditedRecord] = useState<DailyTimeRecord | undefined>(undefined);
  const [openInputDialog, setOpenInputDialog] = useState<boolean>(false);

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
      setOpenInputDialog(false);
      await clearDailyTimeRecord(date);
    },
    [clearDailyTimeRecord],
  );

  const onSaveDailyTimeRecord = useCallback(
    async (record: DailyTimeRecord) => {
      if (!isLoggedInUser) {
        return;
      }
      setOpenInputDialog(false);
      await saveDailyTimeRecord(record);
    },
    [isLoggedInUser, saveDailyTimeRecord],
  );

  const onClickExportButton = useCallback(() => {
    const pathname = replacePathParams(PAGE_PATH.timecardReport, { uid });
    history.push(`${pathname}?${stringifyQuery({ month: selectedMonth })}`);
  }, [history, selectedMonth, uid]);

  return (
    <StyledRoot>
      <Head title={`${selectedMonthJP}?????????`} />
      <LoadingGuard open={isLoading || isFetchingPreference} />
      {!userPreference ? null : (
        <>
          <StyledMonthSelector selectedMonth={selectedMonth} onChangeMonth={updateSelectedMonth} />
          <StyledMonthlyTimeCardTable
            readOnly={!isLoggedInUser}
            month={selectedMonth}
            dailyRecords={dailyTimeRecordsOfMonth}
            preference={userPreference.timecard}
            holiday={holiday}
            onSelectDate={selectEditedRecord}
          />
          <FloatingExportButton onClick={onClickExportButton}>
            <LaunchIcon color="main" titleAccess={`${selectedMonthJP}?????????????????????????????????`} />
          </FloatingExportButton>
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

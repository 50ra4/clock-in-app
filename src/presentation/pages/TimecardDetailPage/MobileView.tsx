import React, { useCallback, useState } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import { DATE_FORMAT } from 'constants/dateFormat';
import { isValidDateString, getThisMonthDateString } from 'utils/dateUtil';
import { ResponsiveLayout } from 'presentation/layouts/ResponsiveLayout/ResponsiveLayout';
import { useSyncStateWithURLQueryString } from 'hooks/useSyncStateWithURLQueryString';
import { MonthSelector, monthSelectorHeight } from './components/MonthSelector';
import { MonthlyTimeCardTable } from './components/MonthlyTimeCardTable';
import { DailyTimeRecord } from 'types';
import { InputRecordDialog } from './components/InputRecordDialog';
import { useDailyTimeRecordsOfMonth } from 'hooks/useDailyTimeRecordsOfMonth';
import { useAuthentication } from 'hooks/useAuthentication';

import { AppState } from 'store/root';
import { showConfirmDialog } from 'thunks/connectedDialog';
import { ConnectedDialogActions } from 'store/connectedDialog';

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
  const dispatch = useDispatch<ThunkDispatch<AppState, unknown, ConnectedDialogActions>>();

  const [{ month: selectedMonth }, setQuery] = useSyncStateWithURLQueryString({
    stringify: stringifyQuery,
    parser: parseQuery,
    initialQuery,
  });
  const { uid } = useParams<{ uid: string }>();

  const { dailyTimeRecordsOfMonth, saveDailyTimeRecord } = useDailyTimeRecordsOfMonth({ month: selectedMonth, uid });

  const [editedRecord, setEditedRecord] = useState<DailyTimeRecord | undefined>(undefined);
  const [openInputDialog, setOpenInputDialog] = useState<boolean>(false);

  const { loggedInUid } = useAuthentication();
  const isLoggedInUser = loggedInUid === uid;

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
      const result = await dispatch(
        showConfirmDialog({
          title: '確認',
          message: `${date}の勤怠情報を削除します。よろしいですか？`,
        }),
      );

      if (result !== 'ok') {
        return;
      }

      // TODO: remove
      // eslint-disable-next-line no-console
      console.log('remove record');
    },
    [dispatch],
  );

  const onSaveDailyTimeRecord = useCallback(
    (record: DailyTimeRecord) => {
      if (!isLoggedInUser) {
        return;
      }
      saveDailyTimeRecord(record);
    },
    [isLoggedInUser, saveDailyTimeRecord],
  );

  return (
    <StyledRoot>
      <StyledMonthSelector selectedMonth={selectedMonth} onChangeMonth={updateSelectedMonth} />
      <StyledMonthlyTimeCardTable
        readOnly={!isLoggedInUser}
        month={selectedMonth}
        dailyRecords={dailyTimeRecordsOfMonth}
        selectEditedRecord={selectEditedRecord}
      />
      {openInputDialog && editedRecord && (
        <InputRecordDialog
          open={openInputDialog}
          readOnly={!isLoggedInUser}
          onClose={closeInputDialog}
          dailyTimeRecord={editedRecord}
          onSaveDailyTimeRecord={onSaveDailyTimeRecord}
          onDeleteDailyTimeRecord={onDeleteDailyTimeRecord}
        />
      )}
    </StyledRoot>
  );
}

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

const StyledRoot = styled(ResponsiveLayout)``;

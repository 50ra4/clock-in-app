import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

import { DATE_FORMAT } from 'constants/dateFormat';
import { isValidDateString, getThisMonthDateString } from 'utils/dateUtil';
import { ResponsiveLayout } from 'presentation/layouts/ResponsiveLayout/ResponsiveLayout';
import { useSyncStateWithURLQueryString } from 'hooks/useSyncStateWithURLQueryString';
import { MonthSelector, monthSelectorHeight } from './components/MonthSelector';
import { mockTimeCards } from './mockData';
import { MonthlyTimeCardTable } from './components/MonthlyTimeCardTable';
import { headerHeight } from 'presentation/components/surfaces/Header/Header';
import { DailyTimeRecord, MonthlyTimeCard } from 'types';
import { InputRecordDialog } from './components/InputRecordDialog';

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

export const MobileView = React.memo(function MobileView() {
  const [{ month: selectedMonth }, setQuery] = useSyncStateWithURLQueryString({
    stringify: stringifyQuery,
    parser: parseQuery,
    initialQuery,
  });

  const [editedRecord, setEditedRecord] = useState<DailyTimeRecord | undefined>(undefined);
  const [openInputDialog, setOpenInputDialog] = useState<boolean>(false);
  const [monthlyTimeCard, setMonthlyTimeCard] = useState<MonthlyTimeCard>({
    month: selectedMonth,
    dailyRecords: [],
  });

  useEffect(() => {
    const mockData = mockTimeCards.find(({ month }) => month === selectedMonth) ?? {
      month: selectedMonth,
      dailyRecords: [],
    };
    // eslint-disable-next-line no-console
    console.log(mockTimeCards, mockData);
    setMonthlyTimeCard(mockData);
  }, [selectedMonth]);

  const updateSelectedMonth = useCallback(
    (month: string) => {
      setQuery((prev) => ({ ...prev, month }));
    },
    [setQuery],
  );

  const selectEditedRecord = useCallback(
    (targetDate: string) => {
      const record = monthlyTimeCard.dailyRecords.find(({ date }) => date === targetDate) ?? {
        ...INITIAL_STATE,
        date: targetDate,
      };
      setEditedRecord(record);
      setOpenInputDialog(true);
    },
    [monthlyTimeCard.dailyRecords],
  );

  const closeInputDialog = useCallback(() => {
    setOpenInputDialog(false);
  }, []);

  const onSaveDailyTimeRecord = useCallback((record: DailyTimeRecord) => {
    // FIXME: mock実装
    setMonthlyTimeCard((prev) => {
      const { month, dailyRecords } = prev;
      const hasRecord = dailyRecords.map(({ date }) => date).includes(record.date);
      return hasRecord
        ? { month, dailyRecords: dailyRecords.map((r) => (r.date === record.date ? record : r)) }
        : { month, dailyRecords: [...dailyRecords, record] };
    });
  }, []);

  return (
    <StyledRoot>
      <StyledMonthSelector selectedMonth={selectedMonth} onChangeMonth={updateSelectedMonth} />
      <StyledMonthlyTimeCardTable
        month={monthlyTimeCard.month}
        dailyRecords={monthlyTimeCard.dailyRecords}
        selectEditedRecord={selectEditedRecord}
      />
      {openInputDialog && editedRecord && (
        <InputRecordDialog
          open={openInputDialog}
          onClose={closeInputDialog}
          dailyTimeRecord={editedRecord}
          onSaveDailyTimeRecord={onSaveDailyTimeRecord}
        />
      )}
    </StyledRoot>
  );
});

const StyledMonthSelector = styled(MonthSelector)`
  background-color: #fff;
  padding-top: ${({ theme }) => theme.space.large}px;
  position: sticky;
  ${({ theme }) => theme.insetSafeArea.top('top', `${headerHeight + theme.space.large}px`, '+')};
`;
const StyledMonthlyTimeCardTable = styled(MonthlyTimeCardTable)`
  overflow-y: auto;
  ${({ theme }) => theme.scrollBar.hidden()}
  ${({ theme }) =>
    theme.insetSafeArea.topBottom(
      'max-height',
      `100vh - ${headerHeight + theme.space.large + monthSelectorHeight}px`,
      '+',
    )};
`;

const StyledRoot = styled(ResponsiveLayout)``;

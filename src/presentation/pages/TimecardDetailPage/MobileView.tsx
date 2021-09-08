import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';

import { DATE_FORMAT } from 'constants/dateFormat';
import { isValidDateString, getThisMonthDateString } from 'utils/dateUtil';
import { ResponsiveLayout } from 'presentation/layouts/ResponsiveLayout/ResponsiveLayout';
import { useSyncStateWithURLQueryString } from 'hooks/useSyncStateWithURLQueryString';
import { MonthSelector } from './components/MonthSelector';
import { mockTimeCards } from './mockData';

const THIS_MONTH_DATE_STRING = getThisMonthDateString();

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

  const updateSelectedMonth = useCallback(
    (month: string) => {
      setQuery((prev) => ({ ...prev, month }));
    },
    [setQuery],
  );

  const monthlyTimeCard = useMemo(() => {
    // FIXME: replace data
    const mockData = mockTimeCards.find(({ month }) => month === selectedMonth) ?? {
      month: selectedMonth,
      dailyRecords: [],
    };
    // eslint-disable-next-line no-console
    console.log(mockTimeCards, mockData);
    return mockData;
  }, [selectedMonth]);

  return (
    <StyledRoot>
      <h2>Mobile view</h2>
      <MonthSelector selectedMonth={selectedMonth} onChangeMonth={updateSelectedMonth} />
      {monthlyTimeCard.month}
      {monthlyTimeCard.dailyRecords.map(({ date }) => date).join('\n')}
    </StyledRoot>
  );
});

const StyledRoot = styled(ResponsiveLayout)``;

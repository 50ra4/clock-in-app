import React, { useCallback } from 'react';
import styled from 'styled-components';

import { DATE_FORMAT } from 'constants/dateFormat';
import { isValidDateString, getThisMonthDateString } from 'utils/dateUtil';
import { ResponsiveLayout } from 'presentation/layouts/ResponsiveLayout/ResponsiveLayout';
import { useSyncStateWithURLQueryString } from 'hooks/useSyncStateWithURLQueryString';
import { MonthSelector } from './components/MonthSelector';

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

  return (
    <StyledRoot>
      <h2>Mobile view</h2>
      <MonthSelector selectedMonth={selectedMonth} onChangeMonth={updateSelectedMonth} />
    </StyledRoot>
  );
});

const StyledRoot = styled(ResponsiveLayout)``;

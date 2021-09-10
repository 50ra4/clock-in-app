import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';

import { DATE_FORMAT } from 'constants/dateFormat';
import { isValidDateString, getThisMonthDateString } from 'utils/dateUtil';
import { ResponsiveLayout } from 'presentation/layouts/ResponsiveLayout/ResponsiveLayout';
import { useSyncStateWithURLQueryString } from 'hooks/useSyncStateWithURLQueryString';
import { MonthSelector, monthSelectorHeight } from './components/MonthSelector';
import { mockTimeCards } from './mockData';
import { MonthlyTimeCardTable } from './components/MonthlyTimeCardTable';
import { headerHeight } from 'presentation/components/surfaces/Header/Header';

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
      <StyledMonthSelector selectedMonth={selectedMonth} onChangeMonth={updateSelectedMonth} />
      <StyledMonthlyTimeCardTable month={monthlyTimeCard.month} dailyRecords={monthlyTimeCard.dailyRecords} />
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
  ${({ theme }) =>
    theme.insetSafeArea.topBottom(
      'max-height',
      `100vh - ${headerHeight + theme.space.large + monthSelectorHeight}px`,
      '+',
    )};
`;

const StyledRoot = styled(ResponsiveLayout)``;

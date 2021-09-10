import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import format from 'date-fns/format';
import addDays from 'date-fns/addDays';
import addMonths from 'date-fns/addMonths';
import startOfMonth from 'date-fns/startOfMonth';

import { MonthSelect } from 'presentation/components/inputs/MonthSelect/MonthSelect';
import { Button } from 'presentation/components/inputs/Button/Button';
import { DATE_FORMAT } from 'constants/dateFormat';
import { stringDateToDate, getThisMonthDateString } from 'utils/dateUtil';

const THIS_MONTH_DATE_STRING = getThisMonthDateString();

type Props = {
  className?: string;
  selectedMonth: string;
  onChangeMonth: (month: string) => void;
};

export const MonthSelector = React.memo(function MonthSelect({ className, selectedMonth, onChangeMonth }: Props) {
  const selectableRange = useMemo(() => {
    const startDate = startOfMonth(stringDateToDate(selectedMonth, DATE_FORMAT.yearMonthISO));
    const start = addMonths(startDate, -10);
    const end = addDays(addMonths(startDate, 3), -1);
    return { start, end };
  }, [selectedMonth]);

  const handleOnClickLastMonth = useCallback(() => {
    const lastMonth = format(
      addMonths(stringDateToDate(selectedMonth, DATE_FORMAT.yearMonthISO), -1),
      DATE_FORMAT.yearMonthISO,
    );
    onChangeMonth(lastMonth);
  }, [selectedMonth, onChangeMonth]);

  const handleOnClickThisMonth = useCallback(() => {
    onChangeMonth(THIS_MONTH_DATE_STRING);
  }, [onChangeMonth]);

  const handleOnClickNextMonth = useCallback(() => {
    const nextMonth = format(
      addMonths(stringDateToDate(selectedMonth, DATE_FORMAT.yearMonthISO), 1),
      DATE_FORMAT.yearMonthISO,
    );
    onChangeMonth(nextMonth);
  }, [selectedMonth, onChangeMonth]);

  return (
    <StyledRoot className={className}>
      <StyledMonthButton color="primary" variant="outline" onClick={handleOnClickLastMonth}>
        先月
      </StyledMonthButton>
      <StyledMonthSelect
        id="selectedMonth"
        name="selectedMonth"
        selectedMonth={selectedMonth}
        onChange={onChangeMonth}
        range={selectableRange}
      />
      <StyledMonthButton color="primary" variant="outline" onClick={handleOnClickThisMonth}>
        今月
      </StyledMonthButton>
      <StyledMonthButton color="primary" variant="outline" onClick={handleOnClickNextMonth}>
        来月
      </StyledMonthButton>
    </StyledRoot>
  );
});

export const monthSelectorHeight = 50;
const StyledMonthSelect = styled(MonthSelect)``;
const StyledMonthButton = styled(Button)``;
const StyledRoot = styled.div`
  height: ${monthSelectorHeight}px;
  display: flex;
  padding: ${({ theme }) => theme.space.middle}px;
  font-size: ${({ theme }) => theme.font.size.extraSmall}px;
  & > ${StyledMonthSelect} {
    width: 160px;
  }
  & > ${StyledMonthButton} {
    width: 50px;
    font-size: ${({ theme }) => theme.font.size.extraSmall}px;
  }
`;

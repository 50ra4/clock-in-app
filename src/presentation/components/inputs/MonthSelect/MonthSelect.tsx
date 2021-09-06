import React, { useCallback, useMemo } from 'react';

import format from 'date-fns/format';
import addDays from 'date-fns/addDays';
import addMonths from 'date-fns/addMonths';
import startOfMonth from 'date-fns/startOfMonth';
import eachMonthOfInterval from 'date-fns/eachMonthOfInterval';

import { SelectInput } from 'presentation/components/inputs/SelectInput/SelectInput';
import { DATE_FORMAT } from 'constants/dateFormat';

type MonthSelectProps = {
  className?: string;
  id: string;
  name: string;
  selectedMonth: string;
  onChange: (month: string, e: React.ChangeEvent<HTMLSelectElement>) => void;
  range: { start?: Date; end?: Date };
};

export const MonthSelect = React.memo(function MonthSelect({
  className,
  id,
  name,
  selectedMonth,
  onChange,
  range,
}: MonthSelectProps) {
  const monthOptions = useMemo(() => {
    const startDate = startOfMonth(new Date());
    const start = range?.start ?? addMonths(startDate, -6);
    const end = range?.end ?? addDays(addMonths(startDate, 7), -1);
    const months = eachMonthOfInterval({ start, end });
    return months.map((date) => ({
      id: format(date, DATE_FORMAT.yearMonthISO),
      value: format(date, DATE_FORMAT.yearMonthJP),
    }));
  }, [range]);

  const handleOnChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      onChange(e.currentTarget.value, e);
    },
    [onChange],
  );

  return (
    <SelectInput
      className={className}
      id={id}
      name={name}
      value={selectedMonth}
      options={monthOptions}
      onChange={handleOnChange}
    />
  );
});

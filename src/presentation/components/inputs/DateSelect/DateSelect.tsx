import React, { useMemo, useCallback } from 'react';
import startOfMonth from 'date-fns/startOfMonth';
import addMonths from 'date-fns/addMonths';
import addDays from 'date-fns/addDays';
import eachDayOfInterval from 'date-fns/eachDayOfInterval';
import format from 'date-fns/format';

import { DATE_FORMAT } from 'constants/dateFormat';
import { SelectInput } from '../SelectInput/SelectInput';

export type DateSelectProps = {
  className?: string;
  id: string;
  name: string;
  value?: string;
  error?: string;
  placeholder?: string;
  max?: Date;
  min?: Date;
  onChange: (date: string, event?: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur: (date: string, event?: React.FocusEvent<HTMLInputElement>) => void;
  onClear?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export const DateSelect = React.memo(function DateSelect({
  className,
  value,
  onChange,
  id,
  name,
  error,
  placeholder,
  max,
  min,
}: DateSelectProps) {
  const options = useMemo(() => {
    const start = min ?? addMonths(startOfMonth(new Date()), -1);
    const end = max ?? addDays(addMonths(startOfMonth(new Date()), 2), -1);
    const days = eachDayOfInterval({ start, end });
    return days.map((day) => ({ id: format(day, DATE_FORMAT.dateISO), value: format(day, DATE_FORMAT.date) }));
  }, [max, min]);

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
      error={error}
      placeholder={placeholder}
      options={options}
      value={value}
      onChange={handleOnChange}
    />
  );
});

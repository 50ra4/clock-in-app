import React, { useCallback, useMemo } from 'react';
import startOfMonth from 'date-fns/startOfMonth';
import addMonths from 'date-fns/addMonths';
import addDays from 'date-fns/addDays';
import eachDayOfInterval from 'date-fns/eachDayOfInterval';
import format from 'date-fns/format';

import { InputBase, InputBaseProps } from '../InputBase/InputBase';
import { SelectInput } from '../SelectInput/SelectInput';
import { DATE_FORMAT } from 'constants/dateFormat';

type DateInputOption = {
  start?: Date;
  end?: Date;
};

type OwnProps = {
  forceSelect?: boolean;
  className?: string;
  id: string;
  name: string;
  value?: string;
  onChange: (date: string, event?: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onBlur: (date: string, event?: React.FocusEvent<HTMLInputElement>) => void;
  onClear?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  error?: string;
  description?: string;
  placeholder?: string;
  option?: DateInputOption;
};

type ExcludeProps = 'children' | 'type' | 'ref';
export type DateInputBaseProps = OwnProps & Omit<InputBaseProps, ExcludeProps | keyof OwnProps>;

export const DateSelect = React.memo(function DateSelect({
  className,
  value,
  onChange,
  id,
  name,
  error,
  placeholder,
  option = {},
}: DateInputBaseProps) {
  const options = useMemo(() => {
    const {
      start = addMonths(startOfMonth(new Date()), -1),
      end = addDays(addMonths(startOfMonth(new Date()), 2), -1),
    } = option;
    const days = eachDayOfInterval({ start, end });
    return days.map((day) => ({ id: format(day, DATE_FORMAT.dateISO), value: format(day, DATE_FORMAT.date) }));
  }, [option]);

  const handleOnChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      onChange(e.currentTarget.value, e);
    },
    [onChange],
  );

  // FIXME: Create SelectInputBase(=SelectInput) component
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

export const DateInputBase = React.memo(function DateInputBase({
  className,
  value,
  onChange,
  id,
  name,
  error,
  placeholder,
}: DateInputBaseProps) {
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.currentTarget.value, e);
  };

  return (
    <InputBase
      type="date"
      id={id}
      name={name}
      className={className}
      value={value}
      error={error}
      placeholder={placeholder}
      onChange={handleOnChange}
    />
  );
});

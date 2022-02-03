import format from 'date-fns/format';
import { Action } from '@reduxjs/toolkit';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from 'store/root';
import { loadHoliday } from 'thunks/holiday';
import { DATE_FORMAT } from 'constants/dateFormat';

export const useHoliday = () => {
  const dispatch = useDispatch<ThunkDispatch<AppState, unknown, Action<unknown>>>();
  const { data } = useSelector((state: AppState) => state.holiday);

  useEffect(() => {
    dispatch(loadHoliday()).catch((err) => {
      // eslint-disable-next-line no-console
      console.error('Failed to fetch holiday', err);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isHoliday = useCallback(
    (date: Date) => {
      const dateString = format(date, DATE_FORMAT.dateISO);
      return typeof data?.[dateString] !== 'undefined';
    },
    [data],
  );

  const getHolidayName = useCallback(
    (date: Date, code: 'jp' | 'en' = 'jp') => {
      const dateString = format(date, DATE_FORMAT.dateISO);
      return data?.[dateString]?.[code];
    },
    [data],
  );

  return {
    isFetching: typeof data === 'undefined',
    holiday: data ?? {},
    isHoliday,
    getHolidayName,
  };
};

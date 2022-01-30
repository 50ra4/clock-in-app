import format from 'date-fns/format';
import parse from 'date-fns/parse';
import isValid from 'date-fns/isValid';
import startOfMonth from 'date-fns/startOfMonth';
import endOfMonth from 'date-fns/endOfMonth';
import eachDayOfInterval from 'date-fns/eachDayOfInterval';

import utcToZonedTime from 'date-fns-tz/utcToZonedTime';
import { DateFormat, DATE_FORMAT } from 'constants/dateFormat';

const REFERENCE_DATE = new Date();
export const dateToTimeString = (date: Date): string => format(utcToZonedTime(date, 'Asia/Tokyo'), 'HH:mm');
export const timeStringToDate = (timeString: string, dateString?: string): Date =>
  parse(timeString, 'HH:mm', REFERENCE_DATE);

export const stringDateToDate = (dateString: string, dateFormat: DateFormat): Date =>
  parse(dateString, dateFormat, REFERENCE_DATE);

export const isValidDateString = (dateString: string, dateFormat: DateFormat): boolean =>
  isValid(stringDateToDate(dateString, dateFormat));

export const getThisMonthDateString = () => format(startOfMonth(new Date()), DATE_FORMAT.yearMonthISO);

export const dateStringToDateString = (dateString: string, options: { from: DateFormat; to: DateFormat }): string =>
  format(stringDateToDate(dateString, options.from), options.to);

/**
 * 対象日の月のDateの配列を返却する
 * @param month 対象日
 * @returns 対象日の月の日毎のDateの配列
 */
export const daysOfMonth = (date: Date): Date[] => {
  const start = startOfMonth(date);
  const end = endOfMonth(start);
  return eachDayOfInterval({ start, end });
};

import format from 'date-fns/format';
import addDays from 'date-fns/addDays';
import addMonths from 'date-fns/addMonths';
import startOfMonth from 'date-fns/startOfMonth';
import getDaysInMonth from 'date-fns/getDaysInMonth';
import isThisMonth from 'date-fns/isThisMonth';
import eachMonthOfInterval from 'date-fns/eachMonthOfInterval';

import { getThisMonthDateString, stringDateToDate } from 'utils/dateUtil';
import { DATE_FORMAT } from 'constants/dateFormat';
import { Time, Range, MonthlyTimeCard } from 'types';

const THIS_MONTH_DATE_STRING = getThisMonthDateString();
const startDate = startOfMonth(stringDateToDate(THIS_MONTH_DATE_STRING, DATE_FORMAT.yearMonthISO));
const start = addMonths(startDate, -3);
const end = addDays(addMonths(startDate, 1), -1);

const months = eachMonthOfInterval({ start, end });

const getRandom = (min: number, max: number) => Math.floor(Math.random() * (max + 1 - min)) + min;
const getRandomDays = (date: Date) => getRandom(1, getDaysInMonth(date));
const getRandomTimeRange = (): Range<Time> => {
  const startHour = getRandom(9, 14);
  const start = { hour: startHour, minute: getRandom(0, 59) };
  const endHour = getRandom(startHour + 1, 23);
  const end = Math.random() > 0.1 ? { hour: endHour, minute: getRandom(0, 59) } : undefined;
  return { start, end };
};

export const mockTimeCards: MonthlyTimeCard[] = months.map((monthStart) => {
  const month = format(monthStart, DATE_FORMAT.yearMonthISO);
  const dailyRecords = Array.from({
    length: isThisMonth(monthStart) ? getRandomDays(monthStart) : getDaysInMonth(monthStart),
  }).map((_, i) => {
    const date = addDays(monthStart, i);
    return {
      ...getRandomTimeRange(),
      date: format(date, DATE_FORMAT.dateISO),
      inHouseWorks: [],
      restTimes: [],
    };
  });
  return { month, dailyRecords };
});

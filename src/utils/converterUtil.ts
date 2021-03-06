import ja from 'date-fns/locale/ja';
import format from 'date-fns/format';
import isSunday from 'date-fns/isSunday';
import getWeekOfMonth from 'date-fns/getWeekOfMonth';

import { DailyTimeRecord, DayOfWeekCode, Range, Time } from 'types';
import { DATE_FORMAT } from 'constants/dateFormat';
import { dateStringToDateString, daysOfMonth, stringDateToDate } from './dateUtil';
import { minuteToTimeString, timeRangeToMinute, timeRangeToTimeString, timeToTimeString } from './timeUtil';

export const omitUndefinedProps = <T extends Record<string, unknown>>(obj: T) =>
  Object.fromEntries(Object.entries(obj).filter(([_, value]) => typeof value !== 'undefined')) as T;

export const dailyTimeRecordToRemarks = (
  { remarks, inHouseWorks }: DailyTimeRecord,
  separator: string = '\n',
): string => {
  const inHouseWorkRemarks = inHouseWorks
    .map(({ start, end, remarks }) => {
      const time = [timeToTimeString(start) ?? 'hh:mm', timeToTimeString(end) ?? 'hh:mm'].join('-');
      return [time, remarks].join(' ');
    })
    .join(separator);
  return [inHouseWorkRemarks, remarks].join(separator);
};

const calcMinute = <T extends Range<Time>>(timeRange: T): number => {
  const minute = timeRangeToMinute(timeRange);
  return Number.isNaN(minute) ? 0 : minute;
};

const calcTotalMinute = <T extends Range<Time>>(timeRanges: T[]): number =>
  timeRanges.reduce((acc, cur) => acc + calcMinute(cur), 0);

type TotalTime = {
  workingTime: number;
  restTime: number;
  inHouseWorkingTime: number;
};

const toTotalTime = (dailyTimeRecord: DailyTimeRecord): TotalTime => ({
  workingTime: calcMinute({ start: dailyTimeRecord.start, end: dailyTimeRecord.end }),
  restTime: calcTotalMinute(dailyTimeRecord.restTimes),
  inHouseWorkingTime: calcTotalMinute(dailyTimeRecord.inHouseWorks),
});

const addTotalTime = (a: TotalTime, b: TotalTime): TotalTime =>
  (Object.keys(a) as (keyof TotalTime)[]).reduce(
    (acc, key) => ({
      ...acc,
      [key]: a[key] + b[key],
    }),
    {} as TotalTime,
  );

const INITIAL_WEEK: Readonly<Record<number, TotalTime | undefined>> = Array.from({ length: 5 })
  .map((_, i) => i + 1)
  .reduce((acc, week) => ({ ...acc, [week]: undefined }), {} as Record<number, TotalTime | undefined>);

const toTotalPerWeek = (dailyTimeRecords: DailyTimeRecord[]): Record<number, TotalTime | undefined> =>
  dailyTimeRecords
    .map((dailyTimeRecord) => ({
      ...toTotalTime(dailyTimeRecord),
      week: getWeekOfMonth(stringDateToDate(dailyTimeRecord.date, DATE_FORMAT.dateISO)),
    }))
    .reduce(
      (acc, { week, ...total }) => {
        const previous = acc[week] as TotalTime | undefined;
        if (!previous) {
          return { ...acc, [week]: { ...total } };
        }
        return { ...acc, [week]: addTotalTime(previous, total) };
      },
      { ...INITIAL_WEEK },
    );

const calcOperatingTime = (total: TotalTime | undefined): number => {
  if (!total) {
    return 0;
  }
  const { workingTime, restTime, inHouseWorkingTime } = total;
  return workingTime - restTime - inHouseWorkingTime;
};

/**
 * ?????????????????????????????????????????????
 * @param month ?????????yyyy-MM?????????
 * @param dailyTimeRecords ???????????????
 * @returns ??????????????????
 * @example `???????????????
 * 10????????????160:30h
 * 1??????8:00h
 * 2??????34:00h
 * 3??????39:30h
 * 4??????40:30h
 * 5??????38:30h`
 */
export const toOverviewOfOperatingTimes = (month: string, dailyTimeRecords: DailyTimeRecord[]): string => {
  // FIXME: add roundDownMinute
  const displayedMonth = dateStringToDateString(month, { from: DATE_FORMAT.yearMonthISO, to: DATE_FORMAT.monthJP });
  const totalPerWeek = toTotalPerWeek(dailyTimeRecords);
  const totalWeeks = Object.values(totalPerWeek).map((total) => calcOperatingTime(total));
  const totalMonth = totalWeeks.reduce((acc, cur) => acc + cur, 0);

  return [
    `${displayedMonth}?????????${minuteToTimeString(totalMonth)}h`,
    ...totalWeeks.map((total, i) => `${i + 1}??????${minuteToTimeString(total)}h`),
  ].join('\n');
};

const toWorkingTimesString = ({ start, end }: Range<string> = {}): string =>
  !start || !end ? 'N/A' : [start, end].join('-');

/**
 * ?????????????????????????????????????????????????????????
 * @param params
 * @returns ???????????????????????????
 * @example '?????????10:00-18:30 ???????????? 13:00-14:00???'
 */
export const toOverviewOfTimecardPreference = <T extends Range<Time>>(params: {
  workingTimes?: T;
  lunchBreak?: T;
}): string => {
  const workingTimes = timeRangeToTimeString(params?.workingTimes ?? {});
  const restTime = timeRangeToTimeString(params?.lunchBreak ?? {});

  return [`?????????${toWorkingTimesString(workingTimes)}`, `???????????? ${toWorkingTimesString(restTime)}???`].join(' ');
};

/**
 * ??????????????????????????????????????????
 * @param month ?????????yyyy-MM?????????
 * @param dailyTimeRecords ?????????????????????
 * @returns ????????????
 * @example `
 * 11/01(???) 10:00-20:00
 * 11/02(???) 10:00-19:30
 * 11/03(???) N/A
 * 11/04(???) 10:00-19:00
 * 11/05(???) 10:00-19:00
 * ...
 * `
 */
export const toDetailsOfDailyTimeRecords = (
  month: string,
  dailyTimeRecords: DailyTimeRecord[],
  regularHolidays: DayOfWeekCode[] = [],
): string =>
  daysOfMonth(month)
    .map((day) => {
      const base = {
        day,
        date: format(day, `${DATE_FORMAT.monthDay}(${DATE_FORMAT.dayOfWeek})`, { locale: ja }),
      } as const;
      const timeRecord = dailyTimeRecords.find(({ date }) => date === format(day, DATE_FORMAT.dateISO));

      if (!timeRecord) {
        const isHoliday = regularHolidays.includes(day.getDay() as DayOfWeekCode);
        return {
          ...base,
          workingTimes: isHoliday ? '??????' : 'N/A',
        };
      }

      const workingTimes = timeRangeToTimeString({ start: timeRecord?.start, end: timeRecord?.end });
      return {
        ...base,
        workingTimes: toWorkingTimesString(workingTimes),
      };
    })
    .map(({ day, date, workingTimes }) => `${date} ${workingTimes}${isSunday(day) ? '\n' : ''}`)
    .join('\n');

import getWeekOfMonth from 'date-fns/getWeekOfMonth';

import { DailyTimeRecord, Range, Time } from 'types';
import { DATE_FORMAT } from 'constants/dateFormat';
import { dateStringToDateString, stringDateToDate } from './dateUtil';
import { minuteToTimeString, timeRangeToMinute, timeToTimeString } from './timeUtil';

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
 * 週報用の稼働時間概要を返却する
 * @param month 年月（yyyy-MM形式）
 * @param dailyTimeRecords 月のデータ
 * @returns 稼働時間概要
 * @example `（出力例）
 * 10月総計：160:30h
 * 1週：8:00h
 * 2週：34:00h
 * 3週：39:30h
 * 4週：40:30h
 * 5週：38:30h`
 */
export const toOverviewOfOperatingTimes = (month: string, dailyTimeRecords: DailyTimeRecord[]): string => {
  const displayedMonth = dateStringToDateString(month, { from: DATE_FORMAT.yearMonthISO, to: DATE_FORMAT.monthJP });
  const totalPerWeek = toTotalPerWeek(dailyTimeRecords);
  const totalWeeks = Object.values(totalPerWeek).map((total) => calcOperatingTime(total));
  const totalMonth = totalWeeks.reduce((acc, cur) => acc + cur, 0);

  return [
    `${displayedMonth}総計：${minuteToTimeString(totalMonth)}h`,
    ...totalWeeks.map((total, i) => `${i + 1}週：${minuteToTimeString(total)}h`),
  ].join('\n');
};

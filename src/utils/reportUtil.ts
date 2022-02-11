import getWeekOfMonth from 'date-fns/getWeekOfMonth';
import format from 'date-fns/format';
import ja from 'date-fns/locale/ja';

import { DATE_FORMAT } from 'constants/dateFormat';
import { Time, DailyTimeRecord, DayOfWeekCode, Range } from 'types';
import { daysOfMonth, stringDateToDate } from './dateUtil';
import { timeRangeToMinute, timeRangeToTimeString } from './timeUtil';

const OtherTimeType = {
  inHouseWork: 'inHouseWork',
  restTime: 'restTime',
} as const;

type ReportOtherTime = keyof typeof OtherTimeType;
type Report = {
  date: Date;
  start?: Time;
  end?: Time;
  minute: number;
  otherTimes: {
    type: ReportOtherTime;
    start?: Time;
    end?: Time;
    minute: number;
  }[];
};
/**
 * key: dateString(yyyy-MM-dd)
 */
type MonthlyReport = Map<string, Report>;

type Definition = {
  term: string;
  description: string;
};

type Section = {
  heading?: string;
  content: Section[] | string | undefined;
};

export const createDefinitionList =
  <T>(fn: (v: T) => Definition) =>
  (array: T[]): Definition[] => {
    return [];
  };

export const createSection = (): Section => ({
  heading: '',
  content: '',
});

const toOtherTimes = <T extends Range<Time>>(type: ReportOtherTime, ranges: T[]) =>
  ranges.map(({ start, end }) => ({
    type: type,
    start: start,
    end: end,
    minute: timeRangeToMinute({ start, end }),
  }));

const toReport = ({ date, start, end, inHouseWorks, restTimes }: DailyTimeRecord): Report => ({
  date: stringDateToDate(date, DATE_FORMAT.dateISO),
  start,
  end,
  minute: timeRangeToMinute({ start, end }),
  otherTimes: [
    toOtherTimes(OtherTimeType.inHouseWork, inHouseWorks),
    toOtherTimes(OtherTimeType.restTime, restTimes),
  ].flat(),
});

export const createMonthlyReport = (dailyTimeRecords: DailyTimeRecord[]): MonthlyReport =>
  dailyTimeRecords.reduce((acc, cur) => acc.set(cur.date, toReport(cur)), new Map<string, Report>());

const calcTotalDailyOperatingMinute = (
  report: Report,
  options?: {
    includeTypes: ReportOtherTime[];
  },
): number =>
  report.minute -
  report.otherTimes.reduce((acc, cur) => {
    if (options?.includeTypes?.includes(cur.type)) return acc;
    return acc + cur.minute;
  }, 0);

export const calcTotalMonthlyOperatingMinute = (
  reports: Report[],
  options?: {
    includeTypes: ReportOtherTime[];
  },
): number => reports.reduce((acc, cur) => acc + calcTotalDailyOperatingMinute(cur, options), 0);

const WEEK_CODES = Array.from({ length: 6 }).map((_, i) => i + 1);

export const calcTotalOperatingMinutePerWeek = (
  reports: Report[],
  options?: {
    includeTypes: ReportOtherTime[];
  },
): Map<number, number> =>
  reports.reduce((acc, cur) => {
    const dailyTotal = calcTotalDailyOperatingMinute(cur, options);
    if (dailyTotal < 1 || Number.isNaN(dailyTotal)) return acc;
    const week = getWeekOfMonth(cur.date);
    const previous = acc.get(week) ?? 0;
    return acc.set(week, previous + dailyTotal);
  }, new Map(WEEK_CODES.map((code) => [code, 0])));

const toWorkingTimesString = ({ start, end }: Range<string> = {}): string =>
  !start || !end ? 'N/A' : [start, end].join('-');

export const createDetailsOfMonth = ({
  dateOfMonth,
  monthlyReport,
  regularHolidays,
}: {
  dateOfMonth: Date;
  monthlyReport: MonthlyReport;
  regularHolidays: DayOfWeekCode[];
}) =>
  daysOfMonth(dateOfMonth)
    .map((day) => ({
      date: day,
      dateString: format(day, DATE_FORMAT.dateISO),
      dateStringToDisplay: format(day, `${DATE_FORMAT.monthDay}(${DATE_FORMAT.dayOfWeek})`, { locale: ja }),
      isHoliday: regularHolidays.includes(day.getDay() as DayOfWeekCode),
    }))
    .map(({ date, dateString, isHoliday, dateStringToDisplay }) => {
      const report = monthlyReport.get(dateString);
      const timeString = timeRangeToTimeString({ start: report?.start, end: report?.end });
      const timeRangeToDisplay = !report ? (isHoliday ? '休日' : 'N/D') : toWorkingTimesString(timeString);
      return { date, dateStringToDisplay, isHoliday, timeRangeToDisplay, report };
    });

/**
 * 週報用のデータを計算して返却する
 */
// eslint-disable-next-line complexity
export const createWeeklyReport = (
  data: {
    previous: DailyTimeRecord[];
    current: DailyTimeRecord[];
  },
  options: {
    regularHolidays?: DayOfWeekCode[];
    includes?: ReportOtherTime[];
  },
) => {
  const { previous, current } = data;
  const previousMonthlyReport = createMonthlyReport(previous);
  const previousTotalMinute = calcTotalMonthlyOperatingMinute(Array.from(previousMonthlyReport.values()), {
    includeTypes: options?.includes ?? [],
  });
  const currentMonthlyReport = createMonthlyReport(current);
  const currentTotalMinute = calcTotalMonthlyOperatingMinute(Array.from(currentMonthlyReport.values()), {
    includeTypes: options?.includes ?? [],
  });
  const currentTotalMinutePerWeek = calcTotalOperatingMinutePerWeek(Array.from(previousMonthlyReport.values()), {
    includeTypes: options?.includes ?? [],
  });

  return { previousTotalMinute, currentTotalMinute, currentTotalMinutePerWeek };
};

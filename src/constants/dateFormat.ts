import { EnumValue } from 'types';

export const DATE_FORMAT = {
  yearMonth: 'yyyy/MM',
  yearMonthJP: 'yyyy年MM月',
  yearMonthISO: 'yyyy-MM',
  monthDayJP: 'MM月dd日',
  monthDay: 'MM/dd',
  monthJP: 'MM月',
  hourMinuteJP: 'HH時mm分',
  hourMinuteISO: 'HH:mm',
  date: 'yyyy/MM/dd',
  dateISO: 'yyyy-MM-dd',
  dateJP: 'yyyy年MM月dd日',
  timeISO: 'HH:mm:ss',
  timeJP: 'HH時mm分ss秒',
  dateTimeISO: 'yyyy-MM-dd HH:mm:ss',
  dateTimeJP: 'yyyy年MM月dd日 HH時mm分ss秒',
  timestampISO: 'yyyy-MM-dd HH:mm:ss.SSS',
  ISOString: "yyy-MM-dd'T'HH:mm:ss.sssXXX",
  dayOfWeek: 'EEEEE',
} as const;
export type DateFormat = EnumValue<typeof DATE_FORMAT>;

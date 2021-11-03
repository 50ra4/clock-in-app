import { DailyTimeRecord } from 'types';
import { timeToTimeString } from './timeUtil';

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

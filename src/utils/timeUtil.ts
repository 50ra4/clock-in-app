import { Time, Range, Nullable, NullOrUndefined } from 'types';
import { isNullable } from './typeGuard';

export const isEmptyTime = (time: Nullable<Time>): time is NullOrUndefined =>
  isNullable(time) || (typeof time?.hour === 'undefined' && typeof time?.minute === 'undefined');

export const isNonEmptyTime = (time: Nullable<Time>): time is Required<Time> => !isEmptyTime(time);

export const timeToTimeString = (time: Time = {}): string =>
  isEmptyTime(time) ? '' : [time?.hour ?? 0, time?.minute ?? 0].map((v) => String(v).padStart(2, '0')).join(':');

// FIXME:
// eslint-disable-next-line complexity
export const timeStringToTime = (timeString: string = ''): Time => {
  const [hours, minutes] = timeString.split(':').map((v) => +v);
  const hour = !Number.isNaN(hours) && hours <= 48 ? hours : undefined;
  const minute = !Number.isNaN(minutes) && minutes < 60 ? minutes : undefined;
  return { hour, minute };
};

// FIXME:
// eslint-disable-next-line complexity
export const parseStringToTime = (str: string = ''): Time => {
  const trimmed = str.trim();
  if (!trimmed) {
    return {};
  }
  const numbers = trimmed
    .split('')
    .filter((v) => v !== ':')
    .map((v) => +v);

  if (numbers.some((v) => Number.isNaN(v))) {
    return {};
  }

  const [first, second, third, fourth] = numbers;
  switch (numbers.length) {
    case 1:
      return { hour: first, minute: 0 };
    case 2:
      return { hour: +`${first}${second}`, minute: 0 };
    case 3:
      if (first === 0) {
        return { hour: +`${first}${second}`, minute: third };
      }
      return { hour: first, minute: +`${second}${third}` };
    case 4:
      return { hour: +`${first}${second}`, minute: +`${third}${fourth}` };

    default:
      return {};
  }
};

export const stringToTimeString = (str: string = ''): string => {
  const { hour, minute } = parseStringToTime(str);
  if (!hour) {
    return '';
  }
  if (!minute) {
    return timeToTimeString({ hour, minute: 0 });
  }
  if (minute > 60) {
    const h = Math.floor(minute / 60);
    const m = minute % 60;
    return timeToTimeString({ hour: hour + h, minute: m });
  }
  return timeToTimeString({ hour, minute });
};

export const timeRangeToMinute = <T extends Range<Time>>({ start, end }: T): number => {
  if (!isNonEmptyTime(start) || !isNonEmptyTime(end)) {
    return Number.NaN;
  }
  const hourDiff = end.hour - start.hour + (start.hour > end.hour ? 24 : 0);
  return hourDiff * 60 + end.minute - start.minute;
};

export const minuteToTimeString = (minute: number, round: number = 0): string => {
  const hour = Math.floor(minute / 60);
  const restMinute = minute % 60;
  // const remainder = minute % round;
  // const _minute = Number.isFinite(remainder) ? restMinute - remainder : restMinute;
  return timeToTimeString({ hour, minute: restMinute });
};

export const timeRangeToTimeString = <T extends Range<Time>>({ start, end }: T): Range<string> => ({
  start: start && timeToTimeString(start),
  end: end && timeToTimeString(end),
});

export const isAfterTime = (time: Time, timeToCompare: Time): boolean => {
  if (!isNonEmptyTime(time) || !isNonEmptyTime(timeToCompare)) {
    throw new Error('isAfterTime does not allow non-Required Time parameters');
  }
  return time.hour > timeToCompare.hour || time.minute > timeToCompare.minute;
};
export const isBeforeTime = (time: Time, timeToCompare: Time): boolean => {
  if (!isNonEmptyTime(time) || !isNonEmptyTime(timeToCompare)) {
    throw new Error('isBeforeTime does not allow non-Required Time parameters');
  }
  return time.hour < timeToCompare.hour || time.minute < timeToCompare.minute;
};
export const isEqualTime = (time: Time, timeToCompare: Time): boolean => {
  if (!isNonEmptyTime(time) || !isNonEmptyTime(timeToCompare)) {
    throw new Error('isEqualTime does not allow non-Required Time parameters');
  }
  return time.hour === timeToCompare.hour && time.minute === timeToCompare.minute;
};

export const isAfterTimeRange = (range: Range<Time>, rangeToCompare: Range<Time>): boolean => {
  try {
    return isAfterTime(range.start ?? {}, rangeToCompare.end ?? {});
  } catch (error) {
    throw new Error('isAfterTimeRange does not allow non-Required Time parameters');
  }
};
export const isBeforeTimeRange = (range: Range<Time>, rangeToCompare: Range<Time>): boolean => {
  try {
    return isBeforeTime(range.start ?? {}, rangeToCompare.end ?? {});
  } catch (error) {
    throw new Error('isBeforeTimeRange does not allow non-Required Time parameters');
  }
};
export const isConflictTimeRange = (range: Range<Time>, rangeToCompare: Range<Time>): boolean => {
  try {
    return false;
  } catch (error) {
    throw new Error('isConflictTimeRange does not allow non-Required Time parameters');
  }
};

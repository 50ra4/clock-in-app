import { Time } from 'types';

export const isEmptyTime = (time?: Time) => typeof time?.hour === 'undefined' && typeof time?.minute === 'undefined';

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

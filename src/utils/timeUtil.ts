import { Time } from 'types';

export const timeToTimeString = (time: Time = {}): string =>
  [time?.hour ?? 0, time?.minute ?? 0].map((v) => String(v).padStart(2, '0')).join(':');

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
export const stringToTimeString = (str: string = ''): string => {
  if (!str) {
    return '';
  }
  const [hour, minute] = str.split(':').map((v) => +v);
  if (Number.isNaN(hour)) {
    return '';
  }
  if (Number.isNaN(minute)) {
    return timeToTimeString({ hour, minute: 0 });
  }
  if (minute > 60) {
    const h = Math.floor(minute / 60);
    const m = minute % 60;
    return timeToTimeString({ hour: hour + h, minute: m });
  }
  return timeToTimeString({ hour, minute });
};

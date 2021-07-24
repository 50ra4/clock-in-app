import format from 'date-fns/format';
import parse from 'date-fns/parse';
import utcToZonedTime from 'date-fns-tz/utcToZonedTime';

const REFERENCE_DATE = new Date();
export const dateToTimeString = (date: Date): string => format(utcToZonedTime(date, 'Asia/Tokyo'), 'HH:mm');
export const timeStringToDate = (timeString: string, dateString?: string): Date =>
  parse(timeString, 'HH:mm', REFERENCE_DATE);

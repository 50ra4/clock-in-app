import format from 'date-fns/format';
import parse from 'date-fns/parse';
import isValid from 'date-fns/isValid';

import utcToZonedTime from 'date-fns-tz/utcToZonedTime';
import { DateFormat } from 'constants/dateFormat';

const REFERENCE_DATE = new Date();
export const dateToTimeString = (date: Date): string => format(utcToZonedTime(date, 'Asia/Tokyo'), 'HH:mm');
export const timeStringToDate = (timeString: string, dateString?: string): Date =>
  parse(timeString, 'HH:mm', REFERENCE_DATE);

export const stringDateToDate = (dateString: string, dateFormat: DateFormat): Date =>
  parse(dateString, dateFormat, REFERENCE_DATE);

export const isValidDateString = (dateString: string, dateFormat: DateFormat): boolean =>
  isValid(stringDateToDate(dateString, dateFormat));

import format from 'date-fns/format';
import parse from 'date-fns/parse';
import ja from 'date-fns/locale/ja';

const REFERENCE_DATE = new Date();
export const dateToTimeString = (date: Date): string => format(date, 'HH:mm', { locale: ja });
export const timeStringToDate = (timeString: string, dateString?: string): Date =>
  parse(timeString, 'HH:mm', REFERENCE_DATE);

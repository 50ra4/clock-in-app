/* eslint-disable complexity */
import { VALIDATION_ERROR_MESSAGE } from 'constants/error';
import isValid from 'date-fns/isValid';
import { Time, Range, RestTime, InHouseWork, Nullable, NullOrUndefined } from 'types';
import { stringDateToDate } from 'utils/dateUtil';
import { isNonNullable, isNullable } from 'utils/typeGuard';
import { ValidatorFactory } from '../validationUtil';

export const hourValidatorFactory = new ValidatorFactory<number | undefined>('hour', '時刻')
  .skip((hour, { required }) => !required && typeof hour !== 'number')
  .add(
    (hour) => isNonNullable(hour),
    () => VALIDATION_ERROR_MESSAGE.hourIsEmpty,
  )
  .add(
    (hour) => isNonNullable(hour) && 0 <= hour && hour < 24,
    () => VALIDATION_ERROR_MESSAGE.hourIsOutOfRange,
  );

export const minuteValidatorFactory = new ValidatorFactory<number | undefined>('minute', '分')
  .skip((minute, { required }) => !required && typeof minute !== 'number')
  .add(
    (minute) => isNonNullable(minute),
    () => VALIDATION_ERROR_MESSAGE.minuteIsEmpty,
  )
  .add(
    (minute) => isNonNullable(minute) && 0 <= minute && minute < 60,
    () => VALIDATION_ERROR_MESSAGE.minuteIsOutOfRange,
  );

const isEmptyTime = (time: Nullable<Time>): time is NullOrUndefined =>
  isNullable(time) || (typeof time?.hour === 'undefined' && typeof time?.minute === 'undefined');

export const timeValidatorFactory = new ValidatorFactory<Time | undefined>('time', '時間')
  .skip((time, { required }) => !required && isEmptyTime(time))
  .add(
    (time) => !isEmptyTime(time),
    () => VALIDATION_ERROR_MESSAGE.timeIsEmpty,
  )
  .add(({ hour } = {}, option) => hourValidatorFactory.validate(hour, option))
  .add(({ minute } = {}, option) => minuteValidatorFactory.validate(minute, option));

const isEmptyTimeRange = (timeRange: Nullable<Range<Time>>): timeRange is NullOrUndefined =>
  isNullable(timeRange) || (isEmptyTime(timeRange?.start) && isEmptyTime(timeRange?.end));

export const timeRangeValidatorFactory = new ValidatorFactory<Range<Time> | undefined>('timeRange', '時間帯')
  .skip((timeRange, { required }) => !required && isEmptyTimeRange(timeRange))
  .add(
    (timeRange) => !isEmptyTimeRange(timeRange),
    () => VALIDATION_ERROR_MESSAGE.timeRangeIsEmpty,
  )
  .add(({ start } = {}, option) => timeValidatorFactory.validate(start, option))
  .add(({ end } = {}, option) => timeValidatorFactory.validate(end, option));

export const restTimeValidatorFactory = new ValidatorFactory<RestTime>('RestTime', '休憩時間').add(
  ({ id, ...timeRange } = { id: undefined }, option) => timeRangeValidatorFactory.validate(timeRange, option),
);

const isEmptyString = (value: Nullable<string>): boolean => isNullable(value) || value.length < 1;

export const inHouseWorkValidatorFactory = new ValidatorFactory<InHouseWork>('InHouseWork', '社内作業')
  .add(({ id, ...timeRange } = { id: undefined }, option) => timeRangeValidatorFactory.validate(timeRange, option))
  // TODO: remarks validator factory
  .add(
    ({ remarks } = { id: undefined }, { required }) => !!required && isEmptyString(remarks),
    () => VALIDATION_ERROR_MESSAGE.remarksIsEmpty,
  )
  .add(
    ({ remarks } = { id: undefined }, { required }) => !required || (isNonNullable(remarks) && remarks.length > 50),
    () => VALIDATION_ERROR_MESSAGE.over50Length,
  );

// export const isInvalidRemarksInDailyTimeRecord: Validator<string> = (option) => (remarks) => {
//   if (typeof remarks !== 'string') {
//     if (!option?.required) {
//       return false;
//     }
//     return new ValidationError(remarks, VALIDATION_ERROR_MESSAGE.remarksIsEmpty);
//   }

//   if (100 < remarks.length) {
//     return new ValidationError(remarks, VALIDATION_ERROR_MESSAGE.over100Length);
//   }

//   return false;
// };

const isValidDateStringFormat = (str: string): boolean =>
  !!str.match(/\d{4}-\d{2}-\d{2}/) && isValid(stringDateToDate(str, 'yyyy-MM-dd'));

export const dateStringValidatorFactory = new ValidatorFactory<string>('Date', '日付')
  .skip((value, { required }) => !required && isEmptyString(value))
  .add(
    (value) => !isEmptyString(value),
    () => VALIDATION_ERROR_MESSAGE.dateIsEmpty,
  )
  .add(
    (value) => isNonNullable(value) && isValidDateStringFormat(value),
    () => VALIDATION_ERROR_MESSAGE.dateFormatIsInvalid,
  );

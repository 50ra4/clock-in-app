/* eslint-disable complexity */
import { VALIDATION_ERROR_MESSAGE } from 'constants/error';
import isValid from 'date-fns/isValid';
import { Time, Range, RestTime, InHouseWork, DailyTimeRecord } from 'types';
import { stringDateToDate } from 'utils/dateUtil';
import { ValidationError, Validator } from '../validationUtil';

export const isInvalidHour: Validator<number> =
  ({ required }) =>
  (hour) => {
    if (typeof hour !== 'number') {
      if (!required) {
        return false;
      }
      return new ValidationError(hour, VALIDATION_ERROR_MESSAGE.hourIsEmpty);
    }
    if (hour < 0 || 23 < hour) {
      return new ValidationError(hour, VALIDATION_ERROR_MESSAGE.hourIsOutOfRange);
    }
    return false;
  };

export const isInvalidMinute: Validator<number> =
  ({ required }) =>
  (minute) => {
    if (typeof minute !== 'number') {
      if (!required) {
        return false;
      }
      return new ValidationError(minute, VALIDATION_ERROR_MESSAGE.minuteIsEmpty);
    }
    if (minute < 0 || 59 < minute) {
      return new ValidationError(minute, VALIDATION_ERROR_MESSAGE.minuteIsOutOfRange);
    }
    return false;
  };

export const isInvalidTime: Validator<Time> =
  ({ required }) =>
  ({ hour, minute } = {}) => {
    if (typeof hour === 'undefined' && typeof minute === 'undefined') {
      if (!required) {
        return false;
      }

      return new ValidationError({ hour, minute }, VALIDATION_ERROR_MESSAGE.timeIsEmpty);
    }
    const invalidHourMessage = isInvalidHour({ required })(hour);
    if (invalidHourMessage) {
      return invalidHourMessage;
    }
    const invalidMinuteMessage = isInvalidMinute({ required })(minute);
    if (invalidMinuteMessage) {
      return invalidMinuteMessage;
    }
    return false;
  };

export const isInvalidTimeRange: Validator<Range<Time>> =
  ({ required }) =>
  ({ start, end } = {}) => {
    if (typeof start === 'undefined' && typeof end === 'undefined') {
      if (!required) {
        return false;
      }
      return new ValidationError({ start, end }, VALIDATION_ERROR_MESSAGE.timeRangeIsEmpty);
    }
    const startMessage = isInvalidTime({ required })(start);
    if (startMessage) {
      return startMessage;
    }
    const endMessage = isInvalidTime({ required })(end);
    if (endMessage) {
      return endMessage;
    }
    return false;
  };

export const isInvalidRestTime: Validator<RestTime> =
  ({ required }) =>
  ({ start, end } = { id: undefined }) => {
    const invalidTimeRangeMessage = isInvalidTimeRange({ required })({ start, end });
    if (invalidTimeRangeMessage) {
      return invalidTimeRangeMessage;
    }
    return false;
  };

export const isInvalidRemarksInInHouseWork: Validator<string> =
  ({ required }) =>
  (remarks) => {
    if (typeof remarks !== 'string') {
      if (!required) {
        return false;
      }
      return new ValidationError(remarks, VALIDATION_ERROR_MESSAGE.remarksIsEmpty);
    }

    if (50 < remarks.length) {
      return new ValidationError(remarks, VALIDATION_ERROR_MESSAGE.over50Length);
    }

    return false;
  };

export const isInvalidInHouseWork: Validator<InHouseWork> =
  ({ required }) =>
  ({ start, end, remarks } = { id: undefined }) => {
    const invalidTimeRangeMessage = isInvalidTimeRange({ required })({ start, end });
    if (invalidTimeRangeMessage) {
      return invalidTimeRangeMessage;
    }
    const invalidRemarksInInHouseWorkMessage = isInvalidRemarksInInHouseWork({ required })(remarks);
    if (invalidRemarksInInHouseWorkMessage) {
      return invalidRemarksInInHouseWorkMessage;
    }
    return false;
  };

export const isInvalidRemarksInDailyTimeRecord: Validator<string> =
  ({ required }) =>
  (remarks) => {
    if (typeof remarks !== 'string') {
      if (!required) {
        return false;
      }
      return new ValidationError(remarks, VALIDATION_ERROR_MESSAGE.remarksIsEmpty);
    }

    if (100 < remarks.length) {
      return new ValidationError(remarks, VALIDATION_ERROR_MESSAGE.over100Length);
    }

    return false;
  };

const isValidDateStringFormat = (str: string): boolean =>
  !!str.match(/\d{4}-\d{2}-\d{2}/) && isValid(stringDateToDate(str, 'yyyy-MM-dd'));

export const isInvalidDateString: Validator<string> =
  ({ required }) =>
  (date) => {
    if (typeof date !== 'string') {
      if (!required) {
        return false;
      }
      return new ValidationError(date, VALIDATION_ERROR_MESSAGE.dateIsEmpty);
    }
    if (!isValidDateStringFormat(date)) {
      return new ValidationError(date, VALIDATION_ERROR_MESSAGE.dateFormatIsInvalid);
    }
    return false;
  };

export const isInvalidDailyTimeRecord: Validator<DailyTimeRecord> =
  (option) =>
  (
    { date, start, end, inHouseWorks, restTimes, remarks } = {
      date: '',
      inHouseWorks: [],
      restTimes: [],
      remarks: '',
    },
  ) => {
    const invalidDateInDailyTimeRecordMessage = isInvalidDateString({ required: true })(date);
    if (invalidDateInDailyTimeRecordMessage) {
      return invalidDateInDailyTimeRecordMessage;
    }
    const invalidTimeRangeMessage = isInvalidTimeRange(option)({ start, end });
    if (invalidTimeRangeMessage) {
      return invalidTimeRangeMessage;
    }
    const invalidRemarksInDailyTimeRecordMessage = isInvalidRemarksInDailyTimeRecord({ required: false })(remarks);
    if (invalidRemarksInDailyTimeRecordMessage) {
      return invalidRemarksInDailyTimeRecordMessage;
    }
    const invalidInHouseWorksMessage = inHouseWorks
      .map((inHouseWork) => isInvalidInHouseWork({ required: true })(inHouseWork))
      .find((v) => !!v);
    if (invalidInHouseWorksMessage) {
      return invalidInHouseWorksMessage;
    }
    const invalidRestTimesMessage = restTimes
      .map((inHouseWork) => isInvalidRestTime({ required: true })(inHouseWork))
      .find((v) => !!v);
    if (invalidRestTimesMessage) {
      return invalidRestTimesMessage;
    }
    return false;
  };

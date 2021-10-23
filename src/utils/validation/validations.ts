import { VALIDATION_ERROR_MESSAGE } from 'constants/error';
import { Time, Range, RestTime, InHouseWork, DailyTimeRecord } from 'types';
import { ValidationError, Validator } from '../validationUtil';

export const isInvalidHour: Validator<number> =
  ({ required }) =>
  // eslint-disable-next-line complexity
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
    // TODO: numberでない
    // TODO: 0から59までのnumberでない
    return false;
  };

export const isInvalidTime: Validator<Time> =
  ({ required }) =>
  (time) => {
    // TODO: 必須入力か
    const invalidHourMessage = isInvalidHour({ required })(time?.hour);
    if (invalidHourMessage) {
      return invalidHourMessage;
    }
    // TODO: minuteが不正
    return false;
  };

export const isInvalidTimeRange: Validator<Range<Time>> =
  ({ required }) =>
  ({ start, end } = {}) => {
    // TODO: 必須入力か
    // TODO: startが不正
    // TODO: endが不正
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
    // TODO: stringでない
    // TODO: 50文字以内でない
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
    // TODO: stringでない
    // TODO: 100文字以内でない
    return false;
  };

export const isInvalidDateInDailyTimeRecord: Validator<string> =
  ({ required }) =>
  (date) => {
    // TODO: stringでない
    // TODO: 日付のフォーマットでない
    return false;
  };

export const isInvalidDailyTimeRecord: Validator<DailyTimeRecord> =
  (option) =>
  // eslint-disable-next-line complexity
  (
    { date, start, end, inHouseWorks, restTimes, remarks } = {
      date: '',
      inHouseWorks: [],
      restTimes: [],
      remarks: '',
    },
  ) => {
    const invalidDateInDailyTimeRecordMessage = isInvalidDateInDailyTimeRecord({ required: true })(date);
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

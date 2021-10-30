import { VALIDATION_ERROR_MESSAGE } from 'constants/error';
import { replaceMessage } from 'utils/messageUtil';
import { createTestString } from 'utils/testUtil';
import { toMessage, ValidatorFactory, ValidatorOption } from 'utils/validationUtil';
import * as validator from './validations';

const toInvalidMessage =
  <I, O extends ValidatorOption>(factory: ValidatorFactory<I, O>, option: O) =>
  (value: I) =>
    toMessage(factory.validate(value, option));

describe('validations', () => {
  describe('hourValidatorFactory', () => {
    const { hourValidatorFactory } = validator;
    describe('option is required', () => {
      const testFn = toInvalidMessage(hourValidatorFactory, { required: true });
      it(`should return "${VALIDATION_ERROR_MESSAGE.hourIsEmpty}"`, () => {
        expect(testFn(undefined)).toBe(VALIDATION_ERROR_MESSAGE.hourIsEmpty);
      });
      it(`should return "${VALIDATION_ERROR_MESSAGE.hourIsOutOfRange}"`, () => {
        expect(testFn(-1)).toBe(VALIDATION_ERROR_MESSAGE.hourIsOutOfRange);
        expect(testFn(0)).not.toBe(VALIDATION_ERROR_MESSAGE.hourIsOutOfRange);
        expect(testFn(23)).not.toBe(VALIDATION_ERROR_MESSAGE.hourIsOutOfRange);
        expect(testFn(24)).toBe(VALIDATION_ERROR_MESSAGE.hourIsOutOfRange);
      });
    });
    describe('option is not required', () => {
      const testFn = toInvalidMessage(hourValidatorFactory, { required: false });
      it(`should NOT return "${VALIDATION_ERROR_MESSAGE.hourIsEmpty}"`, () => {
        expect(testFn(undefined)).toBe('');
      });
      it(`should return "${VALIDATION_ERROR_MESSAGE.hourIsOutOfRange}"`, () => {
        expect(testFn(-1)).toBe(VALIDATION_ERROR_MESSAGE.hourIsOutOfRange);
        expect(testFn(0)).not.toBe(VALIDATION_ERROR_MESSAGE.hourIsOutOfRange);
        expect(testFn(23)).not.toBe(VALIDATION_ERROR_MESSAGE.hourIsOutOfRange);
        expect(testFn(24)).toBe(VALIDATION_ERROR_MESSAGE.hourIsOutOfRange);
      });
    });
  });

  describe('minuteValidatorFactory', () => {
    const { minuteValidatorFactory } = validator;

    describe('option is required', () => {
      const testFn = toInvalidMessage(minuteValidatorFactory, { required: true });

      it(`should return "${VALIDATION_ERROR_MESSAGE.minuteIsEmpty}"`, () => {
        expect(testFn(undefined)).toBe(VALIDATION_ERROR_MESSAGE.minuteIsEmpty);
      });
      it(`should return "${VALIDATION_ERROR_MESSAGE.minuteIsOutOfRange}"`, () => {
        expect(testFn(-1)).toBe(VALIDATION_ERROR_MESSAGE.minuteIsOutOfRange);
        expect(testFn(0)).not.toBe(VALIDATION_ERROR_MESSAGE.minuteIsOutOfRange);
        expect(testFn(59)).not.toBe(VALIDATION_ERROR_MESSAGE.minuteIsOutOfRange);
        expect(testFn(60)).toBe(VALIDATION_ERROR_MESSAGE.minuteIsOutOfRange);
      });
    });
    describe('option is not required', () => {
      const testFn = toInvalidMessage(minuteValidatorFactory, { required: false });

      it(`should NOT return "${VALIDATION_ERROR_MESSAGE.minuteIsEmpty}"`, () => {
        expect(testFn(undefined)).toBe('');
      });
      it(`should return "${VALIDATION_ERROR_MESSAGE.minuteIsOutOfRange}"`, () => {
        expect(testFn(-1)).toBe(VALIDATION_ERROR_MESSAGE.minuteIsOutOfRange);
        expect(testFn(0)).not.toBe(VALIDATION_ERROR_MESSAGE.minuteIsOutOfRange);
        expect(testFn(59)).not.toBe(VALIDATION_ERROR_MESSAGE.minuteIsOutOfRange);
        expect(testFn(60)).toBe(VALIDATION_ERROR_MESSAGE.minuteIsOutOfRange);
      });
    });
  });

  describe('timeValidatorFactory', () => {
    const { timeValidatorFactory } = validator;

    describe('option is required', () => {
      const testFn = toInvalidMessage(timeValidatorFactory, { required: true });

      it(`should return "${VALIDATION_ERROR_MESSAGE.timeIsEmpty}"`, () => {
        expect(testFn(undefined)).toBe(VALIDATION_ERROR_MESSAGE.timeIsEmpty);
      });
      it(`should return "${VALIDATION_ERROR_MESSAGE.hourIsEmpty}"`, () => {
        expect(testFn({ hour: undefined, minute: 59 })).toBe(VALIDATION_ERROR_MESSAGE.hourIsEmpty);
      });
      it(`should return "${VALIDATION_ERROR_MESSAGE.minuteIsEmpty}"`, () => {
        expect(testFn({ hour: 1, minute: undefined })).toBe(VALIDATION_ERROR_MESSAGE.minuteIsEmpty);
      });
    });
    describe('option is not required', () => {
      const testFn = toInvalidMessage(timeValidatorFactory, { required: false });

      it(`should NOT return "${VALIDATION_ERROR_MESSAGE.timeIsEmpty}"`, () => {
        expect(testFn(undefined)).not.toBe(VALIDATION_ERROR_MESSAGE.timeIsEmpty);
      });
      it(`should return "${VALIDATION_ERROR_MESSAGE.hourIsOutOfRange}"`, () => {
        expect(testFn({ hour: -1, minute: 1 })).toBe(VALIDATION_ERROR_MESSAGE.hourIsOutOfRange);
      });
      it(`should return "${VALIDATION_ERROR_MESSAGE.minuteIsOutOfRange}"`, () => {
        expect(testFn({ hour: 1, minute: -1 })).toBe(VALIDATION_ERROR_MESSAGE.minuteIsOutOfRange);
      });
    });
  });

  describe('timeRangeValidatorFactory', () => {
    const { timeRangeValidatorFactory } = validator;

    describe('timeRange is required', () => {
      it(`should return "${VALIDATION_ERROR_MESSAGE.timeRangeIsEmpty}"`, () => {
        const testFn = toInvalidMessage(timeRangeValidatorFactory, { required: true });
        expect(testFn(undefined)).toBe(VALIDATION_ERROR_MESSAGE.timeRangeIsEmpty);
      });
      it(`should NOT return "${VALIDATION_ERROR_MESSAGE.timeRangeIsEmpty}"`, () => {
        const testFn = toInvalidMessage(timeRangeValidatorFactory, { required: false });
        expect(testFn(undefined)).not.toBe(VALIDATION_ERROR_MESSAGE.timeRangeIsEmpty);
      });
    });

    const testFn = toInvalidMessage(timeRangeValidatorFactory, { required: false });
    describe('invalid time start', () => {
      it(`should return "${VALIDATION_ERROR_MESSAGE.hourIsOutOfRange}"`, () => {
        expect(testFn({ start: { hour: 59 } })).toBe(VALIDATION_ERROR_MESSAGE.hourIsOutOfRange);
      });
    });
    describe('invalid time end', () => {
      it(`should return "${VALIDATION_ERROR_MESSAGE.hourIsOutOfRange}"`, () => {
        expect(testFn({ end: { hour: 59 } })).toBe(VALIDATION_ERROR_MESSAGE.hourIsOutOfRange);
      });
    });
  });

  describe('remarkValidatorFactory', () => {
    const { remarksValidatorFactory } = validator;
    describe('required', () => {
      it(`should return "${VALIDATION_ERROR_MESSAGE.remarksIsEmpty}"`, () => {
        const testFn = toInvalidMessage(remarksValidatorFactory, { required: true, maxLength: 50 });
        expect(testFn(undefined)).toBe(VALIDATION_ERROR_MESSAGE.remarksIsEmpty);
      });
      it(`should NOT return "${VALIDATION_ERROR_MESSAGE.remarksIsEmpty}"`, () => {
        const testFn = toInvalidMessage(remarksValidatorFactory, { required: false, maxLength: 50 });
        expect(testFn(undefined)).not.toBe(VALIDATION_ERROR_MESSAGE.remarksIsEmpty);
      });
    });
    describe('invalid length', () => {
      const testFn = toInvalidMessage(remarksValidatorFactory, { required: false, maxLength: 100 });
      const expectedInvalidMessage = replaceMessage(VALIDATION_ERROR_MESSAGE.overLength, {
        maxLength: 100,
        displayName: '備考',
      });
      it(`should return "${expectedInvalidMessage}"`, () => {
        expect(testFn(createTestString(100))).not.toBe(expectedInvalidMessage);
        expect(testFn(createTestString(101))).toBe(expectedInvalidMessage);
      });
    });
  });

  describe('dateStringValidatorFactory', () => {
    const { dateStringValidatorFactory } = validator;
    describe('required', () => {
      const testFn = toInvalidMessage(dateStringValidatorFactory, { required: true });
      it(`should return "${VALIDATION_ERROR_MESSAGE.dateIsEmpty}"`, () => {
        expect(testFn('')).toBe(VALIDATION_ERROR_MESSAGE.dateIsEmpty);
      });
      const testFn2 = toInvalidMessage(dateStringValidatorFactory, { required: false });
      it(`should NOT return "${VALIDATION_ERROR_MESSAGE.dateIsEmpty}"`, () => {
        expect(testFn2('')).not.toBe(VALIDATION_ERROR_MESSAGE.dateIsEmpty);
      });
    });
    describe('invalid format', () => {
      const testFn = toInvalidMessage(dateStringValidatorFactory, { required: true });
      it(`should return "${VALIDATION_ERROR_MESSAGE.dateFormatIsInvalid}"`, () => {
        expect(testFn('2021-10-10')).not.toBe(VALIDATION_ERROR_MESSAGE.dateFormatIsInvalid);
        expect(testFn('2021-02-31')).toBe(VALIDATION_ERROR_MESSAGE.dateFormatIsInvalid);
      });
    });
  });
});

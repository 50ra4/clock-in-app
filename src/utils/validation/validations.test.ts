import { VALIDATION_ERROR_MESSAGE } from 'constants/error';
import { createExpectForValidator } from 'utils/testUtil';
import * as validator from './validations';

describe('validations', () => {
  describe('isInvalidHour', () => {
    describe('option is required', () => {
      const expect = createExpectForValidator({ required: true }, validator.isInvalidHour);
      it(`should return "${VALIDATION_ERROR_MESSAGE.hourIsEmpty}"`, () => {
        expect(undefined).toBe(VALIDATION_ERROR_MESSAGE.hourIsEmpty);
      });
      it(`should return "${VALIDATION_ERROR_MESSAGE.hourIsOutOfRange}"`, () => {
        expect(25).toBe(VALIDATION_ERROR_MESSAGE.hourIsOutOfRange);
      });
    });
    describe('option is not required', () => {
      const expect = createExpectForValidator({ required: false }, validator.isInvalidHour);
      it(`should NOT return "${VALIDATION_ERROR_MESSAGE.hourIsEmpty}"`, () => {
        expect(undefined).toBe(false);
      });
      it(`should return "${VALIDATION_ERROR_MESSAGE.hourIsOutOfRange}"`, () => {
        expect(-1).toBe(VALIDATION_ERROR_MESSAGE.hourIsOutOfRange);
        expect(0).not.toBe(VALIDATION_ERROR_MESSAGE.hourIsOutOfRange);
        expect(23).not.toBe(VALIDATION_ERROR_MESSAGE.hourIsOutOfRange);
        expect(24).toBe(VALIDATION_ERROR_MESSAGE.hourIsOutOfRange);
      });
    });
  });

  describe('isInvalidMinute', () => {
    describe('option is required', () => {
      const expect = createExpectForValidator({ required: true }, validator.isInvalidMinute);
      it(`should return "${VALIDATION_ERROR_MESSAGE.minuteIsEmpty}"`, () => {
        expect(undefined).toBe(VALIDATION_ERROR_MESSAGE.minuteIsEmpty);
      });
      it(`should return "${VALIDATION_ERROR_MESSAGE.minuteIsOutOfRange}"`, () => {
        expect(-1).toBe(VALIDATION_ERROR_MESSAGE.minuteIsOutOfRange);
        expect(0).not.toBe(VALIDATION_ERROR_MESSAGE.minuteIsOutOfRange);
        expect(59).not.toBe(VALIDATION_ERROR_MESSAGE.minuteIsOutOfRange);
        expect(60).toBe(VALIDATION_ERROR_MESSAGE.minuteIsOutOfRange);
      });
    });
    describe('option is not required', () => {
      const expect = createExpectForValidator({ required: false }, validator.isInvalidMinute);
      it(`should NOT return "${VALIDATION_ERROR_MESSAGE.minuteIsEmpty}"`, () => {
        expect(undefined).toBe(false);
      });
      it(`should return "${VALIDATION_ERROR_MESSAGE.minuteIsOutOfRange}"`, () => {
        expect(-1).toBe(VALIDATION_ERROR_MESSAGE.minuteIsOutOfRange);
        expect(0).not.toBe(VALIDATION_ERROR_MESSAGE.minuteIsOutOfRange);
        expect(59).not.toBe(VALIDATION_ERROR_MESSAGE.minuteIsOutOfRange);
        expect(60).toBe(VALIDATION_ERROR_MESSAGE.minuteIsOutOfRange);
      });
    });
  });

  describe('isInvalidTime', () => {
    describe('option is required', () => {
      const expect = createExpectForValidator({ required: true }, validator.isInvalidTime);
      it(`should return "${VALIDATION_ERROR_MESSAGE.timeIsEmpty}"`, () => {
        expect(undefined).toBe(VALIDATION_ERROR_MESSAGE.timeIsEmpty);
      });
      it(`should return "${VALIDATION_ERROR_MESSAGE.hourIsEmpty}"`, () => {
        expect({ hour: undefined, minute: 59 }).toBe(VALIDATION_ERROR_MESSAGE.hourIsEmpty);
      });
      it(`should return "${VALIDATION_ERROR_MESSAGE.minuteIsEmpty}"`, () => {
        expect({ hour: 1, minute: undefined }).toBe(VALIDATION_ERROR_MESSAGE.minuteIsEmpty);
      });
    });
    describe('option is not required', () => {
      const expect = createExpectForValidator({ required: false }, validator.isInvalidTime);
      it(`should NOT return "${VALIDATION_ERROR_MESSAGE.timeIsEmpty}"`, () => {
        expect(undefined).toBe(false);
      });
      it(`should return "${VALIDATION_ERROR_MESSAGE.hourIsOutOfRange}"`, () => {
        expect({ hour: -1, minute: 1 }).toBe(VALIDATION_ERROR_MESSAGE.hourIsOutOfRange);
      });
      it(`should return "${VALIDATION_ERROR_MESSAGE.minuteIsOutOfRange}"`, () => {
        expect({ hour: 1, minute: -1 }).toBe(VALIDATION_ERROR_MESSAGE.minuteIsOutOfRange);
      });
    });
  });

  describe('isInvalidTimeRange', () => {
    describe('timeRange is required', () => {
      it(`should return "${VALIDATION_ERROR_MESSAGE.timeRangeIsEmpty}"`, () => {
        const expect = createExpectForValidator({ required: true }, validator.isInvalidTimeRange);
        expect(undefined).toBe(VALIDATION_ERROR_MESSAGE.timeRangeIsEmpty);
      });
      it(`should NOT return "${VALIDATION_ERROR_MESSAGE.timeRangeIsEmpty}"`, () => {
        const expect = createExpectForValidator({ required: false }, validator.isInvalidTimeRange);
        expect(undefined).toBe(false);
      });
    });
    describe('invalid time start', () => {
      const expect = createExpectForValidator({ required: false }, validator.isInvalidTimeRange);
      it(`should return "${VALIDATION_ERROR_MESSAGE.hourIsOutOfRange}"`, () => {
        expect({ start: { hour: 59 } }).toBe(VALIDATION_ERROR_MESSAGE.hourIsOutOfRange);
      });
    });
    describe('invalid time end', () => {
      const expect = createExpectForValidator({ required: false }, validator.isInvalidTimeRange);
      it(`should return "${VALIDATION_ERROR_MESSAGE.minuteIsOutOfRange}"`, () => {
        expect({ start: { hour: 1, minute: 60 } }).toBe(VALIDATION_ERROR_MESSAGE.minuteIsOutOfRange);
      });
    });
  });
});

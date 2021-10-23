import { VALIDATION_ERROR_MESSAGE } from 'constants/error';
import { createExpectForValidator } from 'utils/testUtil';
import { ValidationError } from 'utils/validationUtil';
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
        expect(25).toBe(VALIDATION_ERROR_MESSAGE.hourIsOutOfRange);
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
        expect(undefined).toBe(VALIDATION_ERROR_MESSAGE.minuteIsOutOfRange);
      });
    });
    describe('option is not required', () => {
      const expect = createExpectForValidator({ required: false }, validator.isInvalidMinute);
      it(`should NOT return "${VALIDATION_ERROR_MESSAGE.minuteIsEmpty}"`, () => {
        expect(undefined).toBe(false);
      });
      it(`should return "${VALIDATION_ERROR_MESSAGE.minuteIsOutOfRange}"`, () => {
        expect(undefined).toBe(VALIDATION_ERROR_MESSAGE.minuteIsOutOfRange);
      });
    });
  });

  describe('isInvalidTime', () => {
    const mockedIsInvalidHour = jest.spyOn(validator, 'isInvalidHour');
    const mockedIsInvalidMinute = jest.spyOn(validator, 'isInvalidMinute');

    describe('option is required', () => {
      beforeEach(() => {
        mockedIsInvalidHour.mockReset();
        mockedIsInvalidMinute.mockReset();
      });

      const expect = createExpectForValidator({ required: true }, validator.isInvalidTime);
      it(`should return "${VALIDATION_ERROR_MESSAGE.timeIsEmpty}"`, () => {
        expect(undefined).toBe(VALIDATION_ERROR_MESSAGE.timeIsEmpty);
      });
      it(`should return "${VALIDATION_ERROR_MESSAGE.hourIsEmpty}"`, () => {
        mockedIsInvalidHour.mockImplementationOnce(
          (option) => (value) => new ValidationError(value, VALIDATION_ERROR_MESSAGE.hourIsEmpty),
        );
        expect(undefined).toBe(VALIDATION_ERROR_MESSAGE.hourIsEmpty);
      });
      it(`should return "${VALIDATION_ERROR_MESSAGE.minuteIsEmpty}"`, () => {
        mockedIsInvalidHour.mockImplementationOnce((option) => (value) => false);
        mockedIsInvalidMinute.mockImplementationOnce(
          (option) => (value) => new ValidationError(value, VALIDATION_ERROR_MESSAGE.minuteIsEmpty),
        );
        expect(undefined).toBe(VALIDATION_ERROR_MESSAGE.minuteIsEmpty);
      });
    });
    describe('option is not required', () => {
      beforeEach(() => {
        mockedIsInvalidHour.mockReset();
        mockedIsInvalidMinute.mockReset();
      });

      const expect = createExpectForValidator({ required: false }, validator.isInvalidTime);
      it(`should NOT return "${VALIDATION_ERROR_MESSAGE.timeIsEmpty}"`, () => {
        expect(undefined).toBe(false);
      });
      it(`should return "${VALIDATION_ERROR_MESSAGE.hourIsOutOfRange}"`, () => {
        mockedIsInvalidHour.mockImplementationOnce(
          (option) => (value) => new ValidationError(value, VALIDATION_ERROR_MESSAGE.hourIsOutOfRange),
        );
        expect({ hour: 25 }).toBe(VALIDATION_ERROR_MESSAGE.hourIsOutOfRange);
      });
      it(`should return "${VALIDATION_ERROR_MESSAGE.minuteIsOutOfRange}"`, () => {
        mockedIsInvalidHour.mockImplementationOnce((option) => (value) => false);
        mockedIsInvalidMinute.mockImplementationOnce(
          (option) => (value) => new ValidationError(value, VALIDATION_ERROR_MESSAGE.minuteIsOutOfRange),
        );
        expect(undefined).toBe(VALIDATION_ERROR_MESSAGE.minuteIsOutOfRange);
      });
    });
  });
});

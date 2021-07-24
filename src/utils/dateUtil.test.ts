import { mocked } from 'ts-jest/utils';
import { parseISO } from 'date-fns';

import { getCurrentDate } from './currentDate';
import { dateToTimeString, timeStringToDate } from './dateUtil';

jest.mock('./currentDate');
const getCurrentDateMock = mocked(getCurrentDate);

describe('dateUtil', () => {
  beforeEach(() => {
    getCurrentDateMock.mockReturnValue(parseISO('2021-07-23T21:00:00.000+09:00'));
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('dateToTimeString', () => {
    it('should be timeString', () => {
      expect(dateToTimeString(getCurrentDate())).toBe('21:00');
    });
  });

  describe('timeStringToDate', () => {
    it('should be date', () => {
      const result = timeStringToDate('21:00');
      expect(result instanceof Date).toBe(true);
      const hours = result.getHours();
      const minutes = result.getMinutes();
      expect(hours).toBe(21);
      expect(minutes).toBe(0);
    });
  });
});

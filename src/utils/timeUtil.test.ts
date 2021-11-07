import { timeRangeToMinute } from './timeUtil';

describe('timeUtil', () => {
  describe('timeRangeToMinute', () => {
    it('should return Number.Nan if time range is empty', () => {
      expect(timeRangeToMinute({})).toBe(Number.NaN);
      expect(timeRangeToMinute({ start: {}, end: { hour: 20, minute: 10 } })).toBe(Number.NaN);
      expect(timeRangeToMinute({ start: { hour: 20, minute: 10 }, end: {} })).toBe(Number.NaN);
      expect(timeRangeToMinute({ start: { hour: 20 }, end: {} })).toBe(Number.NaN);
      expect(timeRangeToMinute({ start: { hour: 20, minute: 10 }, end: { hour: 20, minute: 10 } })).not.toBe(
        Number.NaN,
      );
    });
    it('should return minute', () => {
      expect(timeRangeToMinute({ start: { hour: 10, minute: 0 }, end: { hour: 18, minute: 30 } })).toBe(8 * 60 + 30);
      expect(timeRangeToMinute({ start: { hour: 10, minute: 0 }, end: { hour: 19, minute: 0 } })).toBe(9 * 60);
      expect(timeRangeToMinute({ start: { hour: 8, minute: 30 }, end: { hour: 17, minute: 0 } })).toBe(9 * 60 - 30);
    });
    it('should return value added for 24 hours is added if the start hour is greater than the end hour', () => {
      expect(timeRangeToMinute({ start: { hour: 23, minute: 0 }, end: { hour: 5, minute: 30 } })).toBe(6 * 60 + 30);
      expect(timeRangeToMinute({ start: { hour: 22, minute: 0 }, end: { hour: 8, minute: 0 } })).toBe(10 * 60);
      expect(timeRangeToMinute({ start: { hour: 22, minute: 30 }, end: { hour: 1, minute: 0 } })).toBe(3 * 60 - 30);
    });
  });
});

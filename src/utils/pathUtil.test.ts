import { PagePath } from 'constants/path';
import { replacePathParams } from './pathUtil';

describe('pathUtil', () => {
  describe('replacePathParams', () => {
    it('should return value replaced with uid', () => {
      expect(replacePathParams('/timecards/:uid', { uid: '1234' })).toBe('/timecards/1234');
    });
    it('should return value replaced with uid and month', () => {
      expect(replacePathParams('/timecards/:uid/month/:month' as PagePath, { uid: '1234', month: '2021-08' })).toBe(
        '/timecards/1234/month/2021-08',
      );
    });
  });
});

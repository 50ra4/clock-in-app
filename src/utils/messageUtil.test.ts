import { replaceMessage } from './messageUtil';

describe('messageUtil', () => {
  describe('replaceMessage', () => {
    it('should return a message in which the string is replaced with a parameter', () => {
      const params1 = { userName: 'ホゲホゲ' };
      expect(replaceMessage('%userName%の値が不正です', params1)).toBe('ホゲホゲの値が不正です');
      expect(replaceMessage('@userName@の値が不正です', params1, '@')).toBe('ホゲホゲの値が不正です');

      const params2 = { userName: 'ホゲホゲ', userId: 11111 };
      expect(replaceMessage('%userName%の%userId%が不正です', params2)).toBe('ホゲホゲの11111が不正です');
      expect(replaceMessage('@userName@の@userId@が不正です', params2, '@')).toBe('ホゲホゲの11111が不正です');
    });
  });
});

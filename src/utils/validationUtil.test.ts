import { VALIDATION_ERROR_MESSAGE } from 'constants/error';
import * as either from 'fp-ts/lib/Either';
import { Nullable } from 'types';
import { createTestString } from './testUtil';
import { isNonNullable, isNullable } from './typeGuard';
import { ValidatorFactory, failed, ValidatorOption, messageReplacer } from './validationUtil';

type User = {
  id: string;
  name: string;
  age: number;
};

const typeName = 'User';
const displayName = 'ユーザー';

describe('validationUtil', () => {
  describe('ValidationFactory', () => {
    const validator = new ValidatorFactory<Nullable<User>, ValidatorOption>(typeName, displayName)
      .skip((value, { required }) => !required && isNullable(value))
      .add((user) => isNonNullable(user) && !!user.id, messageReplacer(VALIDATION_ERROR_MESSAGE.isEmpty))
      .add(
        (user) => isNonNullable(user) && !!user.name,
        () => messageReplacer(VALIDATION_ERROR_MESSAGE.isEmpty)({ displayName: 'ユーザー名' }),
      )
      .add(
        (user) => isNonNullable(user) && user.name.length < 51,
        () => messageReplacer(VALIDATION_ERROR_MESSAGE.over50Length)({ displayName: 'ユーザー名' }),
      )
      .create();

    it('should return true', () => {
      const user1 = { id: '1', name: 'うずまき', age: 12 };
      const validate1 = validator({ required: true });
      expect(validate1(user1)).toEqual(either.right(true));
      const validate2 = validator({ required: false });
      expect(validate2(user1)).toEqual(either.right(true));
    });

    it('should return empty error message', () => {
      const validate = validator({ required: true });
      const expectedMessage = 'ユーザーを入力してください';
      const user1 = null;
      expect(validate(user1)).toEqual(failed(user1, expectedMessage));
      const user2 = undefined;
      expect(validate(user2)).toEqual(failed(user2, expectedMessage));
      const user3 = { id: '', name: '', age: 12 };
      expect(validate(user3)).toEqual(failed(user3, expectedMessage));
    });

    it('should return invalid error message', () => {
      const validate = validator({ required: false });
      const user1 = { id: '1', name: '', age: 12 };
      expect(validate(user1)).toEqual(failed(user1, 'ユーザー名を入力してください'));

      const user2 = { id: '1', name: createTestString(51), age: 12 };
      expect(validate(user2)).toEqual(failed(user2, VALIDATION_ERROR_MESSAGE.over50Length));
    });
  });
});

import * as either from 'fp-ts/lib/Either';
import { EnumValue, Nullable } from 'types';
import { replaceMessage } from './messageUtil';
import { createTestString } from './testUtil';
import { isNonNullable, isNullable } from './typeGuard';
import { ValidationErrorMessage, ValidatorFactory, failed, ValidatorOption } from './validationUtil';

type User = {
  id: string;
  name: string;
  age: number;
};

const MESSAGE = {
  isEmptyUser: 'ユーザーを入力してください',
  isEmptyUserName: 'ユーザー名を入力してください',
  isOverLength: 'ユーザー名を50文字以内で入力してください',
} as const;
const typeName = 'User';
const displayName = 'ユーザー';

type Message = ValidationErrorMessage | EnumValue<typeof MESSAGE>;

describe('validationUtil', () => {
  describe('ValidationFactory', () => {
    const validator = new ValidatorFactory<Nullable<User>, ValidatorOption, Message>(typeName, displayName)
      .skipIf((value, { required }) => !required && isNullable(value))
      .add((user) => isNonNullable(user) && !!user.id, MESSAGE.isEmptyUser)
      .add((user) => isNonNullable(user) && !!user.name, MESSAGE.isEmptyUserName)
      .add((user) => isNonNullable(user) && user.name.length < 51, MESSAGE.isOverLength)
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
      const user1 = null;
      expect(validate(user1)).toEqual(failed(user1, replaceMessage(MESSAGE.isEmptyUser, { displayName })));
      const user2 = undefined;
      expect(validate(user2)).toEqual(failed(user2, replaceMessage(MESSAGE.isEmptyUser, { displayName })));
      const user3 = { id: '', name: '', age: 12 };
      expect(validate(user3)).toEqual(failed(user3, replaceMessage(MESSAGE.isEmptyUser, { displayName })));
    });

    it('should return invalid error message', () => {
      const validate = validator({ required: false });
      const user1 = { id: '1', name: '', age: 12 };
      expect(validate(user1)).toEqual(failed(user1, MESSAGE.isEmptyUserName));

      const user2 = { id: '1', name: createTestString(51), age: 12 };
      expect(validate(user2)).toEqual(failed(user2, MESSAGE.isOverLength));
    });
  });
});

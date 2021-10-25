import { VALIDATION_ERROR_MESSAGE } from 'constants/error';
import * as either from 'fp-ts/lib/Either';
import { EnumValue, Nullable } from 'types';
import { replaceMessage } from './messageUtil';
import { createTestString } from './testUtil';
import { hasPropertiesInObject, isNonNullable, isObject } from './typeGuard';
import { ValidationErrorMessage, ValidationFactory, failed } from './validationUtil';

type User = {
  id: string;
  name: string;
  age: number;
};

const isUser = (x: unknown): x is User =>
  isNonNullable(x) && isObject(x) && hasPropertiesInObject(['id', 'name', 'age'])(x) && !!x.id;

const MESSAGE = {
  isInvalidType: VALIDATION_ERROR_MESSAGE.typeIsInvalid,
  isEmptyUser: VALIDATION_ERROR_MESSAGE.isEmpty,
  isEmptyUserName: 'ユーザー名を入力してください',
  isOverLength: 'ユーザー名を50文字以内で入力してください',
} as const;
const typeName = 'User';
const displayName = 'ユーザー';

type Message = ValidationErrorMessage | EnumValue<typeof MESSAGE>;

describe('validationUtil', () => {
  describe('ValidationFactory', () => {
    const factory = new ValidationFactory<Nullable<User>, Message>(typeName, displayName)
      .addIsType<User>(isUser, MESSAGE.isEmptyUser)
      .add((user) => !!user.name, MESSAGE.isEmptyUserName)
      .add((user) => user.name.length < 51, MESSAGE.isOverLength);

    it('should return true', () => {
      const user1 = { id: '1', name: 'うずまき', age: 12 };
      const validate1 = factory.create({ required: true });
      expect(validate1(user1)).toEqual(either.right(true));
      const validate2 = factory.create({ required: false });
      expect(validate2(user1)).toEqual(either.right(true));
    });

    it('should return empty error message', () => {
      const validate = factory.create({ required: true });
      // const user1 = null;
      // expect(validate(user1)).toEqual(failed(user1, replaceMessage(MESSAGE.isEmptyUser, { displayName })));
      // const user2 = undefined;
      // expect(validate(user2)).toEqual(failed(user2, replaceMessage(MESSAGE.isEmptyUser, { displayName })));
      const user3 = { id: '', name: '', age: 12 };
      expect(validate(user3)).toEqual(failed(user3, replaceMessage(MESSAGE.isEmptyUser, { displayName })));
    });

    it('should return invalid error message', () => {
      const validate = factory.create({ required: false });
      const user1 = { id: '1', name: '', age: 12 };
      expect(validate(user1)).toEqual(failed(user1, MESSAGE.isEmptyUserName));

      const user2 = { id: '1', name: createTestString(51), age: 12 };
      expect(validate(user2)).toEqual(failed(user2, MESSAGE.isOverLength));
    });
  });
});

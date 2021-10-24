import { VALIDATION_ERROR_MESSAGE } from 'constants/error';
import * as either from 'fp-ts/lib/Either';
import { EnumValue, Nullable } from 'types';
import { createTestString } from './testUtil';
import { isObject, hasPropertiesInObject, isNonNullable } from './typeGuard';
import { ValidationError, ValidationErrorMessage, ValidationFactory } from './validationUtil';

type User = {
  id: string;
  name: string;
  age: number;
};
const isUser = (x: unknown): x is User => !isObject(x) || hasPropertiesInObject(['id', 'name', 'age'])(x);
const isEmptyUser = (x: Nullable<User>) => !isNonNullable(x) || !x.id;

const MESSAGE = {
  isInvalidType: VALIDATION_ERROR_MESSAGE.typeIsInvalid,
  isEmptyUser: VALIDATION_ERROR_MESSAGE.isEmpty,
  isEmptyUserName: 'ユーザー名を入力してください',
  isOverLength: 'ユーザー名を50文字以内で入力してください',
} as const;

type Message = ValidationErrorMessage | EnumValue<typeof MESSAGE>;

describe('validationUtil', () => {
  describe('ValidationFactory', () => {
    const factory = new ValidationFactory<User, Message>('user', isUser, isEmptyUser);
    factory
      .add((user) => !!user.name, MESSAGE.isEmptyUserName)
      .add((user) => user.name.length < 51, MESSAGE.isOverLength);

    it('should return type guard message', () => {
      const validate = factory.create({ required: true });
      const user1 = { id: '', name: '' } as User;
      expect(validate(user1)).toEqual(either.left(new ValidationError(user1, MESSAGE.isInvalidType)));
    });

    it('should return empty error message', () => {
      const validate = factory.create({ required: true });
      const user1 = null;
      expect(validate(user1)).toEqual(either.left(new ValidationError(user1, MESSAGE.isEmptyUser)));
      const user2 = undefined;
      expect(validate(user2)).toEqual(either.left(new ValidationError(user2, MESSAGE.isEmptyUser)));
      const user3 = { id: '', name: '', age: 12 };
      expect(validate(user3)).toEqual(either.left(new ValidationError(user3, MESSAGE.isEmptyUser)));
    });

    it('should return invalid error message', () => {
      const validate = factory.create({ required: false });
      const user1 = { id: '1', name: '', age: 12 };
      expect(validate(user1)).toEqual(either.left(new ValidationError(user1, MESSAGE.isEmptyUserName)));

      const user2 = { id: '1', name: createTestString(51), age: 12 };
      expect(validate(user2)).toEqual(either.left(new ValidationError(user2, MESSAGE.isOverLength)));
    });
  });
});

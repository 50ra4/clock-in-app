import { Either, right, left } from 'fp-ts/Either';
import { VALIDATION_ERROR_MESSAGE } from 'constants/error';
import { EnumValue, Nullable } from 'types';
import { isNullable } from './typeGuard';
import { replaceMessage } from './messageUtil';

type Validate<T> = (value: T) => boolean;
export type ValidationErrorMessage = EnumValue<typeof VALIDATION_ERROR_MESSAGE>;

export class ValidationError implements TypeError {
  public readonly name = 'ValidationError';

  constructor(
    // TODO: add type name
    public readonly value: unknown, //
    public readonly message: string,
  ) {}
}

export type ValidationOption = {
  required?: boolean;
};

// TODO: remove (old type)
export type Validator<T> = (option: ValidationOption) => (value: T | undefined) => ValidationError | false;

export const failed = (value: unknown, message: string): Either<ValidationError, true> =>
  left(new ValidationError(value, message));

export class ValidationFactory<Value, Message extends string = string> {
  constructor(
    public readonly name: string,
    private readonly displayName: string,
    /** type guard */
    private readonly is: (x: unknown) => x is Value,
    private readonly isEmpty: (value: Nullable<Value>) => boolean = isNullable,
  ) {}

  private readonly validators: {
    isValid: Validate<Value>;
    message: Message;
  }[] = [];

  public add(isValid: Validate<Value>, message: Message) {
    this.validators.push({ isValid, message });
    return this;
  }

  public create({ required }: ValidationOption) {
    const { is, isEmpty, displayName, validators } = this;

    // eslint-disable-next-line complexity
    return (value: Nullable<Value>): Either<ValidationError, true> => {
      if (!is(value)) {
        const message = replaceMessage(VALIDATION_ERROR_MESSAGE.typeIsInvalid, { displayName });
        return failed(value, message);
      }
      if (isEmpty(value)) {
        if (!required) {
          return right(true);
        }
        const message = replaceMessage(VALIDATION_ERROR_MESSAGE.isEmpty, { displayName });
        return failed(value, message);
      }
      for (const { isValid, message } of validators) {
        if (!isValid(value)) {
          return failed(value, message);
        }
      }
      return right(true);
    };
  }
}

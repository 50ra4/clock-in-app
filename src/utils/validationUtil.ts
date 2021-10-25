import { Either, right, left, isLeft, Left } from 'fp-ts/Either';
import { VALIDATION_ERROR_MESSAGE } from 'constants/error';
import { EnumValue, Nullable, NullOrUndefined } from 'types';
import { isNullable } from './typeGuard';
import { replaceMessage } from './messageUtil';

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
type Validate<Input> = (value: Input, option: ValidationOption) => boolean;
type ValidateWithMessage<Input, Message extends string = string> = {
  validate: Validate<Input>;
  message: Message;
};

/**
 * TODO: remove
 * @deprecated old type
 */
export type Validator<Input> = (option: ValidationOption) => (value: Input | undefined) => ValidationError | false;

export const failed = (value: unknown, message: string): Either<ValidationError, true> =>
  left(new ValidationError(value, message));

export const isFailed = (result: Either<ValidationError, true>): result is Left<ValidationError> => isLeft(result);

type ValidateIsEmpty<T> = (x: Nullable<T>) => x is NullOrUndefined;

const createIsEmpty =
  <T>(): ValidateIsEmpty<T> =>
  (x): x is NullOrUndefined =>
    isNullable<T>(x);

export class ValidationFactory<Input, Message extends string = string> {
  constructor(
    private readonly name: string,
    private readonly displayName: string,
    private readonly isEmpty: ValidateIsEmpty<Input> = createIsEmpty<Input>(),
  ) {}

  private readonly validators: ValidateWithMessage<Input, Message>[] = [];

  public add(isValid: Validate<Input>, message: Message) {
    this.validators.push({ validate: isValid, message });
    return this;
  }

  public create(option: ValidationOption) {
    const { isEmpty, displayName, validators } = this;

    // eslint-disable-next-line complexity
    return (value: Nullable<Input>): Either<ValidationError, true> => {
      if (isEmpty(value)) {
        if (!option?.required) {
          return right(true);
        }
        const message = replaceMessage(VALIDATION_ERROR_MESSAGE.isEmpty, { displayName });
        return failed(value, message);
      }
      for (const { validate, message } of validators) {
        if (!validate(value, option)) {
          return failed(value, message);
        }
      }
      return right(true);
    };
  }
}

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

class ValidatorFactoryImpl<Input, Message extends string = string> {
  constructor(
    protected readonly name: string,
    protected readonly displayName: string,
    protected readonly validators: ValidateWithMessage<Input, Message>[] = [],
  ) {}

  public add(isValid: Validate<Input>, message: Message) {
    this.validators.push({ validate: isValid, message });
    return this;
  }

  public create(option: ValidationOption) {
    const { validators } = this;
    return (value: Input): Either<ValidationError, true> => {
      for (const { validate, message } of validators) {
        if (!validate(value, option)) {
          return failed(value, message);
        }
      }
      return right(true);
    };
  }
}

export class ValidationFactory<Input, Message extends string = string> extends ValidatorFactoryImpl<Input, Message> {
  constructor(name: string, displayName: string) {
    super(name, displayName, []);
  }

  public addIsType<T>(is: (x: unknown) => x is T, message: string) {
    const validators = [{ validate: is, message }, ...this.validators] as unknown as ValidateWithMessage<T, Message>[];
    console.log(validators);
    return new ValidatorFactoryImpl<T, Message>(this.name, this.displayName, validators);
  }

  public create(option: ValidationOption) {
    return super.create(option);
  }
}

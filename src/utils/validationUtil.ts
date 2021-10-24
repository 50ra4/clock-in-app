import { Either, right, left } from 'fp-ts/Either';
import { VALIDATION_ERROR_MESSAGE } from 'constants/error';
import { EnumValue, Nullable } from 'types';
import { isNullable } from './typeGuard';

type Validate<T> = (value: T) => boolean;
export type ValidationErrorMessage = EnumValue<typeof VALIDATION_ERROR_MESSAGE>;

export class ValidationError implements TypeError {
  public readonly name = 'ValidationError';

  constructor(
    public readonly value: unknown, //
    public readonly message: string,
  ) {}
}

export type ValidationOption = {
  required?: boolean;
};

// TODO: remove (old type)
export type Validator<T> = (option: ValidationOption) => (value: T | undefined) => ValidationError | false;

export class ValidationFactory<Value, Message extends string = string> {
  constructor(
    public readonly name: string,
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
    // eslint-disable-next-line complexity
    return (value: Nullable<Value>): Either<ValidationError, false> => {
      if (!this.is(value)) {
        return left(new ValidationError(value, VALIDATION_ERROR_MESSAGE.typeIsInvalid));
      }
      if (this.isEmpty(value)) {
        if (!required) {
          return right(false);
        }
        return left(new ValidationError(value, VALIDATION_ERROR_MESSAGE.isEmpty));
      }
      for (const { isValid, message } of this.validators) {
        if (!isValid(value)) {
          return left(new ValidationError(value, message));
        }
      }
      return right<ValidationError, false>(false);
    };
  }
}

import { Either, right, left, isLeft, Left, fold } from 'fp-ts/Either';
import { VALIDATION_ERROR_MESSAGE } from 'constants/error';
import { EnumValue } from 'types';

export type ValidationErrorMessage = EnumValue<typeof VALIDATION_ERROR_MESSAGE>;

export class ValidationError implements TypeError {
  public readonly name = 'ValidationError';

  constructor(
    // TODO: add type name
    public readonly value: unknown, //
    public readonly message: string,
  ) {}
}

/**
 * @deprecated
 */
export type ValidationOption = {
  required?: boolean;
};
// /**
//  * @deprecated
//  */
// type _Validate<Input> = (value: Input, option: ValidationOption) => boolean;
// /**
//  * @deprecated
//  */
// type ValidateWithMessage<Input, Message extends string = string> = {
//   validate: _Validate<Input>;
//   message: Message;
// };

/**
 * TODO: remove
 * @deprecated old type
 */
export type Validator<Input> = (option: ValidationOption) => (value: Input | undefined) => ValidationError | false;

export const failed = (value: unknown, message: string): Either<ValidationError, true> =>
  left(new ValidationError(value, message));

export const isFailed = (result: Either<ValidationError, true>): result is Left<ValidationError> => isLeft(result);

export const toResult = fold(
  (e: ValidationError) => e.message,
  (_: true) => '',
);

// /**
//  * @deprecated
//  */
// type ValidateIsEmpty<T> = (x: Nullable<T>) => x is NullOrUndefined;

// /**
//  * @deprecated
//  */
// const createIsEmpty =
//   <T>(): ValidateIsEmpty<T> =>
//   (x): x is NullOrUndefined =>
//     isNullable<T>(x);

// /**
//  * @deprecated
//  */
// class ValidatorFactoryImpl<Input, Message extends string = string> {
//   constructor(
//     protected readonly name: string,
//     protected readonly displayName: string,
//     protected readonly validators: ValidateWithMessage<Input, Message>[] = [],
//   ) {}

//   public add(isValid: _Validate<Input>, message: Message) {
//     this.validators.push({ validate: isValid, message });
//     return this;
//   }

//   public create(option: ValidationOption) {
//     const { validators } = this;
//     return (value: Input): Either<ValidationError, true> => {
//       for (const { validate, message } of validators) {
//         if (!validate(value, option)) {
//           return failed(value, message);
//         }
//       }
//       return right(true);
//     };
//   }
// }

// /**
//  * @deprecated
//  */
// export class ValidationFactory<Input, Message extends string = string> extends ValidatorFactoryImpl<Input, Message> {
//   constructor(name: string, displayName: string) {
//     super(name, displayName, []);
//   }

//   public addIsType<T>(is: (x: unknown) => x is T, message: string) {
//     const validators = [{ validate: is, message }, ...this.validators] as unknown as ValidateWithMessage<T, Message>[];
//     console.log(validators);
//     return new ValidatorFactoryImpl<T, Message>(this.name, this.displayName, validators);
//   }

//   public create(option: ValidationOption) {
//     return super.create(option);
//   }
// }

export type ValidatorOption = {
  name: string;
  displayName: string;
  required?: boolean;
};
type Validate<Input, Option extends ValidatorOption> = (value: Input, option: Option) => boolean;
export class ValidatorFactory<
  Input,
  Option extends ValidatorOption = ValidatorOption,
  Message extends string = string,
> {
  constructor(
    private readonly name: string, //
    private readonly displayName: string,
  ) {}

  private readonly skips: Validate<Input, Option>[] = [];
  private readonly validations: {
    validate: Validate<Input, Option>;
    message: string;
  }[] = [];

  public skipIf(isSkip: Validate<Input, Option>) {
    this.skips.push(isSkip);
    return this;
  }

  public add(isValid: Validate<Input, Option>, invalidMessage: Message) {
    this.validations.push({ validate: isValid, message: invalidMessage });
    return this;
  }

  public create() {
    const { name, displayName } = this;
    const skips = [...this.skips];
    const validations = [...this.validations];
    return (option: Omit<Option, 'name' | 'displayName'>) =>
      (value: Input): Either<ValidationError, true> => {
        const validatorOption = { ...option, name, displayName } as Option;
        if (skips.some((isSkip) => isSkip(value, validatorOption))) {
          return right(true);
        }
        for (const { validate, message } of validations) {
          if (!validate(value, validatorOption)) {
            return failed(value, message);
          }
        }
        return right(true);
      };
  }

  public validate(value: Input, option: Omit<Option, 'name' | 'displayName'>) {
    return this.create()(option)(value);
  }
}

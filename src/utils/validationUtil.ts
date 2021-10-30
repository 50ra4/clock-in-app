import { Either, right, left, isLeft, Left, fold } from 'fp-ts/Either';
import { VALIDATION_ERROR_MESSAGE } from 'constants/error';
import { EnumValue } from 'types';
import { ParamsToReplaceMessage, replaceMessage } from './messageUtil';

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

export const failed = (value: unknown, message: string): Either<ValidationError, true> =>
  left(new ValidationError(value, message));

export const isFailed = (result: Either<ValidationError, true>): result is Left<ValidationError> => isLeft(result);

export const toMessage = fold(
  (e: ValidationError) => e.message,
  (_: true) => '',
);

export type ValidatorOption = {
  required?: boolean;
};
type InvalidMessageConverter<Option extends ValidatorOption> = (
  params: Option & { name: string; displayName: string },
) => string;
type Validate<Input, Option extends ValidatorOption> = (value: Input, option: Option) => boolean;
type ValidateEither<Input, Option extends ValidatorOption> = (
  value: Input,
  option: Option,
) => Either<ValidationError, true>;
type Validation<Input, Option extends ValidatorOption> =
  | {
      validate: Validate<Input, Option>;
      toInvalidMessage: InvalidMessageConverter<Option>;
    }
  | {
      validate: ValidateEither<Input, Option>;
    };

export class ValidatorFactory<Input, Option extends ValidatorOption = ValidatorOption> {
  // TODO: is を追加する
  constructor(
    private readonly name: string, //
    private readonly displayName: string,
  ) {}

  private readonly skips: Validate<Input, Option>[] = [];
  private readonly validations: Validation<Input, Option>[] = [];

  public skip(isSkip: Validate<Input, Option>) {
    this.skips.push(isSkip);
    return this;
  }

  public add(isValid: ValidateEither<Input, Option>): this;
  public add(isValid: Validate<Input, Option>, toInvalidMessage: InvalidMessageConverter<Option>): this;
  public add(isValid: Validation<Input, Option>['validate'], toInvalidMessage?: InvalidMessageConverter<Option>) {
    const validation = toInvalidMessage ? { validate: isValid, toInvalidMessage } : { validate: isValid };
    this.validations.push(validation as Validation<Input, Option>);
    return this;
  }

  public create() {
    const skips = [...this.skips];
    const validations = [...this.validations];
    const { name, displayName } = this;
    return (option: Option) =>
      // eslint-disable-next-line complexity
      (value: Input): Either<ValidationError, true> => {
        if (skips.some((isSkip) => isSkip(value, option))) {
          return right(true);
        }
        for (const validation of validations) {
          if ('toInvalidMessage' in validation) {
            if (!validation.validate(value, option)) {
              return failed(value, validation.toInvalidMessage({ ...option, name, displayName }));
            }
          } else {
            const result = validation.validate(value, option);
            if (isLeft(result)) {
              return result;
            }
          }
        }
        return right(true);
      };
  }

  public validate(value: Input, option: Option) {
    return this.create()(option)(value);
  }
}

export const messageReplacer =
  <T extends string, P extends ParamsToReplaceMessage>(template: T) =>
  (params: P): string =>
    replaceMessage(template, params);

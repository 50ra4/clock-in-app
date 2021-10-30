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

export type ValidatorOption = {
  required?: boolean;
};
type Validate<Input, Option extends ValidatorOption> = (value: Input, option: Option) => boolean;
export class ValidatorFactory<Input, Option extends ValidatorOption = ValidatorOption> {
  constructor(
    private readonly name: string, //
    private readonly displayName: string,
  ) {}

  private readonly skips: Validate<Input, Option>[] = [];
  private readonly validations: {
    validate: Validate<Input, Option>;
    message: string;
  }[] = [];

  public skip(isSkip: Validate<Input, Option>) {
    this.skips.push(isSkip);
    return this;
  }

  public add(
    isValid: Validate<Input, Option>,
    toInvalidMessage: (params: { name: string; displayName: string }) => string,
  ) {
    const { name, displayName } = this;
    this.validations.push({ validate: isValid, message: toInvalidMessage({ name, displayName }) });
    return this;
  }

  public create() {
    const skips = [...this.skips];
    const validations = [...this.validations];
    return (option: Option) =>
      (value: Input): Either<ValidationError, true> => {
        if (skips.some((isSkip) => isSkip(value, option))) {
          return right(true);
        }
        for (const { validate, message } of validations) {
          if (!validate(value, option)) {
            return failed(value, message);
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

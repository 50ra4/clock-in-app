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

export type Validator<T> = (option: ValidationOption) => (value: T | undefined) => ValidationError | false;

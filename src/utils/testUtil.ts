import { ValidationOption, Validator } from './validationUtil';

export const createTestString = (length: number) =>
  Array.from({ length })
    .map(() => 'a')
    .join('');

export const createExpectForValidator = <T>(option: ValidationOption, validator: Validator<T>) => {
  return (value: T | undefined) => {
    const result = validator(option)(value);
    const message = !result ? false : result.message;

    return {
      toBe: (expected: string | false) => {
        expect(message).toBe(expected);
      },
      not: {
        toBe: (expected: string | false) => {
          expect(message).not.toBe(expected);
        },
      },
    };
  };
};

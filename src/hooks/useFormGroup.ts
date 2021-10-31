import { useCallback, useMemo, useState } from 'react';
import { ValidationResult, toValidationErrorMessage } from 'utils/validationUtil';

export type FormGroupChangeFn<T extends Record<string, unknown>> = (key: keyof T, value: T[keyof T]) => void;

export type FormGroupError<T extends Record<string, unknown>> = Partial<
  {
    [K in keyof T]: T[K] extends Array<unknown> ? string[] : string;
  }
>;

export type ValidationGroup<T extends Record<string, unknown>> = {
  [K in keyof T]: T[K] extends Array<infer R> ? (value: R) => ValidationResult : (value: T[K]) => ValidationResult;
};

export const useFormGroup = <T extends Record<string, unknown>>(initialState: T, validations: ValidationGroup<T>) => {
  const [state, setState] = useState({ ...initialState });

  const onChangeFormState = useCallback<FormGroupChangeFn<T>>((key, value) => {
    setState((prev) => ({ ...prev, [key]: value }));
  }, []);

  const formErrors = useMemo(() => {
    return Object.entries(validations).reduce((acc, cur) => {
      type K = keyof T;
      const [key, validation] = cur as [K, ValidationGroup<T>[K]];
      const value = state[key];
      if (Array.isArray(value)) {
        const results = value.map((v) => validation(v)).map(toValidationErrorMessage);
        return { ...acc, [key]: results };
      }
      const result = validation(value);
      return { ...acc, [key]: toValidationErrorMessage(result) || undefined };
    }, {} as FormGroupError<T>);
  }, [state, validations]);

  return { formState: state, onChangeFormState, formErrors };
};

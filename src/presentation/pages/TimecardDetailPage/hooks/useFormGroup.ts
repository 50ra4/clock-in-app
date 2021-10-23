import { useCallback, useMemo, useState } from 'react';
import { ValidationError } from 'utils/validationUtil';

export type FormGroupChangeFn<T extends Record<string, unknown>> = (key: keyof T, value: T[keyof T]) => void;

export type FormGroupError<T extends Record<string, unknown>> = Partial<
  {
    [K in keyof T]: T[K] extends Array<unknown> ? string[] : string;
  }
>;

export type ValidationGroup<T extends Record<string, unknown>> = {
  [K in keyof T]: T[K] extends Array<infer R>
    ? (value: R | undefined) => false | ValidationError
    : (value: T[K] | undefined) => false | ValidationError;
};

export const useFormGroup = <T extends Record<string, unknown>>(initialState: T, validations: ValidationGroup<T>) => {
  const [state, setState] = useState({ ...initialState });

  const onChangeFormState = useCallback<FormGroupChangeFn<T>>((key, value) => {
    setState((prev) => ({ ...prev, [key]: value }));
  }, []);

  const formErrors = useMemo(() => {
    return Object.entries(state).reduce((acc, cur) => {
      type K = keyof T;
      const [key, value] = cur as [K, T[K]];
      if (Array.isArray(value)) {
        const results = value.map((v) => validations[key](v)).map((r) => (r ? r.message : ''));
        return { ...acc, key: results };
      }
      const result = validations[key](value);
      return { ...acc, key: result ? result.message : undefined };
    }, {} as FormGroupError<T>);
  }, [state, validations]);

  return { formState: state, onChangeFormState, formErrors };
};

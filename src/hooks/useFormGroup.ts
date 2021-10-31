import { useCallback, useState } from 'react';
import { ValidationResult } from 'utils/validationUtil';

export type FormGroupChangeHandler<T extends Record<string, unknown>> = (key: keyof T, value: T[keyof T]) => void;
export type FormGroupError<T extends Record<string, unknown>> = Partial<
  {
    [K in keyof T]: T[K] extends Array<unknown> ? string[] : string;
  }
>;
export type FormGroupValidator<T extends Record<string, unknown>> = {
  [K in keyof T]: T[K] extends Array<infer R> ? (value: R) => ValidationResult : (value: T[K]) => ValidationResult;
};

export const useFormGroup = <T extends Record<string, unknown>>(initialState: T) => {
  const [state, setState] = useState({ ...initialState });

  const onChangeFormState = useCallback<FormGroupChangeHandler<T>>((key, value) => {
    setState((prev) => ({ ...prev, [key]: value }));
  }, []);

  return { formState: state, onChangeFormState };
};

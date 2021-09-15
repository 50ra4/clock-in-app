import { useCallback, useState } from 'react';

export type FormGroupChangeFn<T extends Record<string, unknown>> = (key: keyof T, value: T[keyof T]) => void;

export const useFormGroup = <T extends Record<string, unknown>>(initialState: T) => {
  const [state, setState] = useState({ ...initialState });

  const onChangeFormState = useCallback<FormGroupChangeFn<T>>((key, value) => {
    setState((prev) => ({ ...prev, [key]: value }));
  }, []);

  return { formState: state, onChangeFormState };
};

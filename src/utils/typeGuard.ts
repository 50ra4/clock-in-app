import { Nullable } from 'types';

export const isObject = (x: unknown): x is Record<string, unknown> => typeof x === 'object' && x !== null;
export const hasPropertiesInObject =
  <K extends string>(keys: K[]) =>
  (obj: Record<string, unknown>): obj is Record<K, unknown> =>
    keys.every((key) => key in obj);

export const isNonNullable = <T>(value: Nullable<T>): value is NonNullable<T> =>
  typeof value !== 'undefined' && value !== null;

export const isNullable = <T>(value: Nullable<T>): value is null | undefined =>
  typeof value === 'undefined' || value === null;

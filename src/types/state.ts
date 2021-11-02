import { FetchStatus } from './utils';

export type SingleEntityState<T> = {
  fetchStatus: FetchStatus;
  data: T;
  error?: Error;
  updatedAt?: string;
};

export type IndexedEntityState<T, K extends string = string> = Record<
  K,
  { data: T; error?: Error; updatedAt?: string } | undefined
>;

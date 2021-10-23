import { FetchStatus } from './utils';

export type SingleEntityState<T> = {
  fetchStatus: FetchStatus;
  data: T;
  error?: Error;
  updatedAt?: string;
};

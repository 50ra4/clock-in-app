export const FETCH_STATUS_ENUM = {
  idle: 'IDLE',
  loading: 'LOADING',
  reloading: 'RELOADING',
  success: 'SUCCESS',
  error: 'ERROR',
} as const;
export type FetchStatus = typeof FETCH_STATUS_ENUM[keyof typeof FETCH_STATUS_ENUM];

export type SingleEntityState<T, M extends Record<string, unknown> = Record<string, never>, E extends Error = Error> =
  | {
      status: typeof FETCH_STATUS_ENUM.idle | typeof FETCH_STATUS_ENUM.loading;
    }
  | {
      status: typeof FETCH_STATUS_ENUM.success;
      data: T;
      meta: M;
    }
  | {
      status: typeof FETCH_STATUS_ENUM.error;
      error: E;
      meta: M;
    };

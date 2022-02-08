export const FETCH_STATUS_ENUM = {
  idle: 'IDLE',
  loading: 'LOADING',
  reloading: 'RELOADING',
  success: 'SUCCESS',
  error: 'ERROR',
} as const;

export type ActionMeta<M extends Record<string, unknown> = Record<string, never>> = M;
export type ActionError<E extends Error = Error> = E;
export type StateIndexKey<K extends string | number | symbol = string> = K;

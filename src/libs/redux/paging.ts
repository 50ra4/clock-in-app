import { CollectionEntityState } from './collection';
import { ActionError, ActionMeta, StateIndexKey } from './common';

export const FETCH_STATUS_ENUM = {
  idle: 'IDLE',
  loading: 'LOADING',
  reloading: 'RELOADING',
  success: 'SUCCESS',
  error: 'ERROR',
} as const;
export type FetchStatus = typeof FETCH_STATUS_ENUM[keyof typeof FETCH_STATUS_ENUM];

export type PagingEntityState<T, K extends StateIndexKey, M extends ActionMeta, E extends ActionError> =
  | {
      status: typeof FETCH_STATUS_ENUM.idle | typeof FETCH_STATUS_ENUM.loading;
    }
  | {
      status: typeof FETCH_STATUS_ENUM.reloading | typeof FETCH_STATUS_ENUM.success;
      entities: CollectionEntityState<T, K, M, E>;
      keys: K[];
      meta: M;
    }
  | {
      status: typeof FETCH_STATUS_ENUM.error;
      error: E;
      meta: M;
    };

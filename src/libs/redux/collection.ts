import { ActionError, ActionMeta, StateIndexKey } from './common';

export const FETCH_STATUS = {
  success: 'SUCCESS',
  error: 'ERROR',
} as const;
export type CollectionEntityFetchStatus = typeof FETCH_STATUS[keyof typeof FETCH_STATUS];
export type CollectionEntityState<T, K extends StateIndexKey, M extends ActionMeta, E extends ActionError> = Partial<
  Record<
    K,
    | {
        status: 'SUCCESS';
        data: T;
        meta: M;
      }
    | {
        status: 'ERROR';
        error: E;
        meta: M;
      }
  >
>;

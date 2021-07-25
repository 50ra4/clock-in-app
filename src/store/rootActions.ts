import { Action } from '@reduxjs/toolkit';

export const ROOT_ACTIONS = {
  initializeState: '[root/initializeState]',
} as const;

export const initializeState = (): Action<typeof ROOT_ACTIONS.initializeState> => ({
  type: ROOT_ACTIONS.initializeState,
});

export type RootActions = ReturnType<typeof initializeState>;

import { EnumValue } from 'types';

export const PAGE_PATH = {
  top: '/',
  home: '/home',
  error: '/error',
  login: '/login',
  registration: '/registration',
  timecardDetail: '/timecards/:uid',
  userPreference: '/users/:uid/preference',
} as const;
export type PagePath = EnumValue<typeof PAGE_PATH>;

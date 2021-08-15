import { EnumValue } from 'types';

export const PAGE_PATH = {
  top: '/',
  error: '/error',
  login: '/login',
  registration: '/registration',
  timecardDetail: '/timecards/:uid',
} as const;
export type PagePath = EnumValue<typeof PAGE_PATH>;

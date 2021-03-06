export const FETCH_STATUS_ENUM = {
  initialized: 'INITIALIZED',
  fetching: 'FETCHING',
  fetched: 'FETCHED',
} as const;

export const LOGIN_STATUS_ENUM = {
  initialized: 'INITIALIZED',
  success: 'SUCCESS',
  failed: 'FAILED',
} as const;

export const DAY_OF_WEEK_ENUM = {
  sunday: 0,
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
} as const;

export const DAY_OF_WEEK_LABEL_JP_ENUM = {
  sunday: '日曜日',
  monday: '月曜日',
  tuesday: '火曜日',
  wednesday: '水曜日',
  thursday: '木曜日',
  friday: '金曜日',
  saturday: '土曜日',
} as const;

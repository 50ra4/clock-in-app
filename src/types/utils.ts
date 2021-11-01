import { DAY_OF_WEEK_ENUM, FETCH_STATUS_ENUM, LOGIN_STATUS_ENUM } from 'constants/enum';

export type NullOrUndefined = undefined | null;
export type Nullable<T> = T | NullOrUndefined;

export type EnumValue<O extends { [K: string]: string | number }> = O[keyof O];
export type FetchStatus = EnumValue<typeof FETCH_STATUS_ENUM>;
export type LoginStatus = EnumValue<typeof LOGIN_STATUS_ENUM>;
export type DayOfWeekCode = EnumValue<typeof DAY_OF_WEEK_ENUM>;
export type DayOfWeek = keyof typeof DAY_OF_WEEK_ENUM;

export type Range<T> = {
  start?: T;
  end?: T;
};
export type Lookup = {
  id: string;
  value: string;
};
export type Time = {
  hour?: number;
  minute?: number;
};

export type ErrorHeadingWithMessage = {
  heading: string;
  message: string;
};

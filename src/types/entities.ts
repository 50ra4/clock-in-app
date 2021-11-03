import { Time, LoginStatus, Range, DayOfWeekCode } from './utils';

export type RestTime = {
  id: string | undefined;
  start?: Time;
  end?: Time;
};

export type InHouseWork = {
  id: string | undefined;
  start?: Time;
  end?: Time;
  remarks?: string;
};

// FIXME: type name
export type DailyTimeRecord = {
  /** NOTE: date instead of id  */
  id?: string;
  date: string;
  start?: Time;
  end?: Time;
  inHouseWorks: InHouseWork[];
  restTimes: RestTime[];
  remarks: string;
  // TODO: holiday ...etc
};

export type User = {
  firstName: string;
  lastName: string;
};
export type Profile = User & {
  uid?: string;
  email: string | null;
  photoURL: string | null;
  displayName: string | null;
};
export type Authentication = {
  uid: string;
  loginStatus: LoginStatus;
  emailVerified: boolean;
};

export type TimecardUserPreference = {
  workingTimes: Range<Time>;
  roundDownMinute: number;
  restTimes: RestTime[];
  regularHolidays: DayOfWeekCode[];
};

import { FETCH_STATUS_ENUM, LOGIN_STATUS_ENUM } from 'constants/enum';

export type EnumValue<O extends { [K: string]: string }> = O[keyof O];

type FetchStatus = EnumValue<typeof FETCH_STATUS_ENUM>;
type LoginStatus = EnumValue<typeof LOGIN_STATUS_ENUM>;

export type SingleEntityState<T> = {
  fetchStatus: FetchStatus;
  data: T;
  error?: Error;
  updatedAt?: string;
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
  loginStatus: LoginStatus;
  emailVerified: boolean;
  uid: string;
};

export type Lookup = {
  id: string;
  value: string;
};

export type Time = {
  hour?: number;
  minute?: number;
};

export type Range<T> = {
  start?: T;
  end?: T;
};

export type ErrorHeadingWithMessage = {
  heading: string;
  message: string;
};

export type RestTime = Range<Time> & {
  id: string | undefined;
};

export type InHouseWork = Range<Time> & {
  id: string | undefined;
  remarks?: string;
};

export type DailyTimeRecord = {
  date: string;
  start?: Time;
  end?: Time;
  inHouseWorks: InHouseWork[];
  restTimes: RestTime[];
  remarks: string;
  // TODO: holiday ...etc
};

export type MonthlyTimeCard = {
  month: string;
  dailyRecords: DailyTimeRecord[];
};

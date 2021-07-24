import { FETCH_STATUS_ENUM, LOGIN_STATUS_ENUM } from 'constants/enum';

type EnumValue<O extends { [K: string]: string }> = O[keyof O];

type FetchStatus = EnumValue<typeof FETCH_STATUS_ENUM>;
type LoginStatus = EnumValue<typeof LOGIN_STATUS_ENUM>;

export type SingleEntityState<T> = {
  fetchStatus: FetchStatus;
  data: T;
  error?: Error;
  updatedAt?: string;
};

export type Profile = {
  uid?: string;
  email: string | null;
  photoURL: string | null;
  displayName: string | null;
  firstName: string;
  lastName: string;
};

export type Authentication = {
  loginStatus: LoginStatus;
  emailVerified: boolean;
};

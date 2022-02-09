import { DATE_FORMAT } from 'constants/dateFormat';
import { isValidDateString } from './dateUtil';

type Primitive = string | number | boolean | null | undefined;
type URLQueryObjectValue = Primitive | NonNullable<Primitive>[] | Set<NonNullable<Primitive>>;
export type URLQueryObject = Record<string, URLQueryObjectValue>;
export const stringifyURLQuery = <T extends URLQueryObject>(query: T) => {
  const params = new URLSearchParams();
  // eslint-disable-next-line complexity
  Object.entries(query).forEach(([key, value]) => {
    if (typeof value === 'undefined') return;
    if (value === null) return;
    if (value instanceof Array || value instanceof Set) {
      const values = value instanceof Array ? new Set(value) : value;
      if (values.size < 1) return;
      return params.append(key, Array.from(values.values()).join(','));
    }
    return params.append(key, value.toString());
  });
  return params.toString();
};

export const getMonthStringOrElse = (key: string, onNone: () => string) => (params: URLSearchParams) => {
  const value = params.get(key);
  return value && isValidDateString(value, DATE_FORMAT.yearMonthISO) ? value : onNone();
};

export const getGenericsOrElse =
  <T>(key: string, onNone: () => T, is: (x: unknown) => x is T) =>
  (params: URLSearchParams) => {
    const value = params.get(key);
    return is(value) ? value : onNone();
  };

export const createURLQueryParser =
  <T extends Record<string, (params: URLSearchParams) => URLQueryObjectValue>>(obj: T) =>
  (queryString: string) => {
    const params = new URLSearchParams(queryString);
    return Object.entries(obj).reduce(
      (acc, [key, converter]) => ({
        ...acc,
        [key]: converter(params),
      }),
      {} as { [K in keyof T]: ReturnType<T[K]> },
    );
  };

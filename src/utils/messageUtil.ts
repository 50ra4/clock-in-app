const toPairs = <T extends Record<string, unknown>, K extends keyof T = keyof T>(obj: T): ReadonlyArray<[K, T[K]]> =>
  Object.entries(obj) as [K, T[K]][];

type Primitive = string | number | boolean | string[] | number[] | undefined;

export type ParamsToReplaceMessage = Record<string | number, Primitive>;

const toString = (x: Primitive): string => {
  if (typeof x === 'undefined') {
    return 'undefined';
  }
  if (Array.isArray(x)) {
    return x.join(',').toString();
  }
  return typeof x === 'string' ? x : x.toString();
};

export const replaceMessage = (
  template: string,
  replaceParams: ParamsToReplaceMessage,
  replaceKey: string = '%',
): string =>
  toPairs(replaceParams).reduce(
    (acc, [key, value]) => acc.replace(`${replaceKey}${key}${replaceKey}`, toString(value)),
    template,
  );

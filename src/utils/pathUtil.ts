export const replacePathParams = <Path extends string, T extends Record<string, string>>(
  path: Path,
  pathParams: T,
): string =>
  Object.entries(pathParams).reduce((pre, [key, value]) => {
    const regex = new RegExp(`/:${key}`);
    return pre.replace(regex, `/${value}`);
  }, path.toString());

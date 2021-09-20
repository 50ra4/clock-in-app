export const replacePathParams = <T extends Record<string, string>>(path: string, pathParams: T): string =>
  Object.entries(pathParams).reduce((pre, [key, value]) => {
    const regex = new RegExp(`/:${key}`);
    return pre.replace(regex, `/${value}`);
  }, path.toString());

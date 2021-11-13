export const createId = (prefix?: string): string => `${prefix ?? ''}${Date.now() * Math.random()}`;

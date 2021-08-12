export const matchClassNames = <ClassName extends string>(conditions: [ClassName, () => boolean][]): ClassName[] =>
  conditions.filter(([className, fn]) => fn() && !!className).map(([className]) => className);

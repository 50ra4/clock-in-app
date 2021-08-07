export const matchClassNames = <ClassName extends string>(conditions: [ClassName, () => boolean][]): ClassName[] =>
  conditions.filter(([_, fn]) => fn()).map(([className]) => className);

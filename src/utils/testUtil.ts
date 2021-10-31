export const createTestString = (length: number) =>
  Array.from({ length })
    .map(() => 'a')
    .join('');

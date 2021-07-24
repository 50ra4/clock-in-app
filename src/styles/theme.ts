const fontFamilies = [
  'Hiragino Kaku Gothic ProN',
  'Hiragino Sans',
  'Helvetica Neue',
  'Arial',
  'Meiryo',
  'sans-serif',
].join(',');

const fontWeight = {
  bold: 'bold',
  normal: 400,
} as const;

const fontColorPalette = {
  white: '#fafafa',
  black: '#212121',
  darkGray: '#545454',
  gray: '#808080',
  lightGray: '#afafaf',
} as const;

const fontColor = {
  main: fontColorPalette.black,
} as const;

const fontTheme = {
  family: fontFamilies,
  weight: fontWeight,
  color: fontColor,
} as const;

export const lightTheme = {
  font: fontTheme,
} as const;
type LightTheme = typeof lightTheme;

type IndexedObjectType<T = unknown> = { [key: string]: T };
type NestedIndexedObject<T extends IndexedObjectType> = {
  [K in keyof T]: T[K] extends IndexedObjectType
    ? NestedIndexedObject<T[K]>
    : T[K] | string | number | string[] | number[];
};
const _darkTheme: NestedIndexedObject<LightTheme> = {
  ...lightTheme,
  font: {
    ...lightTheme.font,
    color: {
      ...lightTheme.font.color,
      main: fontColorPalette.white,
    },
  },
};
// FIXME: type
export const darkTheme = _darkTheme as LightTheme;

export type StyledComponentsTheme = LightTheme;

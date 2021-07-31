import { Keyframes, keyframes } from 'styled-components';

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
  red: '#c62828',
} as const;

const fontSize = {
  small: 14,
  middle: 16,
  large: 18,
  extraLarge: 24,
} as const;

const colorPalette = {
  black: {
    light: '#4e5b50',
    main: '#263228',
    dark: '#000b00',
  },
  white: {
    light: '#ffffff',
    main: '#fafafa',
    dark: '#c7c7c7',
  },
  gray: {
    light: '#828d86',
    main: '#556059',
    dark: '#2c3630',
  },
  darkGray: {
    light: '#62727b',
    main: '#37474f',
    dark: '#102027',
  },
  brown: {
    light: '#7b7266',
    main: '#4f473c',
    dark: '#262016',
  },
  blue: {
    light: '#5472d3',
    main: '#0d47a1',
    dark: '#002171',
  },
  purple: {
    light: '#9c4dcc',
    main: '#6a1b9a',
    dark: '#38006b',
  },
  orange: {
    light: '#ff7d47',
    main: '#e64a19',
    dark: '#ac0800',
  },
  red: {
    light: '#ff5f52',
    main: '#c62828',
    dark: '#8e0000',
  },
  lightPick: {
    light: '#ffeeff',
    main: '#f8bbd0',
    dark: '#c48b9f',
  },
  pink: {
    light: '#ff5c8d',
    main: '#d81b60',
    dark: '#a00037',
  },
  green: {
    light: '#60ac5d',
    main: '#2e7c31',
    dark: '#004f04',
  },
  yellow: {
    light: '#ffff6b',
    main: '#fdd835',
    dark: '#c6a700',
  },
} as const;

const bgColorPalette = {
  default: {
    font: fontColorPalette.white,
    background: colorPalette.gray.light,
  },
  main: {
    font: fontColorPalette.black,
    background: colorPalette.white.main,
  },
  primary: {
    font: fontColorPalette.white,
    background: colorPalette.black.main,
  },
  secondary: {
    font: fontColorPalette.black,
    background: colorPalette.yellow.dark,
  },
  tertiary: {
    font: fontColorPalette.white,
    background: colorPalette.orange.dark,
  },
  quaternary: {
    font: fontColorPalette.black,
    background: colorPalette.lightPick.main,
  },
  positive: {
    font: fontColorPalette.white,
    background: colorPalette.black.main,
  },
  negative: {
    font: fontColorPalette.white,
    background: colorPalette.darkGray.light,
  },
} as const;
export type ColorPalette = keyof typeof bgColorPalette;

const snackbarTheme = {
  success: {
    font: fontColorPalette.white,
    background: colorPalette.blue.main,
  },
  error: {
    font: fontColorPalette.white,
    background: colorPalette.red.main,
  },
  warning: {
    font: fontColorPalette.black,
    background: colorPalette.yellow.main,
  },
  info: {
    font: fontColorPalette.white,
    background: colorPalette.green.main,
  },
} as const;

const borderColor = {
  light: colorPalette.white.dark,
  main: colorPalette.gray.light,
  dark: colorPalette.gray.main,
} as const;

const iconSize = {
  small: 18,
  medium: 24,
  large: 36,
  extraLarge: 72,
} as const;
export type IconSize = keyof typeof iconSize;

const rotation = keyframes`
  from { 
    transform:rotate(0);
  }
  to {
    transform:rotate(360deg); 
  }
`;

export const lightTheme = {
  breakpoint: {
    small: 576,
  },
  space: {
    small: 2,
    middle: 4,
    large: 8,
  },
  icon: {
    size: iconSize,
  },
  color: {
    palette: bgColorPalette,
    font: fontColorPalette,
    snackbar: snackbarTheme,
    border: borderColor,
  },
  font: {
    family: fontFamilies,
    weight: fontWeight,
    size: fontSize,
  },
  keyframes: {
    rotation,
  },
} as const;
type LightTheme = typeof lightTheme;

type IndexedObjectType<T = unknown> = { [key: string]: T };
type FunctionType<P extends unknown[] = [], R = void> = (...args: P) => R;
type NestedIndexedObject<T extends IndexedObjectType> = {
  [K in keyof T]: T[K] extends IndexedObjectType
    ? NestedIndexedObject<T[K]>
    : T[K] extends string
    ? string
    : T[K] extends number
    ? number
    : T[K] extends Keyframes
    ? Keyframes
    : T[K] extends FunctionType
    ? T[K]
    : never;
};

const _darkTheme: NestedIndexedObject<LightTheme> = {
  ...lightTheme,
  color: {
    ...lightTheme.color,
    palette: {
      ...lightTheme.color.palette,
      main: {
        ...lightTheme.color.palette.main,
        font: fontColorPalette.white,
        background: colorPalette.darkGray.main,
      },
    },
  },
};
// FIXME: type
export const darkTheme = _darkTheme as LightTheme;

export type StyledComponentsTheme = LightTheme;

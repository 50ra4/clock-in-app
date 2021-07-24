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
};

const fontColorPalette = {
  white: '#fafafa',
  black: '#212121',
  darkGray: '#545454',
  gray: '#808080',
  lightGray: '#afafaf',
};

const fontColor = {
  main: fontColorPalette.black,
};

const fontTheme = {
  family: fontFamilies,
  weight: fontWeight,
  color: fontColor,
};

export const lightTheme = {
  font: fontTheme,
};

export type StyledComponentsTheme = typeof lightTheme;

export const darkTheme = {
  ...lightTheme,
  font: {
    ...lightTheme.font,
    color: {
      ...lightTheme.font.color,
      main: fontColorPalette.white,
    },
  },
};

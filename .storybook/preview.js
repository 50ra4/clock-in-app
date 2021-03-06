import { ThemeProvider } from 'styled-components';
import { lightTheme } from '../src/presentation/styles/theme';
import { GlobalStyle } from '../src/presentation/styles/global';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

const withThemeProvider = (Story, context) => {
  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyle theme={lightTheme} />
      <Story {...context} />
    </ThemeProvider>
  );
};
export const decorators = [withThemeProvider];

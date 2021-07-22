import 'styled-components';
import { StyledComponentsTheme } from 'presentation/styles/theme';

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends StyledComponentsTheme {}
}

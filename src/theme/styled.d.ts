import 'styled-components';
import { ICustomTheme } from './custom/theme';

declare module 'styled-components' {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    export interface DefaultTheme extends ICustomTheme {}
}

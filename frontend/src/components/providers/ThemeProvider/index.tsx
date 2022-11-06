import { ReactNode } from 'react';

import { ThemeProvider as MuiThemeProvider } from '@mui/material';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

import { customTheme, GlobalStyles } from 'theme';
import {} from 'theme/base/CSSBaseline';
import { muiTheme } from 'theme/custom';

interface IThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider = ({
    children,
}: IThemeProviderProps): JSX.Element => {
    return (
        <StyledThemeProvider theme={customTheme}>
            <MuiThemeProvider theme={muiTheme}>
                <GlobalStyles />
                {children}{' '}
            </MuiThemeProvider>
        </StyledThemeProvider>
    );
};

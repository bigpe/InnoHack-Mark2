import { ReactNode } from 'react';

import { SnackbarProvider } from 'notistack';

import { QueryProvider } from '../QueryProvider';
import { ThemeProvider } from '../ThemeProvider';

interface IRootProviderProps {
    children: ReactNode;
}

export const RootProvider = ({ children }: IRootProviderProps): JSX.Element => {
    return (
        <QueryProvider>
            <ThemeProvider>
                <SnackbarProvider
                    maxSnack={3}
                    anchorOrigin={{
                        horizontal: 'center',
                        vertical: 'bottom',
                    }}
                    hideIconVariant
                    preventDuplicate
                >
                    {children}
                </SnackbarProvider>
            </ThemeProvider>
        </QueryProvider>
    );
};

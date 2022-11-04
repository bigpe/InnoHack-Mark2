import { ReactNode } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

interface IQueryProviderProps {
    children: ReactNode;
}
const queryClient = new QueryClient();

export const QueryProvider = ({
    children,
}: IQueryProviderProps): JSX.Element => {
    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />
            {children}
        </QueryClientProvider>
    );
};

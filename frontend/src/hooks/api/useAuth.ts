import { useState } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';

import { AuthServices } from 'services';
import { CheckAuth, Credentials } from 'types/api/auth';

interface useSignInReturn {
    signIn: (data: Credentials) => void;
    isLoading: boolean;
    success: boolean;
}

export const useSignIn = (): useSignInReturn => {
    const queryClient = useQueryClient();
    const { enqueueSnackbar } = useSnackbar();

    const [success, setSuccess] = useState(false);

    const { mutate, isLoading } = useMutation(AuthServices.signIn, {
        onSuccess: (data) => {
            setSuccess(true);
            enqueueSnackbar(`Добро пожаловать, ${data.username}!`, {
                variant: 'success',
                key: 'sign-in-success',
            });
        },
        onError: () => {
            enqueueSnackbar('Не удалось войти', {
                variant: 'error',
                key: 'sign-in-error',
            });
        },

        onSettled: () => {
            queryClient.refetchQueries();
        },
    });

    const signIn = (data: Credentials): void => {
        const user = {
            ...data,
        };
        mutate(user);
    };

    return { signIn, isLoading, success };
};

export const useIsAuthenticated = (): CheckAuth & { isLoading: boolean } => {
    const [authenticated, setAuthenticated] = useState(false);
    const { isLoading } = useQuery(
        ['checkAuth'],
        () => AuthServices.checkAuth(),
        {
            onSuccess: (data) => {
                if (data.status === 202) {
                    setAuthenticated(true);
                }
            },
        }
    );

    return { authenticated, isLoading };
};

export const useSignOut = (): {
    isLoading: boolean;
    isSuccess: boolean;
    refetch: () => void;
} => {
    const { refetch, isLoading, isSuccess } = useQuery(
        ['signOut'],
        () => AuthServices.signOut(),
        {
            enabled: false,
            refetchOnWindowFocus: false,
        }
    );

    return { isLoading, isSuccess, refetch };
};

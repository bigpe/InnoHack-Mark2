import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';

import { CollectionServices } from 'services';
import { NewCollection } from 'types/api/collectionType';

interface useAddCollectionProps {
    loadCollection: (data: NewCollection) => void;
    isLoading: boolean;
}

export const useAddCollection = (): useAddCollectionProps => {
    const queryClient = useQueryClient();
    const { enqueueSnackbar } = useSnackbar();

    const { mutate, isLoading } = useMutation(
        CollectionServices.postCollection,
        {
            onSuccess: () => {
                enqueueSnackbar(`Коллекция добавлена`, {
                    variant: 'success',
                    key: 'file-load-success',
                });
            },
            onError: () => {
                enqueueSnackbar('Не удалось добавить коллекцию', {
                    variant: 'error',
                    key: 'file-load-error',
                });
            },
            onSettled: () => {
                queryClient.refetchQueries();
            },
        }
    );

    const loadCollection = (data: NewCollection): void => {
        const collection = {
            ...data,
        };
        mutate(collection);
    };

    return { loadCollection, isLoading };
};

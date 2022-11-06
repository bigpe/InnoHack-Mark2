import { useQuery } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';

import { CollectionServices } from 'services';

import { CollectionType } from '../../types/api/collectionType';

interface IUseCollectionTypesListReturn {
    collectionsType?: CollectionType[];
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
}

export const useCollectionTypesList = (): IUseCollectionTypesListReturn => {
    const { enqueueSnackbar } = useSnackbar();

    const {
        data: collectionsType,
        isLoading,
        isError,
        isSuccess,
    } = useQuery(
        ['collectionsTypes'],
        () => CollectionServices.getCollectionTypes(),
        {
            onSuccess: () =>
                enqueueSnackbar('Коллекции загружены', {
                    variant: 'success',
                    key: 'collections-loaded',
                }),
            onError: () =>
                enqueueSnackbar(
                    'Не удалось загрузить коллекции, пожалуйста попробуйте позже',
                    {
                        variant: 'error',
                        key: 'collections-error',
                    }
                ),
        }
    );

    return { collectionsType, isLoading, isError, isSuccess };
};

import { useQuery } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';

import { CollectionServices } from 'services';

import { Collection } from '../../types/api/collection';

interface IUseCollectionListReturn {
    collections?: Collection[];
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
}

export const useCollectionList = (): IUseCollectionListReturn => {
    const { enqueueSnackbar } = useSnackbar();

    const {
        data: collections,
        isLoading,
        isError,
        isSuccess,
    } = useQuery(['collections'], () => CollectionServices.getCountryList(), {
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
    });

    return { collections, isLoading, isError, isSuccess };
};

import { useQuery } from '@tanstack/react-query';

import { CollectionServices } from '../../services/index';
import { Collection } from '../../types/api/collection';

interface IUseCollectionListReturn {
    collection?: Collection;
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
}

export const useCollectionList = (id: string): IUseCollectionListReturn => {
    const {
        data: collection,
        isLoading,
        isError,
        isSuccess,
    } = useQuery(['collections', id], () => CollectionServices.getCountry(id), {
        enabled: !!id,
    });

    return { collection, isLoading, isError, isSuccess };
};

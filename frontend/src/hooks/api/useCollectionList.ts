import { useQuery } from '@tanstack/react-query';

import { CollectionServices } from '../../services/index';
import { CollectionItemList } from '../../types/api/collectionType';

interface IUseCollectionsListReturn {
    collections?: CollectionItemList[];
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
}

export const useCollectionsList = (id: string): IUseCollectionsListReturn => {
    const {
        data: collections,
        isLoading,
        isError,
        isSuccess,
    } = useQuery(
        ['collections', id],
        () => CollectionServices.getCollectionsList(id),
        {
            enabled: !!id,
        }
    );

    return { collections, isLoading, isError, isSuccess };
};

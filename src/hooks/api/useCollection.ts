import { useQuery } from '@tanstack/react-query';

import { CollectionServices } from '../../services/index';
import { CollectionItemList } from '../../types/api/collectionType';

interface IUseCollectionListReturn {
    collection?: CollectionItemList;
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
    } = useQuery(
        ['collections', id],
        () => CollectionServices.getCollectionList(id),
        {
            enabled: !!id,
        }
    );

    return { collection, isLoading, isError, isSuccess };
};

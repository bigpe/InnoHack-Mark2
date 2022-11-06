import Grid2 from '@mui/material/Unstable_Grid2';
import { useParams } from 'react-router-dom';

import { CollectionCard } from 'components/organisms/CollectionCard';
import { useCollectionsList } from 'hooks/api/useCollectionList';

export const CollectionPage = (): JSX.Element => {
    const params = useParams();

    const { collections, isLoading, isSuccess } = useCollectionsList(
        params?.id || '1'
    );

    console.log(collections);

    return (
        <Grid2
            container
            className="tab-container"
            spacing={4}
            sx={{ mt: 2, flexGrow: 1, maxWidth: '1366px', margin: '0 auto' }}
        >
            {isSuccess
                ? collections?.map((item) => (
                      <CollectionCard key={item.id} id={item.id} />
                  ))
                : undefined}
        </Grid2>
    );
};

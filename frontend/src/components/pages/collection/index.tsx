import { Container } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { useParams } from 'react-router-dom';

import { CollectionCard } from 'components/organisms/CollectionCard';
import { useCollectionsList } from 'hooks/api/useCollectionList';

export const CollectionPage = (): JSX.Element => {
    const params = useParams();

    const { collections, isLoading, isSuccess } = useCollectionsList(
        params?.id || '1'
    );

    return (
        <Grid2
            container
            className="tab-container"
            spacing={4}
            sx={{ mt: 2, flexGrow: 1 }}
        >
            {isSuccess
                ? collections?.map((item) => <CollectionCard id={item.id} />)
                : undefined}
        </Grid2>
    );
};

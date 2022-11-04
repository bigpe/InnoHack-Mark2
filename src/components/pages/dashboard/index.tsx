import React, { useEffect } from 'react';

import { Container, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { Typography } from 'components/atoms/Typography';
import { BasicTabs } from 'components/organisms/BasicTabs';
import {
    CardSkeleton,
    CollectionCard,
} from 'components/organisms/CollectionCard';
import { Uploader } from 'components/organisms/Uploader';
import { useCollectionList } from 'hooks/api/useCollectionList';

import { DashboardWrapper } from './Dashboard.styled';

export const Dashboard = (): JSX.Element => {
    const { collections, isLoading, isSuccess, isError } = useCollectionList();

    const tabs = [
        {
            label: 'Коллекции',
            Component: collections?.map(
                (item) =>
                    item.id < 10 && <CollectionCard key={item.id} {...item} />
            ),
        },
        {
            label: 'Генерации',
            Component: collections?.map(
                (item) =>
                    item.id > 10 &&
                    item.id < 30 && <CollectionCard key={item.id} {...item} />
            ),
        },
        {
            label: 'Добавить исследование',
            Component: <Uploader />,
        },
    ];

    const navigate = useNavigate();

    const authenthicated = true;

    useEffect(() => {
        if (!authenthicated) {
            navigate('/sign-in', { replace: true });
        }
    }, [authenthicated, navigate]);

    return (
        <DashboardWrapper>
            <Container sx={{ height: '100%' }} maxWidth="xl">
                {isLoading && collections?.length !== 0 ? (
                    <CardSkeleton count={collections?.length} />
                ) : undefined}

                {isSuccess && <BasicTabs tabs={tabs} />}

                {isError && collections?.length !== 0 ? (
                    <Box sx={{ p: 3 }}>
                        <Typography>
                            При попытке получить данные рабочего пространства
                            произошла ошибка
                        </Typography>
                    </Box>
                ) : undefined}
            </Container>
        </DashboardWrapper>
    );
};

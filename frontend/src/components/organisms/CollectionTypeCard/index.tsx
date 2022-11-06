import { useState, MouseEvent } from 'react';

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Skeleton,
    Stack,
    MenuItem,
    Menu,
} from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Link } from 'react-router-dom';

import image1 from 'assets/images/preview1.png';
import image2 from 'assets/images/preview2.png';
import image3 from 'assets/images/preview3.png';
import { Typography } from 'components/atoms/Typography';
import { CollectionItemList, CollectionType } from 'types/api/collectionType';

import { CardLabel, ImagesStack } from './CollectionTypeCard.styled';

export const CardSkeleton = ({
    count = 6,
}: {
    count?: number;
}): JSX.Element => {
    return (
        <Grid2
            container
            spacing={4}
            sx={{ mt: 2, flexGrow: 1 }}
            role="tabpanel"
        >
            {Array.from({ length: count }).map((_, i) => (
                <Grid
                    key={`${i}_skelet`}
                    xs={12}
                    xsOffset={0}
                    md={4}
                    mdOffset={0.1}
                >
                    <Skeleton
                        animation="wave"
                        sx={{ transform: 'scale(1)' }}
                        height="300px"
                    />
                </Grid>
            ))}
        </Grid2>
    );
};

const images = [
    {
        id: 1,
        src: image1,
    },
    {
        id: 2,
        src: image2,
    },
    {
        id: 3,
        src: image3,
    },
];

const BorderLinearProgress = styled(LinearProgress)(() => ({
    height: 5,
    borderRadius: 5,
}));

export const CollectionTypeCard = (props: CollectionType): JSX.Element => {
    const { name, id, color, marked_snapshot_count, snapshot_count } = props;

    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: MouseEvent<HTMLElement>): void => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = (): void => {
        setAnchorElUser(null);
    };

    return (
        <Grid xs={12} md={5}>
            <CardLabel style={{ backgroundColor: color }}>
                <Typography>{name}</Typography>
            </CardLabel>
            <Card
                sx={{
                    border: '1px solid rgba(177, 180, 185, 0.2)',
                    borderRadius: 4,
                    boxShadow: 0,
                    borderTopLeftRadius: 0,
                    padding: '30px',
                }}
            >
                <CardContent sx={{ minHeight: '220px', display: 'flex', p: 0 }}>
                    <ImagesStack>
                        {images.map((image, idx) => (
                            <img
                                key={image.id}
                                src={image.src}
                                alt="preview"
                                style={{
                                    top: `${idx * 15}px`,
                                    right: `${idx * 15 + 45}px`,
                                }}
                            />
                        ))}
                    </ImagesStack>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-around',
                            width: '100%',
                        }}
                    >
                        <Stack
                            direction="row"
                            spacing={1}
                            alignItems="center"
                            justifyContent="space-between"
                        >
                            <Chip
                                label={`${snapshot_count} collections`}
                                color="primary"
                                sx={{ fontSize: '14px' }}
                            />
                            <Button
                                size="small"
                                variant="text"
                                onClick={handleOpenUserMenu}
                            >
                                <MoreHorizIcon />
                            </Button>
                            <Menu
                                sx={{ mt: '35px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <MenuItem onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">
                                        Переименовать
                                    </Typography>
                                </MenuItem>
                                <MenuItem onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">
                                        Удалить
                                    </Typography>
                                </MenuItem>
                            </Menu>
                        </Stack>
                        <Stack
                            direction="row"
                            spacing={1}
                            alignItems="center"
                            justifyContent="space-between"
                        >
                            <Typography
                                style={{
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    display: '-webkit-box',
                                    WebkitLineClamp: '1',
                                    WebkitBoxOrient: 'vertical',
                                }}
                            >
                                {name}
                            </Typography>
                        </Stack>
                        <Stack
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Typography>
                                {marked_snapshot_count === 0 &&
                                snapshot_count === 0
                                    ? '0'
                                    : (marked_snapshot_count / snapshot_count) *
                                      100}
                                %
                            </Typography>
                            <Typography>100%</Typography>
                        </Stack>
                        <BorderLinearProgress
                            variant="determinate"
                            value={
                                (marked_snapshot_count / snapshot_count) * 100
                            }
                        />
                        <Link
                            to={`collection/${id}`}
                            style={{
                                width: '100%',
                                backgroundColor: '#5563DA',
                                borderRadius: '8px',
                                textAlign: 'center',
                                color: '#fff',
                                padding: '10px 12px',
                            }}
                        >
                            Перейти
                        </Link>
                    </Box>
                </CardContent>
            </Card>
        </Grid>
    );
};

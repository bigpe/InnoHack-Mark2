import React from 'react';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
    AppBar,
    Box,
    Button,
    CircularProgress,
    Container,
    Menu,
    MenuItem,
    Toolbar,
} from '@mui/material';
import { Link } from 'react-router-dom';

import { Typography } from 'components/atoms/Typography';
import { useSignOut } from 'hooks/api/useAuth';

export const Header = (): JSX.Element => {
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
        null
    );

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>): void => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = (): void => {
        setAnchorElUser(null);
    };

    const { isLoading, refetch } = useSignOut();

    return (
        <AppBar
            position="relative"
            sx={{ background: '#000', height: '40px', boxShadow: 'none' }}
        >
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{ minHeight: '40px !important' }}>
                    <Box
                        sx={{
                            flexGrow: 1,
                        }}
                    >
                        <Typography
                            variant="body.medium"
                            style={{
                                marginRight: 2,
                                display: 'flex',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            <Link to="/dashboard">MARK II</Link>
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            flexGrow: 0,
                            marginRight: 1,
                        }}
                    >
                        <Button
                            variant="text"
                            sx={{
                                color: 'white',
                            }}
                            onClick={handleOpenUserMenu}
                            endIcon={<ExpandMoreIcon />}
                        >
                            Сергеев А.С.
                        </Button>
                        <Menu
                            sx={{ mt: '25px' }}
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
                            <MenuItem
                                onClick={() => {
                                    refetch();
                                    handleCloseUserMenu();
                                }}
                            >
                                <Typography textAlign="center">
                                    Выйти
                                </Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

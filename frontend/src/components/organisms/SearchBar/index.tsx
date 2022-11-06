import React from 'react';

import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, Container, Divider, Menu, MenuItem } from '@mui/material';
import InputBase from '@mui/material/InputBase';
import { styled, useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';

import { Typography } from 'components/atoms/Typography';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.common.white,
    '&:hover': {
        backgroundColor: theme.palette.common.white,
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 1),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    'svg path': {
        stroke: 'rgba(4, 56, 67, 0.3)',
        opacity: 0.2,
    },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(0.5, 0.5, 0.5, 0.1),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(2.5)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        '::placeholder': {
            color: 'rgba(4, 56, 67, 0.3)',
            opacity: 1,
        },
        [theme.breakpoints.up('sm')]: {
            width: '22ch',
            '&:focus': {
                width: '26ch',
            },
        },
    },
}));

export const SearchAppBar = (): JSX.Element => {
    const theme = useTheme();

    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
        null
    );

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>): void => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = (): void => {
        setAnchorElUser(null);
    };
    return (
        <Box bgcolor={theme.palette.primary.main}>
            <Container maxWidth="xl" disableGutters>
                <Toolbar sx={{ minHeight: '50px !important' }}>
                    <Box sx={{ flexGrow: 1, display: 'flex', ml: -1.7 }}>
                        <Button
                            variant="text"
                            sx={{ color: '#fff' }}
                            onClick={handleOpenUserMenu}
                        >
                            Файл
                        </Button>

                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-searchbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem>
                                <Typography textAlign="center">
                                    Сохранить
                                </Typography>
                            </MenuItem>
                            <MenuItem>
                                <Typography textAlign="center">
                                    Экпортировать
                                </Typography>
                            </MenuItem>
                            <Divider />
                            <MenuItem>
                                <Typography textAlign="center">
                                    Выйти
                                </Typography>
                            </MenuItem>
                        </Menu>

                        <Button
                            variant="text"
                            sx={{ color: '#fff' }}
                            onClick={handleOpenUserMenu}
                        >
                            Помощь
                        </Button>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-searchbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem>
                                <Typography textAlign="center">
                                    Загрузка DICOM
                                </Typography>
                            </MenuItem>
                            <MenuItem>
                                <Typography textAlign="center">
                                    Генерация
                                </Typography>
                            </MenuItem>
                            <Divider />
                            <MenuItem>
                                <Typography textAlign="center">
                                    Разметка
                                </Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                    <Box>
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Введите запрос"
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search>
                    </Box>
                </Toolbar>
            </Container>
        </Box>
    );
};

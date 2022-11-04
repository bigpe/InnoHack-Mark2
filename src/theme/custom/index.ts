import { createTheme } from '@mui/material';
import { DefaultTheme } from 'styled-components';

import { themeBorderRadius } from './themeBorderRadius';
import { themePalette } from './themePalette';
import { themeTypography } from './themeTypography';

export const customTheme: DefaultTheme = {
    borderRadius: themeBorderRadius,
    palette: themePalette,
    typography: themeTypography,
};

export const muiTheme = createTheme({
    palette: {
        primary: {
            main: customTheme.palette.accent,
        },
        secondary: {
            main: customTheme.palette.green.alpha,
        },
        info: {
            main: customTheme.palette.green.gamma,
        },
        common: {
            black: customTheme.palette.common.black,
            white: customTheme.palette.common.white,
        },
        text: {
            secondary: customTheme.palette.grey.inactive,
        },
    },
    typography: {
        fontFamily: 'SF Pro Display, Helvetica, sans-serif',
    },
    components: {
        MuiAutocomplete: {
            styleOverrides: {
                root: () => ({
                    '.MuiAutocomplete-popper': {
                        background: 'red',
                    },
                }),
            },
        },
        MuiTab: {
            defaultProps: {
                disableRipple: true,
            },
            styleOverrides: {
                root: ({ theme }) => ({
                    textTransform: 'none',
                    '&:hover': {
                        color: theme.palette.primary.main,
                    },
                    '&.Mui-selected': {
                        color: theme.palette.common.black,
                    },
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        height: '2px',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        backgroundColor: customTheme.palette.grey.bg1,
                    },
                    '.MuiTabs-indicator': {
                        height: '2px',
                        borderRadius: '1px',
                    },
                }),
            },
        },
        MuiButton: {
            defaultProps: {
                variant: 'contained',
            },
            styleOverrides: {
                root: {
                    boxShadow: 'none !important',
                    textTransform: 'none',
                    borderRadius: '8px',
                    fontSize: 14,
                    fontFamily: 'SF Pro Display, Helvetica, sans-serif',
                },
            },
        },
        MuiFilledInput: {
            styleOverrides: {
                root: ({ theme }) => ({
                    '&:after, &:before': {
                        display: 'none',
                    },
                    '&.Mui-focused': {
                        backgroundColor: theme.palette.common.white,
                    },
                    '&:hover:not(.Mui-focused)': {
                        backgroundColor: customTheme.palette.glass.green,
                    },
                    '&.Mui-error': {
                        boxShadow: `0 0 0 1px ${theme.palette.error.main}`,
                    },
                    backgroundColor: theme.palette.common.white,
                    borderRadius: '8px !important',
                }),
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: ({ ownerState }) => {
                    if (ownerState.variant === 'standard') {
                        return {
                            '.MuiInputBase-adornedStart': {
                                '&:before, &:after': {
                                    left: '32px',
                                },
                            },
                            '.MuiIconButton-root': {
                                marginBottom: '12px',
                            },
                        };
                    }
                    return undefined;
                },
            },
        },
        MuiTooltip: {
            styleOverrides: {
                arrow: ({ theme }) => ({
                    color: theme.palette.info.main,
                }),
                tooltip: ({ theme }) => ({
                    backgroundColor: theme.palette.info.main,
                    color: theme.palette.common.black,
                    fontSize: 12,
                }),
            },
        },
        MuiSwitch: {
            styleOverrides: {
                root: {
                    width: 48,
                    height: 24,
                    padding: 0,
                },
                switchBase: ({ theme }) => ({
                    padding: 0,
                    margin: 2,
                    transitionDuration: '300ms',
                    '&.Mui-checked': {
                        transform: 'translateX(24px)',
                        color: '#fff',
                        '& + .MuiSwitch-track': {
                            backgroundColor: customTheme.palette.green.alpha,
                            opacity: 1,
                            border: 0,
                        },
                        '&.Mui-disabled + .MuiSwitch-track': {
                            opacity: 0.5,
                        },
                    },
                    '&.Mui-focusVisible .MuiSwitch-thumb': {
                        color: customTheme.palette.green.alpha,
                        border: '6px solid #fff',
                    },
                    '&.Mui-disabled .MuiSwitch-thumb': {
                        color: theme.palette.grey[100],
                    },
                    '&.Mui-disabled + .MuiSwitch-track': {
                        opacity: 0.7,
                    },
                }),
                thumb: {
                    boxSizing: 'border-box',
                    boxShadow: 'none',
                    width: 20,
                    height: 20,
                },
                track: ({ theme }) => ({
                    borderRadius: 26 / 2,
                    backgroundColor: customTheme.palette.grey.bg1,
                    opacity: 1,
                    transition: theme.transitions.create(['background-color'], {
                        duration: 500,
                    }),
                }),
            },
        },
        MuiFormControlLabel: {
            styleOverrides: {
                root: {
                    margin: 0,
                    alignItems: 'center',
                },
                label: {
                    marginRight: 8,
                },
            },
        },

        MuiListItemButton: {
            styleOverrides: {
                root: {
                    '&.Mui-selected': {
                        backgroundColor: customTheme.palette.glass.green,
                    },
                    '&.Mui-selected:hover': {
                        backgroundColor: customTheme.palette.glass.green,
                    },
                },
            },
        },
        MuiAccordion: {
            styleOverrides: {
                root: {
                    backgroundColor: 'transparent',
                    boxShadow: 'none',
                    borderRadius: '0 !important',
                    '&:before': {
                        display: 'none',
                    },
                },
            },
        },
        MuiAccordionSummary: {
            styleOverrides: {
                root: {
                    color: customTheme.palette.grey.inactive,
                    '&:hover': {
                        color: customTheme.palette.green.betta,
                    },
                    '&.Mui-expanded': {
                        color: customTheme.palette.common.black,
                    },
                    transition: 'none',
                },
                content: {
                    color: 'inherit',
                },
            },
        },
        MuiDialog: {
            styleOverrides: {
                paper: {
                    borderRadius: '16px !important',
                },
            },
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    borderRadius: '8px',
                    margin: '4px',
                },
            },
        },
        MuiMenu: {
            styleOverrides: {
                list: {
                    padding: '0px !important',
                },
            },
        },
    },
});

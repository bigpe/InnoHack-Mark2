import { useState, MouseEventHandler } from 'react';

import ColorLensIcon from '@mui/icons-material/ColorLens';
import { Box, ListItemIcon, Menu, MenuItem } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { CirclePicker } from 'react-color';

export const DEFAULT_COLORS = [
    '#fff',
    '#000',
    '#9900ef',
    '#9c27b0',
    '#673ab7',
    '#3f51b5',
    '#1f4e79',
    '#2196f3',
    '#03a9f4',
    '#00bcd4',
    '#009688',
    '#03B481',
    '#00a824',
    '#4caf50',
    '#8bc34a',
    '#cddc39',
    '#ddce11',
    '#ffeb3b',
    '#ffc107',
    '#ff9800',
    '#ff5722',
    '#f44336',
    '#e91e63',
    '#f59afc',
    '#f78dA7',
    '#fd947f',
    '#ffb68e',
    '#ffb6c1',
    '#795548',
    '#607d8b',
    '#9dc3e6',
    '#cdce9a',
    'rgb(91, 155, 213)',
    'rgb(57, 106, 120)',
    'rgb(89, 126, 133)',
    'rgb(117, 164, 172)',
    'rgb(102, 166, 174)',
    'rgb(93, 168, 191)',
    'rgb(136, 192, 202)',
    'rgb(176, 214, 221)',
    'rgb(209, 234, 240)',
    'rgb(225, 237, 228)',
    'rgb(162, 195, 169)',
    'rgb(107, 153, 112)',
    'rgb(63, 91, 66)',
    'rgb(89, 72, 56)',
    'rgb(92, 86, 83)',
    'rgb(103, 104, 102)',
    'rgb(156, 144, 131)',
    'rgb(130, 122, 118)',
    'rgb(145, 146, 146)',
    'rgb(189, 182, 179)',
    'rgb(202, 200, 200)',
    'rgb(225, 221, 217)',
    '#637983',
    '#4f6169',
    '#73868f',
    '#92a1a8',
    '#98aab1',
    '#89999f',
    '#7a888e',
    '#a2b3b9',
    '#adbbc1',
];

type ColorPickerProps = {
    color?: string;
    disabled?: boolean;
    onColorChange?: (color: string) => void;
    onClose?: () => void;
};

export const ColorPicker = ({
    color,
    disabled,
    onClose = () => undefined,
    onColorChange = () => undefined,
}: ColorPickerProps): JSX.Element => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);

    const handleMenuClick: MouseEventHandler<HTMLLIElement> = (e) => {
        setAnchorEl(e.currentTarget);
    };
    const handleClose = (): void => {
        setAnchorEl(null);
        onClose();
    };

    return (
        <div>
            <MenuItem
                onClick={(e) => {
                    handleMenuClick(e);
                }}
                selected={open}
                disabled={disabled}
                sx={{ padding: '0 8px', m: 0 }}
            >
                <IconButton>
                    <ColorLensIcon fontSize="large" />
                </IconButton>
            </MenuItem>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={() => {
                    handleClose();
                }}
                anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                PaperProps={{
                    sx: {
                        p: 2,
                    },
                }}
            >
                <CirclePicker
                    styles={{
                        default: {
                            card: {
                                background: 'none',
                            },
                        },
                    }}
                    color={color}
                    onChangeComplete={(c) => {
                        onColorChange(c.hex);
                        handleClose();
                    }}
                    colors={DEFAULT_COLORS}
                />
            </Menu>
        </div>
    );
};

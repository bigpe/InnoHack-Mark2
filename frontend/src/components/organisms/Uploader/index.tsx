import { useCallback, useState } from 'react';

import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { Box, Button, Stack } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { useQueryClient } from '@tanstack/react-query';
import { useDropzone } from 'react-dropzone';

import { Typography } from 'components/atoms/Typography';

import { AddNewCollectionDialog } from '../AddNewCollectionDialog/index';

const actions = [
    {
        id: 1,
        title: 'Добавить коллекцию',
        icon: <AddToPhotosIcon />,
        disabled: false,
    },
    {
        id: 2,
        title: 'Сгенерировать коллекцию',
        icon: <AutoAwesomeIcon />,
        disabled: true,
    },
];

export const Uploader = (): JSX.Element => {
    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState('null');
    const [activeModalTitle, setActiveModalTitle] = useState<string | null>(
        null
    );

    const handleClickOpen = (title: string): void => {
        setOpen(true);
        setActiveModalTitle(title);
    };

    const handleClose = (value: string): void => {
        setOpen(false);
        setSelectedValue(value);
    };

    const queryClient = useQueryClient();

    // useEffect(() => {
    //     if (res.type === 'success') {
    //         onSuccess(res.data);
    //         queryClient.invalidateQueries(['files']);
    //         setDropZoneOpen(false);
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [res.type, res.data, queryClient]);

    return (
        <Grid2
            height="100%"
            width="100%"
            alignItems="center"
            justifyContent="center"
            container
            spacing={5}
            sx={{ marginTop: '-150px' }}
        >
            {actions.map((action) => (
                <Grid2 xs={12} md={3} key={action.id}>
                    <Button
                        onClick={() => handleClickOpen(action.title)}
                        variant="outlined"
                        disabled={action.disabled}
                        sx={{
                            border: '1px solid rgba(177, 180, 185, 0.2)',
                            borderRadius: 4,
                            p: 5,
                            display: 'flex',
                            gap: 1,
                            justifyContent: 'center',
                            cursor: 'pointer',
                        }}
                    >
                        {action.title}
                        {action.icon}
                    </Button>
                </Grid2>
            ))}

            <AddNewCollectionDialog
                selectedValue={selectedValue}
                open={open}
                onClose={handleClose}
                title={activeModalTitle}
            />
        </Grid2>
    );
};

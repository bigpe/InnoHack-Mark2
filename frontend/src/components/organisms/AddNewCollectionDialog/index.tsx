import * as React from 'react';
import { useCallback, useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import {
    Button,
    Stack,
    Box,
    FormControl,
    IconButton,
    InputLabel,
    Select,
    SvgIcon,
    useTheme,
    List,
    ListItem,
    ListItemText,
    SelectChangeEvent,
    OutlinedInput,
} from '@mui/material';
import CardActions from '@mui/material/CardActions';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';

import { Typography } from 'components/atoms/Typography';
import { NewCollection } from 'types/api/collectionType';

const createData = (
    name: string,
    calories: number,
    fat: number,
    carbs: number
): {
    name: string;
    calories: number;
    fat: number;
    carbs: number;
} => {
    return { name, calories, fat, carbs };
};

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24),
    createData('Ice cream sandwich', 237, 9.0, 37),
    createData('Eclair', 262, 16.0, 24),
    createData('Cupcake', 305, 3.7, 67),
    createData('Gingerbread', 356, 16.0, 49),
];

export interface AddNewCollectionDialogProps {
    open: boolean;
    selectedValue: string;
    onClose: (value: string) => void;
    title: string | null;
}

export const AddNewCollectionDialog = (
    props: AddNewCollectionDialogProps
): JSX.Element => {
    const { onClose, selectedValue, open, title } = props;

    const handleClose = (): void => {
        onClose(selectedValue);
    };

    const theme = useTheme();

    const [age, setAge] = React.useState<number | string>('');

    const handleChange = (event: SelectChangeEvent<typeof age>): void => {
        setAge(Number(event.target.value) || '');
    };

    const onDrop = useCallback((acceptedFiles: File[]) => {
        acceptedFiles.forEach((file) => {
            const reader = new FileReader();
            console.log(file);

            reader.onabort = () => console.log('file reading was aborted');
            reader.onerror = () => console.log('file reading has failed');
            reader.onload = () => {
                // Do whatever you want with the file contents
                const binaryStr = reader.result;
            };
            reader.readAsArrayBuffer(file);
        });
    }, []);

    const uploadFile = useCallback(() => {
        const fData = new FormData();

        // fData.append('page', id?.toString() || '');
        // fData.append('file', uploadedFile || '');

        // setBody(fData);
        // rerun();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
        useDropzone({
            onDrop,
        });

    const [newColl, setNewColl] = useState<NewCollection>({
        name: 'colletion-name-default',
        archive: '',
        type_collection: 1,
    });

    const onNewCollChange = useCallback((config: Partial<NewCollection>) => {
        if (config) {
            setNewColl({
                ...newColl,
                ...config,
            });
        }
    }, []);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<NewCollection>();

    return (
        <Dialog
            onClose={handleClose}
            open={open}
            sx={{ backgroundColor: 'transparent' }}
        >
            <DialogTitle
                bgcolor={theme.palette.primary.main}
                display="flex"
                justifyContent="space-between"
                sx={{ fontSize: '14px', color: '#fff', fontWeight: '400' }}
            >
                {title}
                <IconButton
                    aria-label="close"
                    onClick={() => onClose(selectedValue)}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                    }}
                >
                    <CloseIcon style={{ color: '#fff' }} />
                </IconButton>
            </DialogTitle>
            <Box
                sx={{
                    minWidth: '600px',
                    backgroundColor: theme.palette.common.white,
                    padding: '32px 10px 16px',
                }}
            >
                <Stack>
                    <FormControl
                        sx={{
                            my: 1,
                            maxWidth: '242px',
                            svg: {
                                backgroundColor: 'rgba(85, 99, 218, 0.15)',
                                borderRadius: '100%',
                                path: {
                                    strokeWidth: '1%',
                                    stroke: theme.palette.primary.main,
                                    fill: theme.palette.primary.main,
                                },
                            },
                        }}
                        size="medium"
                    >
                        <Select
                            native
                            defaultValue="Выбрать коллекцию"
                            value={age}
                            onChange={handleChange}
                            input={
                                <OutlinedInput
                                    label="Выбрать коллекцию"
                                    id="demo-dialog-native"
                                />
                            }
                            IconComponent={KeyboardArrowDownRoundedIcon}
                            sx={{
                                borderRadius: 3,
                                '& legend': { display: 'none' },
                                '& fieldset': { top: 0 },
                            }}
                        >
                            <option value="Выбрать коллекцию" disabled>
                                Выбрать коллекцию
                            </option>
                            {/* <option aria-label="None" value="" /> */}
                            <option value={10}>Ten</option>
                            <option value={20}>Twenty</option>
                            <option value={30}>Thirty</option>
                        </Select>
                    </FormControl>
                </Stack>
                <Stack>
                    <Box
                        sx={{
                            border: '2px dashed rgba(234, 236, 241, 1)',
                            borderColor: isDragActive
                                ? theme.palette.primary.main
                                : 'inherit',
                            borderRadius: 4,
                            p: 4,
                            my: 2,
                            cursor: 'pointer',
                        }}
                        {...getRootProps()}
                    >
                        <input {...getInputProps()} />
                        {isDragActive ? (
                            <p>Перенесите файлы сюда..</p>
                        ) : (
                            <p>
                                Перенесите файлы в эту область или нажмите что
                                бы выбрать
                            </p>
                        )}
                    </Box>
                </Stack>
                <Stack>
                    <Typography>Файл с разметкой</Typography>
                </Stack>
                <Stack>
                    <FormControl
                        variant="standard"
                        sx={{
                            my: 1,
                            svg: {
                                backgroundColor: 'rgba(85, 99, 218, 0.15)',
                                borderRadius: '100%',
                                path: {
                                    strokeWidth: '1%',
                                    stroke: theme.palette.primary.main,
                                    fill: theme.palette.primary.main,
                                },
                            },
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                        size="medium"
                    >
                        <Typography>Применить авто-разметку</Typography>
                        <Select
                            native
                            defaultValue="true"
                            size="small"
                            disabled
                            input={
                                <OutlinedInput
                                    label="Выбрать коллекцию"
                                    id="demo-dialog-native"
                                />
                            }
                            IconComponent={KeyboardArrowDownRoundedIcon}
                            sx={{
                                borderRadius: 3,
                                '& legend': { display: 'none' },
                                '& fieldset': { top: 0 },
                                boxShadow: 'none',
                                '.MuiOutlinedInput-notchedOutline': {
                                    border: 0,
                                },
                                mx: 2,
                            }}
                        >
                            <option value="true">Нет</option>
                            <option value="false">Да</option>
                        </Select>
                    </FormControl>
                </Stack>
                <CardActions
                    sx={{
                        alignItems: 'flex-end',
                        justifyContent: 'flex-end',
                    }}
                >
                    <Button variant="outlined">ОК</Button>
                    <Button variant="outlined" onClick={handleClose}>
                        Отмена
                    </Button>
                </CardActions>
            </Box>
        </Dialog>
    );
};

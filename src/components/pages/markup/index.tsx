/* eslint-disable no-plusplus */
/* eslint-disable no-alert */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect, useCallback, useMemo } from 'react';

import AutoFixHighOutlinedIcon from '@mui/icons-material/AutoFixHighOutlined';
import CircleIcon from '@mui/icons-material/Circle';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CloseIcon from '@mui/icons-material/Close';
import CropDinOutlinedIcon from '@mui/icons-material/CropDinOutlined';
import DesignServicesRoundedIcon from '@mui/icons-material/DesignServicesRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import RedoOutlinedIcon from '@mui/icons-material/RedoOutlined';
import RestartAltOutlinedIcon from '@mui/icons-material/RestartAltOutlined';
import UndoOutlinedIcon from '@mui/icons-material/UndoOutlined';
import ZoomOutMapOutlinedIcon from '@mui/icons-material/ZoomOutMapOutlined';
import {
    AppBar,
    Box,
    Button,
    Container,
    Dialog,
    Grid,
    IconButton,
    LinearProgress,
    Menu,
    MenuItem,
    Slide,
    Stack,
    Toolbar,
    useTheme,
    Divider,
    Chip,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { useSnackbar } from 'notistack';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';

import { Typography } from 'components/atoms/Typography';

import './dwv-syle.css';

import { TagsTable } from './TagsTable';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const dwv = require('dwv');

dwv.image.decoderScripts = {
    jpeg2000: `${process.env.PUBLIC_URL}/assets/dwv/decoders/pdfjs/c`,
    'jpeg-lossless': `${process.env.PUBLIC_URL}/assets/dwv/decoders/rii-mango/decode-jpegloss.js`,
    'jpeg-baseline': `${process.env.PUBLIC_URL}/assets/dwv/decoders/pdfjs/decode-jpegbaseline.js`,
    rle: `${process.env.PUBLIC_URL}/assets/dwv/decoders/dwv/decode-rle.js`,
};

const Transition = React.forwardRef(
    (
        props: TransitionProps & {
            children: React.ReactElement<any, any>;
        },
        ref: React.Ref<unknown>
    ) => {
        return <Slide direction="up" ref={ref} {...props} />;
    }
);

interface IDwvParams {
    versions: {
        dwv: string;
        react: string;
    };
    tools: {
        Draw: {
            options: string[];
            type: string;
            events: string[];
        };
        Floodfill: object;
        WindowLevel: object;
        Scroll: object;
        ZoomAndPan: object;
    };
    toolNames: string[];
    selectedTool: string;
    selectedShape: string;
    loadProgress: number;
    dataLoaded: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dwvApp: object | null | any;
    metaData: [];
    showDicomTags: boolean;
    toolMenuAnchorEl: HTMLElement | null;
    shapeMenuAnchorEl: HTMLElement | null;
    dropboxDivId: string;
    dropboxClassName: string;
    borderClassName: string;
    hoverClassName: string;
}

export const Markup = (): JSX.Element => {
    const theme = useTheme();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const app = new dwv.App();

    // const app = useMemo(() => {
    //     return new dwv.App();
    // }, []);

    const [dwvParams, setDwvParams] = useState<IDwvParams>({
        versions: {
            dwv: dwv.getVersion(),
            react: React.version,
        },
        tools: {
            Floodfill: {},
            Draw: {
                options: ['Ruler', 'Circle', 'Rectangle'],
                type: 'factory',
                events: ['drawcreate', 'drawchange', 'drawmove', 'drawdelete'],
            },

            WindowLevel: {},
            Scroll: {},
            ZoomAndPan: {},
        },
        toolNames: ['Floodfill', 'Draw', 'WindowLevel', 'Scroll', 'ZoomAndPan'],
        selectedTool: 'Select Tool',
        selectedShape: 'Select shape',
        loadProgress: 0,
        dataLoaded: false,
        dwvApp: app,
        metaData: [],
        showDicomTags: false,
        toolMenuAnchorEl: null,
        shapeMenuAnchorEl: null,
        dropboxDivId: 'dropBox',
        dropboxClassName: 'dropBox',
        borderClassName: 'dropBoxBorder',
        hoverClassName: 'hover',
    });

    const {
        dwvApp,
        tools,
        toolNames,
        selectedTool,
        selectedShape,
        loadProgress,
        dataLoaded,
        metaData,
        toolMenuAnchorEl,
        shapeMenuAnchorEl,
    } = dwvParams;

    // --------------------------------- showDropbox START ---------------------------------
    const showDropbox = useCallback(
        (appInstance: any, show: boolean): void => {
            const box = document.getElementById(dwvParams.dropboxDivId);
            if (!box) {
                return;
            }
            const layerDiv = document.getElementById('layerGroup0');

            const defaultHandleDragEvent = (event: DragEvent): void => {
                // prevent default handling
                event.stopPropagation();
                event.preventDefault();
            };

            const onDrop = (event: DragEvent): void => {
                defaultHandleDragEvent(event);
                // load files
                appInstance.loadFiles(event?.dataTransfer?.files);
            };

            const onBoxDragOver = (event: any): void => {
                defaultHandleDragEvent(event);
                // update box border

                if (
                    box &&
                    box.className.indexOf(dwvParams.hoverClassName) === -1
                ) {
                    box.className += ` ${dwvParams.hoverClassName}`;
                }
            };

            /**
             * Handle a drag leave.
             * @param {DragEvent} event The event to handle.
             */
            const onBoxDragLeave = (event: any): void => {
                defaultHandleDragEvent(event);
                // update box class

                if (
                    box &&
                    box.className.indexOf(dwvParams.hoverClassName) !== -1
                ) {
                    box.className = box.className.replace(
                        ` ${dwvParams.hoverClassName}`,
                        ''
                    );
                }
            };

            if (show) {
                // reset css class
                box.className = `${dwvParams.dropboxClassName} ${dwvParams.borderClassName}`;
                // check content
                if (box.innerHTML === '') {
                    const p = document.createElement('p');
                    p.appendChild(
                        document.createTextNode('Drag and drop data here')
                    );
                    box.appendChild(p);
                }
                // show box
                box.setAttribute('style', 'display:initial');
                // stop layer listening
                if (layerDiv) {
                    layerDiv.removeEventListener(
                        'dragover',
                        defaultHandleDragEvent
                    );
                    layerDiv.removeEventListener(
                        'dragleave',
                        defaultHandleDragEvent
                    );
                    layerDiv.removeEventListener('drop', onDrop);
                }
                // listen to box events
                box.addEventListener('dragover', onBoxDragOver);
                box.addEventListener('dragleave', onBoxDragLeave);
                box.addEventListener('drop', onDrop);
            } else {
                // remove border css class
                box.className = dwvParams.dropboxClassName;
                // remove content
                box.innerHTML = '';
                // hide box
                box.setAttribute('style', 'display:none');
                // stop box listening
                box.removeEventListener('dragover', onBoxDragOver);
                box.removeEventListener('dragleave', onBoxDragLeave);
                box.removeEventListener('drop', onDrop);
                // listen to layer events
                if (layerDiv) {
                    layerDiv.addEventListener(
                        'dragover',
                        defaultHandleDragEvent
                    );
                    layerDiv.addEventListener(
                        'dragleave',
                        defaultHandleDragEvent
                    );
                    layerDiv.addEventListener('drop', onDrop);
                }
            }
        },
        [
            dwvParams.borderClassName,
            dwvParams.dropboxClassName,
            dwvParams.dropboxDivId,
            dwvParams.hoverClassName,
        ]
    );
    // --------------------------------- showDropbox END ---------------------------------

    const onParamsChange = useCallback(
        (params: any): void => {
            setDwvParams({
                ...dwvParams,
                ...params,
            });
        },
        [dwvParams]
    );

    const onChangeTool = useCallback(
        (tool: string): void => {
            const onChangeShape = (shape: string): void => {
                if (dwvApp) {
                    dwvApp.setDrawShape(shape);
                }
            };
            if (dwvApp) {
                onParamsChange({ selectedTool: tool });
                dwvApp.setTool(tool);
                if (tool === 'Draw') {
                    onChangeShape(tools.Draw.options[0]);
                }
            }
        },
        [dwvApp, onParamsChange, tools.Draw.options]
    );

    const handleMenuItemClick = (tool: string): void => {
        setDwvParams({ ...dwvParams, toolMenuAnchorEl: null });
        onChangeTool(tool);
    };

    const toolsMenuItems = toolNames.map((tool) => (
        <MenuItem
            onClick={() => handleMenuItemClick(tool)}
            key={tool}
            value={tool}
        >
            {tool}
        </MenuItem>
    ));

    const shapeMenuItems = tools.Draw.options.map((shape) => (
        <MenuItem
            onClick={() => handleMenuItemClick(shape)}
            key={shape}
            value={shape}
        >
            {shape}
        </MenuItem>
    ));

    useEffect(() => {
        if (dataLoaded) {
            enqueueSnackbar('Данные загружены', {
                variant: 'success',
                key: 'data-loaded',
            });
        }
    }, [dataLoaded, enqueueSnackbar]);

    const setupDropbox = useCallback(
        (appInstance: any) => {
            showDropbox(appInstance, true);
        },
        [showDropbox]
    );
    app.init({
        dataViewConfigs: { '*': [{ divId: 'layerGroup0' }] },
        tools,
    });
    useEffect(() => {
        // initialise app

        // load events
        let nLoadItem = 0;
        let nReceivedError = 0;
        let nReceivedAbort = 0;
        let isFirstRender = false;

        app.addEventListener('loadstart', () => {
            // reset flags
            nLoadItem = 0;
            nReceivedError = 0;
            nReceivedAbort = 0;
            isFirstRender = true;
            // hide drop box
            showDropbox(app, false);
        });
        app.addEventListener('loadprogress', (event: { loaded: any }) => {
            onParamsChange({ loadProgress: event.loaded });
        });
        app.addEventListener('renderend', () => {
            if (isFirstRender) {
                isFirstRender = false;
                // available tools
                const names: string[] = [];
                Object.keys(tools).forEach((key) => {
                    if (
                        key.toString() === 'Scroll' ||
                        key.toString() === 'WindowLevel' ||
                        (key.toString() !== 'Scroll' && key !== 'WindowLevel')
                    ) {
                        names.push(key);
                    }
                });

                onParamsChange({ toolNames: names });
                onChangeTool(names[0]);
            }
        });
        app.addEventListener('load', () => {
            // set dicom tags
            onParamsChange({
                metaData: dwv.utils.objectToArray(app.getMetaData(0)),
            });
            // set data loaded flag
            onParamsChange({ dataLoaded: true });
        });
        app.addEventListener('loadend', () => {
            if (nReceivedError) {
                onParamsChange({ loadProgress: 0 });
                enqueueSnackbar(
                    'Данные загружены с ошибкой. Возможно набор DICOM некорректен',
                    {
                        variant: 'error',
                        key: 'data-loaded-error',
                    }
                );

                // show drop box if nothing has been loaded
                if (!nLoadItem) {
                    showDropbox(app, true);
                }
            }
            if (nReceivedAbort) {
                onParamsChange({ loadProgress: 0 });
                alert('Load was aborted.');
                showDropbox(app, true);
            }
        });
        app.addEventListener('loaditem', () => {
            ++nLoadItem;
        });
        app.addEventListener('error', (event: { error: any }) => {
            enqueueSnackbar(event.error.toString(), {
                variant: 'error',
                key: 'data-loaded-some-error',
            });
            ++nReceivedError;
        });
        app.addEventListener('abort', () => {
            ++nReceivedAbort;
        });

        // handle key events
        app.addEventListener('keydown', (event: any) => {
            app.defaultOnKeydown(event);
        });
        // handle window resize
        window.addEventListener('resize', app.onResize);

        // store
        // if (loadProgress === '100') onParamsChange({ dwvApp: app });

        // setup drop box
        setupDropbox(app);

        // possible load from location
        dwv.utils.loadFromUri(window.location.href, app);
    }, [
        app,
        dwvParams.tools,
        enqueueSnackbar,
        onChangeTool,
        onParamsChange,
        setupDropbox,
        showDropbox,
        tools,
    ]);

    const handleMenuButtonClick = (
        event: React.MouseEvent<HTMLElement>
    ): void => {
        setDwvParams({ ...dwvParams, toolMenuAnchorEl: event.currentTarget });
    };

    const handleMenuClose = (): void => {
        setDwvParams({ ...dwvParams, toolMenuAnchorEl: null });
    };

    const onReset = (): void => {
        if (dwvApp) {
            dwvApp.resetDisplay();
        }
    };

    const handleTagsDialogOpen = (): void => {
        setDwvParams({ ...dwvParams, showDicomTags: true });
    };
    const handleTagsDialogClose = (): void => {
        setDwvParams({ ...dwvParams, showDicomTags: false });
    };

    return (
        <Container
            maxWidth="xl"
            sx={{
                height: '100%',
                flex: '1',
                mt: 5,
            }}
        >
            <Grid
                container
                spacing={2}
                sx={{
                    height: '100%',
                    flex: '1',
                    '& > div': {
                        borderRadius: '16px',
                    },
                }}
            >
                <LinearProgress
                    sx={{ opacity: loadProgress > 0 ? 1 : 0 }}
                    variant="determinate"
                    value={loadProgress}
                />
                <Grid
                    item
                    xs={12}
                    md={3}
                    flexDirection="column"
                    sx={{ pr: 2, pt: '0 !important' }}
                >
                    <Box
                        sx={{
                            background: ' rgba(85, 99, 218, 0.2)',
                            borderRadius: '16px ',
                            height: '45%',
                            p: 3,
                        }}
                    >
                        <Stack
                            flexDirection="row"
                            justifyContent="space-between"
                            sx={{ my: 0.5 }}
                        >
                            <Typography $color="accent">Коллекция</Typography>
                            <Typography $color="accent">Cancer 123</Typography>
                        </Stack>
                        <Stack
                            justifyContent="space-between"
                            flexDirection="row"
                        >
                            <Typography $color="accent">Имя DICOM</Typography>
                            <Typography $color="accent">DICOM 1</Typography>
                        </Stack>
                    </Box>
                    <Box sx={{ mt: 3, height: '55%' }}>
                        <Box
                            sx={{
                                borderRadius: '15px 15px 0 0',
                                border: '1.5px solid #EAECF1',
                                borderBottom: 0,
                                width: 'fit-content',
                                padding: '8px 16px',
                                bgcolor: '#5563DA',
                            }}
                        >
                            <Typography $color="common.white">
                                Labels
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                border: '1.5px solid #EAECF1',
                                borderTopRightRadius: '16px',
                                padding: '6px 19px',
                                overflow: 'auto',
                                maxHeight: '80px',
                            }}
                        >
                            <Stack
                                direction="row"
                                spacing={1}
                                sx={{ my: 1 }}
                                flexWrap="wrap"
                            >
                                <Chip
                                    label="LABEL 1"
                                    variant="filled"
                                    sx={{
                                        backgroundColor: 'blue',
                                        color: '#fff',
                                        textTransform: 'uppercase',
                                        height: '24px',
                                    }}
                                    onDelete={() => console.log('delete')}
                                    // onClick={handleClick}
                                    // onDelete={handleDelete}
                                />

                                <Chip
                                    label="LABEL 134"
                                    variant="filled"
                                    sx={{
                                        backgroundColor: 'red',
                                        color: '#fff',
                                        textTransform: 'uppercase',
                                        p: 0,
                                        height: '24px',
                                    }}
                                    onDelete={() => console.log('delete')}
                                    // onClick={handleClick}
                                    // onDelete={handleDelete}
                                />
                            </Stack>
                        </Box>

                        <Box
                            sx={{
                                borderRadius: '16px ',

                                border: '1.5px solid #EAECF1',
                                borderTopLeftRadius: 0,
                                borderTopRightRadius: 0,
                                borderTop: 0,
                                padding: '15px 19px',
                            }}
                        >
                            <Stack
                                direction="row"
                                spacing={1}
                                sx={{
                                    borderBottom: '1px solid #EAECF1',
                                    padding: '10px 0',
                                }}
                            >
                                <CircleIcon sx={{ path: { fill: 'red' } }} />
                                <Typography>Circle 1</Typography>
                            </Stack>
                            <Stack
                                direction="row"
                                spacing={1}
                                sx={{
                                    borderBottom: '1px solid #EAECF1',
                                    padding: '10px 0',
                                }}
                            >
                                <CircleIcon sx={{ path: { fill: 'red' } }} />
                                <Typography>Bounding box 1</Typography>
                            </Stack>
                            <Stack
                                direction="row"
                                spacing={1}
                                sx={{
                                    borderBottom: '1px solid #EAECF1',
                                    padding: '10px 0',
                                }}
                            >
                                <CircleIcon sx={{ path: { fill: 'red' } }} />
                                <Typography>Bounding box 2</Typography>
                            </Stack>
                            <Stack
                                direction="row"
                                spacing={1}
                                sx={{
                                    borderBottom: '1px solid #EAECF1',
                                    padding: '10px 0',
                                }}
                            >
                                <CircleIcon sx={{ path: { fill: 'red' } }} />
                                <Typography>Line 2</Typography>
                            </Stack>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Box id="layerGroup0" className="layerGroup">
                        <div id="dropBox" />
                    </Box>
                </Grid>
                <Grid item xs={12} md={1} bgcolor="#2C2C2C" sx={{ pr: 2 }}>
                    <Box
                        flexDirection="column"
                        sx={{
                            p: 1,
                            svg: { path: { fill: '#fff' } },
                            button: { width: '100%' },
                        }}
                    >
                        <IconButton
                            aria-label="Circle"
                            sx={{ transform: 'rotate(-180deg)' }}
                        >
                            <DesignServicesRoundedIcon fontSize="large" />
                        </IconButton>
                        <IconButton aria-label="Circle">
                            <CircleOutlinedIcon fontSize="large" />
                        </IconButton>
                        <IconButton aria-label="Bounding Box">
                            <CropDinOutlinedIcon fontSize="large" />
                        </IconButton>
                        <IconButton aria-label="Magic Wand">
                            <AutoFixHighOutlinedIcon fontSize="large" />
                        </IconButton>
                        <IconButton aria-label="Zoom">
                            <ZoomOutMapOutlinedIcon fontSize="large" />
                        </IconButton>
                        <IconButton
                            aria-label="Undo"
                            disabled={!dataLoaded}
                            onClick={() => dwvApp.undo()}
                        >
                            <UndoOutlinedIcon fontSize="large" />
                        </IconButton>
                        <IconButton
                            aria-label="Redo"
                            disabled={!dataLoaded}
                            onClick={() => dwvApp.redo()}
                        >
                            <RedoOutlinedIcon fontSize="large" />
                        </IconButton>
                        <IconButton
                            aria-label="Reset"
                            disabled={!dataLoaded}
                            onClick={onReset}
                        >
                            <RestartAltOutlinedIcon fontSize="large" />
                        </IconButton>
                    </Box>
                    {/* <Stack
                        direction="row"
                        spacing={1}
                        padding={1}
                        justifyContent="center"
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            // aria-owns={toolMenuAnchorEl ? 'tools-menu' : null}
                            aria-haspopup="true"
                            onClick={handleMenuButtonClick}
                            disabled={!dataLoaded}
                            size="medium"
                        >
                            {selectedTool}
                            <KeyboardArrowDownRoundedIcon />
                        </Button>
                        <Menu
                            id="tools-menu"
                            anchorEl={toolMenuAnchorEl}
                            open={Boolean(toolMenuAnchorEl)}
                            onClose={handleMenuClose}
                        >
                            {toolsMenuItems}
                        </Menu>

                        <Button
                            variant="contained"
                            color="primary"
                            // aria-owns={shapeMenuAnchorEl ? 'shape-menu' : null}
                            aria-haspopup="true"
                            onClick={handleMenuButtonClick}
                            disabled={!dataLoaded}
                            size="medium"
                        >
                            {selectedShape}
                            <KeyboardArrowDownRoundedIcon />
                        </Button>
                        <Menu
                            id="shape-menu"
                            anchorEl={shapeMenuAnchorEl}
                            open={Boolean(shapeMenuAnchorEl)}
                            onClose={handleMenuClose}
                        >
                            {shapeMenuItems}
                        </Menu>

                        <Button
                            variant="contained"
                            color="primary"
                            disabled={!dataLoaded}
                            onClick={onReset}
                        >
                            Reset
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            disabled={!dataLoaded}
                            onClick={() => dwvApp.undo()}
                        >
                            Undo
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            disabled={!dataLoaded}
                            onClick={() => dwvApp.redo()}
                        >
                            Redo
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleTagsDialogOpen()}
                            disabled={!dataLoaded}
                            size="medium"
                        >
                            Tags
                        </Button>
                        <Dialog
                            open={dwvParams.showDicomTags}
                            onClose={() => handleTagsDialogClose()}
                            TransitionComponent={Transition}
                        >
                            <AppBar>
                                <Toolbar>
                                    <IconButton
                                        color="inherit"
                                        onClick={() => handleTagsDialogClose()}
                                        aria-label="Close"
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                    <Typography>DICOM Tags</Typography>
                                </Toolbar>
                            </AppBar>
                            {/* <TagsTable
                        data={
                            dataLoaded
                                ? dwv.utils.objectToArray(dwvApp.getMetaData(0))
                                : []
                        }
                    /> 
                        </Dialog>
                    </Stack> */}
                </Grid>

                {/* <Box
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
                        Перенесите файлы в эту область или нажмите что бы
                        выбрать
                    </p>
                )}
            </Box> */}
            </Grid>{' '}
        </Container>
    );
};

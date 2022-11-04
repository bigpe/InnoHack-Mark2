import Grid2 from '@mui/material/Unstable_Grid2'; // Grid version 2

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

export const TabContent = (props: TabPanelProps): JSX.Element => {
    const { children, value, index, ...other } = props;

    return (
        <Grid2
            container
            className="tab-container"
            height={value === index ? '100%' : 'initial'}
            spacing={4}
            sx={{ mt: 2, flexGrow: 1 }}
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && children}
        </Grid2>
    );
};

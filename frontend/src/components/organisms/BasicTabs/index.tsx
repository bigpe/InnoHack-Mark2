import { ReactNode, SyntheticEvent, useState } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

import { TabContent } from './TabContent';

const a11yProps = (index: number): { id: string; 'aria-controls': string } => {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
};

interface BasicTabsProps {
    tabs: {
        label: string;
        Component: ReactNode;
    }[];
}

export const BasicTabs = ({ tabs }: BasicTabsProps): JSX.Element => {
    const [value, setValue] = useState(0);

    const handleChange = (event: SyntheticEvent, newValue: number): void => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', height: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                >
                    {tabs.map((item, i) => (
                        <Tab
                            key={`${item.label}_tab`}
                            label={item.label}
                            {...a11yProps(i)}
                            sx={{
                                fontWeight: 600,
                                fontSize: '14px',
                                lineHeight: '17px',

                                ':before': {
                                    background: 'transparent',
                                },
                            }}
                        />
                    ))}
                </Tabs>
            </Box>

            {tabs.map((item, i) => (
                <TabContent key={`${i}_${item.label}`} value={value} index={i}>
                    {item.Component}
                    {i}
                </TabContent>
            ))}
        </Box>
    );
};

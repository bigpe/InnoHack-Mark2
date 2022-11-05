/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';

import Search from '@mui/icons-material/Search';
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    InputAdornment,
    TextField,
    TableBody,
    TablePagination,
} from '@mui/material';

const styles = (theme: any): object => ({
    flex: {
        flex: 1,
    },
    spacer: {
        flex: '1 1 100%',
    },
    row: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
    searchField: {
        backgroundColor: 'white',
        marginLeft: 20,
    },
    container: {
        paddingLeft: 10,
        paddingTop: 20,
    },
});

type TagsTableProps = {
    data: [];
};

export const TagsTable = (props: TagsTableProps): JSX.Element => {
    const { data } = props;

    const [tableParams, setTableParams] = useState({
        data,
        displayData: data,
        searchfor: '',
        page: 0,
        rowsPerPage: 10,
    });

    const filterList = (event: any): void => {
        const search = event.target.value;
        const searchLo = search.toLowerCase();
        const updatedList: any = tableParams.data.filter((item: any) => {
            for (const key in item) {
                // eslint-disable-next-line no-prototype-builtins
                if (typeof key === 'string' && item.hasOwnProperty(key)) {
                    let value = item[key];
                    if (typeof value !== 'string') {
                        value = value.toString();
                    }
                    if (value.toLowerCase().indexOf(searchLo) !== -1) {
                        return true;
                    }
                }
            }
            return false;
        });
        setTableParams({
            ...tableParams,
            searchfor: search,
            displayData: updatedList,
        });
    };
    const handleChangePage = (event: any, page: number): void => {
        setTableParams({
            ...tableParams,
            page,
        });
    };

    const handleChangeRowsPerPage = (event: any): void => {
        setTableParams({
            ...tableParams,
            page: 0,
            rowsPerPage: event.target.value,
        });
    };

    return (
        <div>
            <TextField
                id="search"
                type="search"
                value={tableParams.searchfor}
                onChange={filterList}
                margin="normal"
                size="small"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Search />
                        </InputAdornment>
                    ),
                }}
            />

            <Table sx={{ width: '700px', height: 500 }}>
                <TableHead>
                    <TableRow>
                        <TableCell>Tag</TableCell>
                        <TableCell>Value</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableParams.displayData
                        .slice(
                            tableParams.page * tableParams.rowsPerPage,
                            tableParams.page * tableParams.rowsPerPage +
                                tableParams.rowsPerPage
                        )
                        .map((item: any, index: number) => {
                            return (
                                <TableRow key={index}>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>
                                        {item.value.toString()}
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                </TableBody>
            </Table>

            <TablePagination
                component="div"
                count={tableParams.displayData.length}
                rowsPerPage={tableParams.rowsPerPage}
                page={tableParams.page}
                backIconButtonProps={{
                    'aria-label': 'Previous Page',
                }}
                nextIconButtonProps={{
                    'aria-label': 'Next Page',
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </div>
    );
};

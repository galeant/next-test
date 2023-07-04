import { useState } from 'react';
import { format } from 'date-fns';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import {
    Tooltip,
    Divider,
    Box,
    FormControl,
    InputLabel,
    Card,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    TableContainer,
    Select,
    MenuItem,
    Typography,
    useTheme,
    CardHeader,
    Grid,
    Pagination,
    Paper,
    Skeleton
} from '@mui/material';

import Label from 'src/components/Label';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';

const TableRowComponent = ({ config, withAction, row }) => {
    let colSpan = Object.keys(row).length;
    if (withAction) {
        colSpan++;
    }
    // return (
    //     <TableRow>
    //         <TableCell colSpan={colSpan}>
    //             <Skeleton variant="text" />
    //         </TableCell>
    //     </TableRow>
    // )
    return (
        <TableRow hover>
            {
                config.map((data, key) => {
                    return (
                        <TableCell align="center" key={key} style={{ whiteSpace: 'nowrap' }}>{data.toDisplay(row)}</TableCell>
                    )
                })
            }
            {
                withAction && (
                    <TableCell align="center">
                        <Tooltip title="Edit Order" arrow>
                            <IconButton
                                sx={{
                                    '&:hover': {
                                        background: theme.colors.primary.lighter
                                    },
                                    color: theme.palette.primary.main
                                }}
                                color="inherit"
                                size="small"
                            >
                                <EditTwoToneIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete Order" arrow>
                            <IconButton
                                sx={{
                                    '&:hover': { background: theme.colors.error.lighter },
                                    color: theme.palette.error.main
                                }}
                                color="inherit"
                                size="small"
                            >
                                <DeleteTwoToneIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    </TableCell>
                )
            }
        </TableRow>
    )
}

const TableComponent = ({ ...props }) => {
    const theme = useTheme();
    const [page, setPage] = useState(0);
    const handlePageChange = (_event, newPage) => {
        props.paginationHandler(newPage, 'page');
        setPage(newPage);
    };

    return (
        <Card>
            <CardHeader
                title={props.tableTitle}
            />
            <Divider />
            {props.children}
            <TableContainer style={{ width: '100%', overflowX: 'auto' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {
                                props.tableConfig.map((value, key) => {
                                    return (
                                        <TableCell align="center" key={key} style={{ whiteSpace: 'nowrap' }}> {value.label} </TableCell>
                                    )
                                })
                            }
                            {props.withAction && (
                                <TableCell align="right">Actions</TableCell>
                            )}

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            props.tableData.map((value, key) => {
                                return (
                                    <TableRowComponent
                                        key={key}
                                        config={props.tableConfig}
                                        withAction={props.withAction}
                                        row={value}
                                    />
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            {
                (props.pagination && props.pagination.total != 0) &&
                <Box
                    sx={{ p: 2 }}
                    display="flex"
                    justifyContent="center"
                >
                    <Pagination
                        count={props.pagination.lastPage}
                        page={props.pagination.currentPage}
                        variant="outlined"
                        color="primary"
                        onChange={handlePageChange}
                        size="medium"
                        shape="rounded"
                    />
                </Box>
            }
        </Card >
    );
};
export default TableComponent
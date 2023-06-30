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
    Pagination
} from '@mui/material';

import Label from 'src/components/Label';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { useDispatch } from 'react-redux';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
        field: 'age',
        headerName: 'Age',
        type: 'number',
        width: 90,
    },
    {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (params) =>
            `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
];

const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];


const TableComponent = (props) => {
    const dispatch = useDispatch();
    console.log(props)
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(5);
    const [filters, setFilters] = useState({
        status: null
    });

    const statusOptions = [
        {
            id: 'all',
            name: 'All'
        },
        {
            id: 'completed',
            name: 'Completed'
        },
        {
            id: 'pending',
            name: 'Pending'
        },
        {
            id: 'failed',
            name: 'Failed'
        }
    ];

    const handleStatusChange = (e) => {
        let value = null;

        if (e.target.value !== 'all') {
            value = e.target.value;
        }

        setFilters((prevFilters) => ({
            ...prevFilters,
            status: value
        }));
    };

    const handlePageChange = (_event, newPage) => {
        dispatch(props.action.paginationHandler({page:newPage}));
        console.log(_event,newPage)
        // setPage(newPage);
    };

    const handleLimitChange = (event) => {
        setLimit(parseInt(event.target.value));
    };
    const theme = useTheme();

    return (
        <Card>
            <CardHeader
                title={props.tableTitle}
            />
            <Divider />
            <Grid container spacing={3} m={1}>
                <Grid item width={150}>
                    <FormControl fullWidth variant="outlined">
                        <InputLabel>Status</InputLabel>
                        <Select
                            value={filters.status || 'all'}
                            onChange={handleStatusChange}
                            label="Status"
                            autoWidth
                        >
                            {statusOptions.map((statusOption) => (
                                <MenuItem key={statusOption.id} value={statusOption.id}>
                                    {statusOption.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item width={150}>
                    <FormControl fullWidth variant="outlined">
                        <InputLabel>Status</InputLabel>
                        <Select
                            value={filters.status || 'all'}
                            onChange={handleStatusChange}
                            label="Status"
                            autoWidth
                        >
                            {statusOptions.map((statusOption) => (
                                <MenuItem key={statusOption.id} value={statusOption.id}>
                                    {statusOption.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            {
                                props.tableHeader.map((value, key) => {
                                    return (
                                        <TableCell key={key}>{value.label}</TableCell>
                                    )
                                })
                            }
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            props.tableData.map((value, key) => {
                                return (
                                    <TableRow hover key={key}>
                                        {
                                            props.tableHeader.map((data, key1) => {
                                                return (<TableCell key={key1} >{value[data.dataKey]}</TableCell>)
                                            })
                                        }
                                        <TableCell align="right">
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
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            {
                (props.pagination && props.pagination.total !=0 ) && 
                <Box p={2}>
                    <Pagination 
                        count={props.pagination.lastPage} 
                        page={props.pagination.currentPage} 
                        variant="outlined" 
                        color="primary" 
                        onChange={handlePageChange}
                    />
                    {/* <TablePagination
                        component="div"
                        count={10}
                        onPageChange={handlePageChange}
                        onRowsPerPageChange={handleLimitChange}
                        page={page}
                        rowsPerPage={limit}
                        rowsPerPageOptions={[5, 10, 25, 30]}
                    /> */}
                </Box>
            }
            {/* <Box p={2}>
                <Pagination count={props.pagination.lastPage} variant="outlined" color="primary" />
                <TablePagination
                    component="div"
                    count={10}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleLimitChange}
                    page={page}
                    rowsPerPage={limit}
                    rowsPerPageOptions={[5, 10, 25, 30]}
                />
            </Box> */}
        </Card >
    );
};
export default TableComponent
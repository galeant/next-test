import { useState } from 'react';
// import { format } from 'date-fns';
// import numeral from 'numeral';
// import PropTypes from 'prop-types';
// import {
//     Tooltip,
//     Divider,
//     Box,
//     FormControl,
//     InputLabel,
//     Card,
//     IconButton,
//     Table,
//     TableBody,
//     TableCell,
//     TableHead,
//     TablePagination,
//     TableRow,
//     TableContainer,
//     Select,
//     MenuItem,
//     Typography,
//     useTheme,
//     CardHeader,
//     Grid,
//     Pagination,
//     Paper,
//     Skeleton,
//     Dialog,
//     DialogTitle,
//     DialogContent,
//     DialogContentText,
//     DialogActions,
//     Button
// } from '@mui/material';

import Label from 'src/components/Label';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';

const TableRowComponent = ({ theme, config, row, editAction, deleteAction }) => {
    return (
        <TableRow hover>
            {
                config.map((data, key) => {
                    return (
                        <TableCell align="center" key={key} style={{ whiteSpace: 'nowrap' }}>{
                            data.toDisplay(row, editAction, deleteAction)
                        }</TableCell>
                    )
                })
            }
        </TableRow>
    )
}

const DeletConfirmation = ({ open, handleDialogClose, handleDialogSubmit }) => {

    return (
        <Dialog
            open={open}
        >
            <DialogContent>
                <DialogContentText>
                    Are you sure want to delete this data?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleDialogClose}>No</Button>
                <Button onClick={handleDialogSubmit} autoFocus>
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    )
}

const TableComponent = ({ ...props }) => {
    const theme = useTheme();
    const [page, setPage] = useState(0);
    const [open, setOpen] = useState(false);
    const [dataId, setDataId] = useState(null)
    const handlePageChange = (_event, newPage) => {
        props.paginationHandler(newPage, 'page');
        setPage(newPage);
    };

    const handleDialogOpen = (id) => {
        setOpen(true);
        setDataId(id)
    };
    const handleDialogClose = () => {
        setOpen(false);
        setDataId(null)
    };

    const handleDialogSubmit = () => {
        props.deleteAction(dataId)
        setOpen(false);
        setDataId(null)
    };

    return (
        <>
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
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                props.tableData.map((value, key) => {
                                    return (
                                        <TableRowComponent
                                            theme={theme}
                                            key={key}
                                            config={props.tableConfig}
                                            withAction={props.withAction}
                                            row={value}
                                            editAction={() => props.editAction(value.id)}
                                            deleteAction={() => handleDialogOpen(value.id)}
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
            <DeletConfirmation
                open={open}
                handleDialogOpen={handleDialogOpen}
                handleDialogClose={handleDialogClose}
                handleDialogSubmit={handleDialogSubmit}
            />
        </>
    );
};
export default TableComponent
import Loading from "pages/components/loading";
import { Suspense, useEffect, useState } from "react";
import { Button, Card, Col, Container, Modal, Pagination, Row, Spinner, Table } from "react-bootstrap";
import { useSelector } from "react-redux";

const TableRow = ({ config, row, editAction, deleteAction }) => {
    return (
        <tr>
            {
                config.map((data, key) => {
                    return (
                        <td key={key} >{
                            data.toDisplay(row, editAction, deleteAction)
                        }</td>
                    )
                })
            }
        </tr>
    )
}

const TableBody = ({ config, tableData, editAction, deleteAction }) => {
    const { isLoading } = useSelector((state) => state.general)
    if (isLoading) {
        return (
            <tr><td colSpan={config.length} className="text-center"><Spinner animation="border" variant="info" /></td></tr>
        )
    }

    if (tableData.length == 0) {
        return (
            <tr><td colSpan={config.length} className="text-center">No Data</td></tr>
        )
    }
    return (
        tableData.map((value, key) => {
            return (
                <TableRow
                    key={key}
                    config={config}
                    // withAction={props.withAction}
                    row={value}
                    editAction={() => editAction(value.id)}
                    deleteAction={() => deleteAction(value.id)}
                />
            )
        })
    )
}

const TablePagination = ({ page, tableData, pagination, handlePageChange }) => {
    return (
        (tableData.length != 0 && pagination.lastPage != 1) && (
            <Pagination className="justify-content-center mt-2">
                {
                    (page > 1) && (
                        <>
                            <Pagination.First onClick={() => handlePageChange(1)}></Pagination.First>
                            <Pagination.Prev onClick={() => handlePageChange((page - 1))}></Pagination.Prev>
                        </>
                    )
                }

                {
                    [...Array(pagination.lastPage).keys()].map((v, i) => {
                        return (
                            <Pagination.Item
                                key={i}
                                active={page === (v + 1)}
                                onClick={() => handlePageChange((v + 1))}
                            >
                                {(v + 1)}
                            </Pagination.Item>
                        )
                    })
                }
                {
                    (page < pagination.lastPage) && (
                        <>
                            <Pagination.Next onClick={() => handlePageChange((page + 1))}></Pagination.Next>
                            <Pagination.Last onClick={() => handlePageChange(pagination.lastPage)}></Pagination.Last>
                        </>
                    )
                }

            </Pagination>
        )
    )
}

const DeletConfirmation = ({ open, handleDialogClose, handleDialogSubmit }) => {
    return (
        <Modal show={open} onHide={handleDialogClose}>
            <Modal.Body> Are you sure want to delete this data?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleDialogClose}>
                    No
                </Button>
                <Button variant="primary" onClick={handleDialogSubmit}>
                    Yes
                </Button>
            </Modal.Footer>
        </Modal>
    )
}


const TableWidget = ({ ...props }) => {
    const [page, setPage] = useState(props.pagination.currentPage ?? 1);
    const [open, setOpen] = useState(false);
    const [dataId, setDataId] = useState(null)

    useEffect(() => {
        setPage(props.pagination.currentPage);
    }, [props.pagination.currentPage])

    const handlePageChange = (newPage) => {
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
                {/* card body */}
                <Card.Body>
                    {props.children}
                    <Table hover className="text-nowrap" responsive={true}>
                        <thead style={{ backgroundColor: '#2ABDB2', textAlign: "center" }}>
                            <tr>
                                {
                                    props.tableConfig.map((value, key) => {
                                        return (
                                            <th key={key} style={{ whiteSpace: 'nowrap' }}> {value.label} </th>
                                        )
                                    })
                                }
                            </tr>
                        </thead>
                        <tbody style={{ textAlign: "center" }}>
                            <TableBody
                                config={props.tableConfig}
                                // withAction={props.withAction}
                                tableData={props.tableData}
                                editAction={props.editAction}
                                deleteAction={handleDialogOpen}
                            ></TableBody>
                        </tbody>
                    </Table>
                    <TablePagination
                        page={page}
                        tableData={props.tableData}
                        pagination={props.pagination}
                        handlePageChange={handlePageChange}
                    ></TablePagination>

                </Card.Body >
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

export default TableWidget
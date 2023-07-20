import Loading from "pages/components/loading";
import { useEffect, useState } from "react";
import { Card, Col, Container, Pagination, Row, Spinner, Table } from "react-bootstrap";
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
                    deleteAction={() => handleDialogOpen(value.id)}
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

const TableWidget = ({ ...props }) => {
    const [page, setPage] = useState(props.pagination.currentPage ?? 1);
    const handlePageChange = (newPage) => {
        props.paginationHandler(newPage, 'page');
        setPage(newPage);
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
                                editAction={() => props.editAction(value.id)}
                                deleteAction={() => handleDialogOpen(value.id)}
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

        </>
    );
};

export default TableWidget
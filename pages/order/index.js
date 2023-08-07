import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Card, Col, Container, Form, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getOrderList } from "redux/action/order";
import { PageHeading } from "widgets";
import TableWidget from "widgets/TableWidget";
import orderTableConfig from 'tableConfig/orderTable'
import { orderStatus } from 'enums'
import DatePicker from "react-datepicker";
import dayjs from 'dayjs';
import { setLoading } from "redux/action/general";
import Loading from "pages/components/loading";

const Search = ({ search, setSearch, searchDate, searchStatus, searchFieldHandler, searchDateFieldHandler, searchStatusFieldHandler }) => {
    return (
        <Row>
            <Col md={3}>
                <Form.Group className="mb-3">
                    <Form.Label>Search</Form.Label>
                    <Form.Control
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onBlur={(e) => searchFieldHandler((e.target.value))}
                    />
                </Form.Group>
            </Col>
            <Col md={3}>
                <Form.Group className="mb-3">
                    <Form.Label>Date</Form.Label>
                    <Row>
                        <Col md={12}>
                            <DatePicker
                                // style={{ width: "100%" }}
                                className="form-control"
                                selected={searchDate}
                                dateFormat="dd-MM-yyyy"
                                onChange={searchDateFieldHandler}
                            />
                        </Col>
                    </Row>

                </Form.Group>
            </Col>
            <Col md={3}>
                <Form.Group className="mb-3">
                    <Form.Label>Status</Form.Label>
                    <Form.Select aria-label="Default select example"
                        value={searchStatus}
                        onChange={searchStatusFieldHandler}
                    >
                        <option value=''>--Select Status--</option>
                        {
                            orderStatus(null, true).map((v) => {
                                return <option key={v.key} value={v.key}>{v.string}</option>
                            })
                        }
                    </Form.Select>
                </Form.Group>
            </Col>
        </Row>
    )
}

const OrderListPage = () => {

    const router = useRouter();
    const dispatch = useDispatch();
    const order = useSelector((state) => state.order)
    const { query, isReady } = router;
    const [search, setSearch] = useState('');
    const [searchDate, setSearchDate] = useState(null);
    const [searchStatus, setSearchStatus] = useState('');

    useEffect(() => {
        dispatch(setLoading(true))
        if (isReady) {
            dispatch(getOrderList(query))
            const { search, date, status } = query;
            setSearch(search ?? '')
            setSearchDate(date ? dayjs(date).toDate() : null)
            setSearchStatus(status ?? '')
        }
    }, [query])

    const searchFieldHandler = (value) => {
        searchHandler(value, 'search')
    }

    const searchDateFieldHandler = (date) => {
        let value = null;
        if (date != null) {
            value = dayjs(date).format('YYYY-MM-DD')
        }
        setSearchDate(date)
        searchHandler(value, 'date')

    }

    const searchStatusFieldHandler = (e) => {
        const value = e.target.value;
        setSearchStatus(value)
        searchHandler(value, 'status')
    }


    const searchHandler = (value, attr) => {
        router.query[attr] = value
        const { path, query } = router;
        if (attr !== 'page') {
            query.page = 1;
        }
        router.push({ path, query });
    }

    return (
        <Container fluid className="p-6">
            {/* Page Heading */}
            <PageHeading heading="Order" />
            <TableWidget
                tableConfig={orderTableConfig}
                tableData={order.dataList}
                pagination={order.pagination}
                paginationHandler={searchHandler}
                withAction={false}
            >
                <Search
                    search={search}
                    setSearch={setSearch}
                    searchDate={searchDate}
                    setSearchDate={setSearchDate}
                    searchStatus={searchStatus}
                    setSearchStatus={setSearchStatus}
                    searchFieldHandler={searchFieldHandler}
                    searchDateFieldHandler={searchDateFieldHandler}
                    searchStatusFieldHandler={searchStatusFieldHandler}
                ></Search>
            </TableWidget>
        </Container>
    )
}
export default OrderListPage;
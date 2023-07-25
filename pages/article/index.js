import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteArticle, getArticleList } from "redux/action/article";
import { PageHeading } from "widgets";
import TableWidget from "widgets/TableWidget";
import articleTableConfig from 'tableConfig/articleTable'
import { articleStatus } from 'enums'
import DatePicker from "react-datepicker";
import dayjs from 'dayjs';
import { setLoading } from "redux/action/general";
import Link from "next/link";

const Search = ({ search, setSearch, searchDate, searchStatus, searchFieldHandler, searchDateFieldHandler, searchStatusFieldHandler }) => {
    return (
        <Row>
            <Col md={3} className="mb-3">
                <Form.Group>
                    <Form.Label>Search</Form.Label>
                    <Form.Control
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onBlur={(e) => searchFieldHandler((e.target.value))}
                    />
                </Form.Group>
            </Col>
            <Col md={3} className="d-flex mb-3">
                <Link
                    variant="success" 
                    className="btn btn-success align-self-end"
                    href="/article/create"
                ><i className="fe fe-plus-square"></i> Create</Link>
            </Col>
        </Row>
    )
}

const PromoListPage = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const article = useSelector((state) => state.article)
    const { query, isReady } = router;
    const [search, setSearch] = useState('');
    const [searchDate, setSearchDate] = useState(null);
    const [searchStatus, setSearchStatus] = useState('');

    useEffect(() => {
        dispatch(setLoading(true))
        if (isReady) {
            dispatch(getArticleList(query))
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

    const editAction = (id) => {
        // window.open(`/promo/${id}/detail`, '_blank'); // New Table
        router.push(`order/${id}/detail`) // Redirect
    }

    const deleteAction = (id) => {
        dispatch(deleteArticle({ id, queryParams: query }))
    }


    return (

        <Container fluid className="p-6">
            {/* Page Heading */}
            <PageHeading heading="Article" />
            <TableWidget
                tableConfig={articleTableConfig}
                tableData={article.dataList}
                pagination={article.pagination}
                paginationHandler={searchHandler}
                withAction={true}
                editAction={editAction}
                deleteAction={deleteAction}
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
export default PromoListPage;
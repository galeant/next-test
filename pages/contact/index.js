import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Modal, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getOrderList } from "redux/action/order";
import { PageHeading } from "widgets";
import TableWidget from "widgets/TableWidget";
import orderTableConfig from 'tableConfig/orderTable'
import { contactType } from 'enums'
import DatePicker from "react-datepicker";
import dayjs from 'dayjs';
import { setLoading } from "redux/action/general";
import Loading from "pages/components/loading";
import { getContactList } from "redux/action/contact";
import { contactTableConfig, additionalField } from "tableConfig/contactTable"

const Search = ({ search, setSearch, searchDate, searchType, searchFieldHandler, searchDateFieldHandler, searchTypeFieldHandler }) => {
    return (
        <Row>
            <Col md={3}>
                <Form.Group className="mb-3">
                    <Form.Label>Type</Form.Label>
                    <Form.Select aria-label="Default select example"
                        value={searchType}
                        onChange={searchTypeFieldHandler}
                    >
                        <option value=''>--Select Type--</option>
                        {
                            contactType(null, true).map((v) => {
                                return <option key={v.key} value={v.key}>{v.string}</option>
                            })
                        }
                    </Form.Select>
                </Form.Group>
            </Col>
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
        </Row>
    )
}

const ModalComponent = ({
    modalShow,
    modalContent,
    handleModalClose,
    handleModalShow,

}) => {
    return (
        <>
            <Modal centered show={modalShow} onHide={handleModalClose}>
                <Modal.Body>{modalContent}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleModalClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

const ContactListPage = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const contact = useSelector((state) => state.contact)
    const { query, isReady } = router;
    const [search, setSearch] = useState('');
    const [searchDate, setSearchDate] = useState(null);
    const [searchType, setSearchType] = useState();
    const [tableConfig, setTableConfig] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [modalContent, setModalContent] = useState();

    const handleModalShow = (content) => {
        setModalContent(content)
        setModalShow(true);
    }
    const handleModalClose = () => setModalShow(false);


    useEffect(() => {
        dispatch(setLoading(true))
        if (isReady) {
            dispatch(getContactList(query))
            const { search, date, type } = query;
            setSearch(search ?? '')
            setSearchDate(date ? dayjs(date).toDate() : null)
            // setSearchType(type ?? contactType()[0].key)


            let addField = additionalField[1];
            const keyAvail = contactType().map((v) => v.key)
            if (keyAvail.includes(type)) {
                addField = additionalField[type];
            }
            const newTableConfig = contactTableConfig.concat(addField);
            setTableConfig(newTableConfig)
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

    const searchTypeFieldHandler = (e) => {
        const value = e.target.value;
        setSearchType(value)
        searchHandler(value, 'type')
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
                tableConfig={tableConfig}
                tableData={contact.dataList}
                pagination={contact.pagination}
                paginationHandler={searchHandler}
                withAction={false}
                handleModalShow={handleModalShow}
            >
                <ModalComponent
                    modalShow={modalShow}
                    modalContent={modalContent}
                    handleModalClose={handleModalClose}
                    handleModalShow={handleModalShow}
                ></ModalComponent>
                <Search
                    search={search}
                    setSearch={setSearch}
                    searchDate={searchDate}
                    setSearchDate={setSearchDate}
                    searchType={searchType}
                    setSearchType={setSearchType}

                    searchFieldHandler={searchFieldHandler}
                    searchDateFieldHandler={searchDateFieldHandler}
                    searchTypeFieldHandler={searchTypeFieldHandler}
                ></Search>
            </TableWidget>
        </Container>
    )
}
export default ContactListPage;
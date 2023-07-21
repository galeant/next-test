import { useDispatch, useSelector } from 'react-redux';
import { getOrderDetail } from 'redux/action/order';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { orderStatus, langPreference } from "enums";
import { Badge, Card, Col, Container, Form, Row, Table } from "react-bootstrap";
import Loading from 'pages/components/loading';

const OrderDetailPage = () => {
    const router = useRouter();
    const { query, isReady } = router;
    const dispatch = useDispatch();
    const order = useSelector((state) => state.order)
    const { icon, color, string } = orderStatus(order.detail.status);

    useEffect(() => {
        if (isReady) {
            dispatch(getOrderDetail(query.id))
        }

    }, [isReady])
    return (
        <Loading>
            <Container fluid className="p-6">
                <Row>
                    <Col md={8}>
                        <Card>
                            <Card.Header>
                                <Row>
                                    <Col >
                                        <h4>Customer</h4>
                                    </Col>
                                    <Col md={2}>
                                        <Badge pill bg={color} className="p-2">{string} {icon()}</Badge>
                                    </Col>
                                </Row>


                            </Card.Header>
                            <Card.Body>
                                <Row>
                                    <Col md={4}>
                                        <h6 className="text-uppercase fs-5">Name</h6>
                                        <p className="mb-2">{order.detail.contact_name}</p>
                                    </Col>
                                    <Col md={4}>
                                        <h6 className="text-uppercase fs-5">Email</h6>
                                        <p className="mb-2">{order.detail.contact_email}</p>
                                    </Col>
                                    <Col md={4}>
                                        <h6 className="text-uppercase fs-5">Phone</h6>
                                        <p className="mb-2">{order.detail.contact_phone}</p>
                                    </Col>
                                    <Col md={4}>
                                        <h6 className="text-uppercase fs-5">Lang Pref</h6>
                                        <p className="mb-2"><img src={langPreference(order.detail.lang_preference).src}></img></p>
                                    </Col>
                                    <Col md={4}>
                                        <h6 className="text-uppercase fs-5">Province</h6>
                                        <p className="mb-2">{order.detail.province}</p>
                                    </Col>
                                    <Col md={4}>
                                        <h6 className="text-uppercase fs-5">City</h6>
                                        <p className="mb-2">{order.detail.city}</p>
                                    </Col>
                                    <Col md={4}>
                                        <h6 className="text-uppercase fs-5">District</h6>
                                        <p className="mb-2">{order.detail.district}</p>
                                    </Col>
                                    <Col md={4}>
                                        <h6 className="text-uppercase fs-5">Sub District</h6>
                                        <p className="mb-2">{order.detail.sub_district}</p>
                                    </Col>
                                    <Col md={4}>
                                        <h6 className="text-uppercase fs-5">Postal</h6>
                                        <p className="mb-2">{order.detail.postal_code}</p>
                                    </Col>
                                    <Col md={4}>
                                        <h6 className="text-uppercase fs-5">Address</h6>
                                        <p className="mb-2">{order.detail.address}</p>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card>
                            <Card.Header><h4>Promo & Order</h4></Card.Header>
                            <Card.Body>
                                <Row>
                                    <Col xs={7} className="mb-5">
                                        <Table className="text-nowrap">
                                            <thead style={{ backgroundColor: "#2ABDB2" }}>
                                                <tr>
                                                    <th>Item</th>
                                                    <th>Qty</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    (order.detail.details !== undefined) && order.detail.details.map((value, key) => {
                                                        return (
                                                            <tr key={key}>
                                                                <td><b>{value.product_name}</b></td>
                                                                <td>{value.qty}</td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </Table>
                                    </Col>
                                    <Col xs={5} className="mb-5">
                                        <h6 className="text-uppercase fs-5 ls-2">Promo Code</h6>
                                        <p className="mb-0">
                                            <a href={`/promo/${order.detail.promo && order.detail.promo.id}/detail`} target="_blank" >#{order.detail.promo_code}</a >
                                        </p>
                                    </Col>

                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container >
        </Loading >
    )
}

export default OrderDetailPage;
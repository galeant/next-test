// import node module libraries
import { Fragment, useEffect, useState } from "react";
import Link from 'next/link';
import { Table, Container, Col, Row, Card, Badge, Button } from 'react-bootstrap';

// import widget/custom components
import { StatRightTopIcon } from "widgets";

// import sub components
import { ActiveProjects, Teams, TasksPerformance } from "sub-components";

// import required data files
import ProjectsStatsData from "data/dashboard/ProjectsStatsData";
import Loading from "./components/loading";
import { useDispatch, useSelector } from "react-redux";
import { getOrderList } from "redux/action/order";
import { orderStatus } from "enums";
import { useRouter } from "next/router";

const Home = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const order = useSelector((state) => state.order)

    useEffect(() => {
        dispatch(getOrderList({ limit: 10, all: true }))
    }, [])
    
    return (
        <Fragment>
            <div className="bg-primary pt-10 pb-21"></div>
            <Container fluid className="mt-n22 px-6">
                <Row>
                    <Col md={4}>
                        <TasksPerformance />
                    </Col>
                    {/* card  */}
                    <Col md={8}>
                        <Card className="h-100">
                            <Card.Header className="bg-white py-4">
                                <h4 className="mb-0">Latest Order </h4>
                            </Card.Header>
                            <Table responsive className="text-nowrap">
                                <thead className="table-light">
                                    <tr>
                                        <th>Status</th>
                                        <th>Name</th>
                                        <th>City</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        order.dataList.map((v, k) => {
                                            const { icon, color, string } = orderStatus(v.status);
                                            return (
                                                <tr key={k}>
                                                    <td><Badge pill bg={color} className="p-2">{icon()} {string}</Badge></td>
                                                    <td>{v.contact_name}</td>
                                                    <td>{v.city}</td>
                                                    <td>{v.contact_email}</td>
                                                    <td>{v.contact_phone}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                    <tr>
                                        <td className="text-center" colSpan={5}>
                                            <div className="d-grid gap-2">
                                                <Button
                                                    variant="primary"
                                                    onClick={() => router.push('/order')}
                                                >
                                                    Show All
                                                </Button>

                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Fragment >
    )
}
export default Home;

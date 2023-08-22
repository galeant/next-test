// import node module libraries
import { Fragment, useEffect, useState } from "react";
import Link from 'next/link';
import { Container, Col, Row } from 'react-bootstrap';

// import widget/custom components
import { StatRightTopIcon } from "widgets";

// import sub components
import { ActiveProjects, Teams, TasksPerformance } from "sub-components";

// import required data files
import ProjectsStatsData from "data/dashboard/ProjectsStatsData";
import Loading from "./components/loading";

const Home = () => {
    return (
        <Fragment>
            <div className="bg-primary pt-10 pb-21"></div>
            <Container fluid className="mt-n22 px-6">
                <Row>
                    <Col xl={4} lg={12} md={12} xs={12}>
                        <TasksPerformance />

                    </Col>
                    {/* card  */}
                    <Col xl={8} lg={12} md={12} xs={12}>

                        {/* Teams  */}
                        <Teams />

                    </Col>
                </Row>
            </Container>
        </Fragment>
    )
}
export default Home;

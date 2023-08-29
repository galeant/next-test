// import node module libraries
import React, { useEffect, useState } from "react";
import Link from 'next/link';
import { Card, Dropdown, Button } from 'react-bootstrap';
import { MoreVertical } from 'react-feather';
import dynamic from 'next/dynamic'
import { contactType, summaryTimePeriod } from "enums";
import { useDispatch, useSelector } from "react-redux";
import { getContactSummary } from "redux/action/contact";
import { setLoading } from "redux/action/general";
import { useRouter } from "next/router";

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const TasksPerformance = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const contactSummary = useSelector((state) => state.contact.summary)
    useEffect(() => {
        dispatch(setLoading(true))
        dispatch(getContactSummary())
    }, [])

    const options = {
        labels: contactType().map((v) => v.string),
        legend: {
            show: true,
            position: 'bottom',
        },

    };
    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
        (<Link
            href=""
            ref={ref}
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}
            className="text-muted text-primary-hover">
            {children}
        </Link>)
    ));

    CustomToggle.displayName = 'CustomToggle';

    const handlerDropdownClick = (key) => {
        console.log(key)
        dispatch(getContactSummary({ period: key }))
    }

    const ActionMenu = () => {
        return (
            <Dropdown>
                <Dropdown.Toggle as={CustomToggle}>
                    <MoreVertical size="15px" className="text-muted" />
                </Dropdown.Toggle>
                <Dropdown.Menu align={'end'}>
                    {
                        summaryTimePeriod.map((v) => (
                            <Dropdown.Item
                                key={v.key} eventKey={v.key}
                                onClick={() => handlerDropdownClick(v.key)}
                            >
                                {v.string}
                            </Dropdown.Item>
                        ))
                    }
                </Dropdown.Menu>
            </Dropdown>
        );
    };

    return (
        <Card>
            {/* card body  */}
            <Card.Body>
                <div className="d-flex align-items-center justify-content-between">
                    <div>
                        <h4 className="mb-0">Contact Summary </h4>
                        <h6 className="mb-0">{contactSummary.startDate} - {contactSummary.endDate}</h6>
                    </div>
                    <ActionMenu />
                </div>
                <div className="mb-8">
                    <Chart options={options} series={contactSummary.data} type="pie" />
                </div>
                <div className="d-grid gap-2">
                    <Button
                        variant="primary"
                        onClick={() => router.push('/contact')}
                    >
                        Show All
                    </Button>

                </div>
            </Card.Body>
        </Card>
    )
}

export default TasksPerformance
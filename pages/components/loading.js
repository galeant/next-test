import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "redux/action/general";

const Loading = (props) => {
    const dispatch = useDispatch();
    const { isLoading, errCode } = useSelector((state) => state.general)
    const { isReady } = useRouter();

    useEffect(() => {
        if (isReady) {
            dispatch(setLoading(false));
        }
    }, [isReady]);

    if (isLoading) {
        return (
            <div className="text-center" style={{ marginTop: "40%" }}>
                <Spinner animation="grow" variant="primary" className="me-2" />
                <Spinner animation="grow" variant="secondary" className="me-2" />
                <Spinner animation="grow" variant="success" className="me-2" />
                <Spinner animation="grow" variant="danger" className="me-2" />
                <Spinner animation="grow" variant="warning" className="me-2" />
                <Spinner animation="grow" variant="info" className="me-2" />
                <Spinner animation="grow" variant="dark" />
            </div>
        );
    }

    return (
        <>{props.children}</>
    );
};
export default Loading;

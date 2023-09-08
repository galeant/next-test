// import node module libraries
import { Row, Col, Card, Form, Button, Image, Spinner } from 'react-bootstrap';
import Link from 'next/link';

// import authlayout to override default layout 
import AuthLayout from 'layouts/AuthLayout';
import { useDispatch, useSelector } from 'react-redux';
import { Suspense, useEffect } from 'react';
import { useRouter } from 'next/router';
import { login } from 'redux/action/auth';
import { setLoading } from 'redux/action/general';
import Loading from './components/loading';
import { useCookies } from 'react-cookie';

const LoginComponent = ({ handleSubmit }) => {
    return (
        <Row className="align-items-center justify-content-center g-0 min-vh-100">
            <Col xxl={4} lg={6} md={8} xs={12} className="py-8 py-xl-0">
                {/* Card */}
                <Card className="smooth-shadow-md">
                    {/* Card body */}
                    <Card.Body className="p-6">
                        <div className="mb-4">
                            <Link href="/"><Image src="/images/brand/logo/logo-primary.svg" className="mb-2" alt="" /></Link>
                        </div>
                        {/* Form */}
                        <Form onSubmit={handleSubmit}>
                            {/* Username */}
                            <Form.Group className="mb-3" controlId="username">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" name="email" placeholder="Enter address here" required="" />
                            </Form.Group>

                            {/* Password */}
                            <Form.Group className="mb-3" controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name="password" placeholder="**************" required="" />
                            </Form.Group>

                            <div>
                                {/* Button */}
                                <div className="d-grid">
                                    <Button variant="primary" type="submit">Sign In</Button>
                                </div>
                                <div className="d-md-flex justify-content-between mt-4">
                                    <div>
                                        <Link href="/authentication/forget-password" className="text-inherit fs-5">Forgot your password?</Link>
                                    </div>
                                </div>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
        </Row >
    );
}



const LoginPage = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { token, intendedPath,user } = useSelector((state) => state.auth)
    const { errCode, message } = useSelector((state) => state.general)
    const [cookies, setCookie] = useCookies(['user']);

    useEffect(() => {
        console.log(intendedPath)
        if (token !== null) {
            dispatch(setLoading(true));
            router.push(intendedPath)

            setCookie('token',token, { path: '/' });
            setCookie('user',user, { path: '/' });
        }
    }, [token]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const payload = {
            email: data.get("email"),
            password: data.get("password"),
        }
        dispatch(setLoading(true));
        dispatch(login(payload));
    };

    return (
        <Loading>
            <LoginComponent handleSubmit={handleSubmit}></LoginComponent>
        </Loading>
    )
}

LoginPage.Layout = AuthLayout;

export default LoginPage
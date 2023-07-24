import { useDispatch, useSelector } from 'react-redux';
import { getOrderDetail, postPromo } from 'redux/action/promo';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { orderStatus, langPreference } from "enums";
import { Badge, Button, Card, Col, Container, Form, Image, Row, Table } from "react-bootstrap";
import Loading from 'pages/components/loading';
import DatePicker from "react-datepicker";
import CKEditor from "widgets/CKEditor";
import { Controller, useForm } from 'react-hook-form'
import { promoStatus } from 'enums';

const PromoInputForm = (props) => {
    const [editorLoaded, setEditorLoaded] = useState(false);
    const [previewPromoImage, setPreviewPromoImage] = useState();
    const [previewPromoThumbnail, setPreviewPromoThumbnail] = useState();
    const router = useRouter();
    const { query, isReady } = router;
    const dispatch = useDispatch();
    const { control, register, handleSubmit, reset, setValue } = useForm();

    useEffect(() => {
        if (isReady) {
            setEditorLoaded(true);
        }
        reset(props.data)
        setPreviewPromoImage(props.data.promo_image)
        setPreviewPromoThumbnail(props.data.promo_thumbnail)
    }, [isReady, props.data])


    const onSubmit = (data) => {
        dispatch(postPromo(data,props.id))
        router.push('/promo')
    };

    return (
        <Loading>
            <Container fluid className="p-6">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Card>
                        <Card.Body>
                            <Row>
                                <Col className="mb-3" md={8}>
                                    <Form.Group>
                                        <Form.Label>Title</Form.Label>
                                        <Form.Control
                                            type="text"
                                            {...register('title')}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col className="mb-3" md={2}>
                                    <Form.Group>
                                        <Form.Label>Status</Form.Label>
                                        <Form.Select
                                            {...register('status')}
                                        >
                                            {
                                                promoStatus().map((v, i) => {
                                                    return <option value={v.key} key={i}>{v.string}</option>
                                                })
                                            }

                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col className="mb-3" md={2}>
                                    <Form.Group>
                                        <Form.Label>Promo National</Form.Label>
                                        <Form.Select
                                            {...register('national_promo')}
                                        >
                                            <option>No</option>
                                            <option>Yes</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col className="mb-3" md={3}>
                                    <Form.Group>
                                        <Form.Label>Code</Form.Label>
                                        <Form.Control
                                            type="text"
                                            {...register('voucher_code')}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col className="mb-3" md={3}>
                                    <Form.Group>
                                        <Form.Label>Start Date</Form.Label>
                                        <Row>
                                            <Col md={12}>
                                                <Controller
                                                    control={control}
                                                    name='start_date'
                                                    render={({ field }) => (
                                                        <DatePicker
                                                            className="form-control"
                                                            dateFormat="dd-MM-yyyy"
                                                            onChange={(date) => field.onChange(date)}
                                                            selected={field.value}
                                                        />
                                                    )}
                                                />

                                            </Col>
                                        </Row>
                                    </Form.Group>
                                </Col>
                                <Col className="mb-3" md={3}>
                                    <Form.Group>
                                        <Form.Label>End Date</Form.Label>
                                        <Row>
                                            <Col md={12}>
                                                <Controller
                                                    control={control}
                                                    name='end_date'
                                                    render={({ field }) => (
                                                        <DatePicker
                                                            className="form-control"
                                                            dateFormat="dd-MM-yyyy"
                                                            onChange={(date) => field.onChange(date)}
                                                            selected={field.value}
                                                        />
                                                    )}
                                                />
                                            </Col>
                                        </Row>
                                    </Form.Group>
                                </Col>
                                <Col className="mb-3" md={3}>
                                    <Form.Group>
                                        <Form.Label>Max Redeem</Form.Label>
                                        <Form.Control
                                            type="number"
                                            {...register('max_redeem')}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col className="mb-3" md={12}>
                                    <Form.Group>
                                        <Form.Label>Term & Condition</Form.Label>
                                        <Controller
                                            control={control}
                                            name='terms_cond'
                                            render={({ field }) => (
                                                <CKEditor
                                                    name="description"
                                                    onChange={(data) => {
                                                        field.onChange(data)
                                                    }}
                                                    value={field.value}
                                                    editorLoaded={editorLoaded}
                                                />
                                            )}
                                        />

                                    </Form.Group>
                                </Col>
                                <Col className="mb-3" md={2}>
                                    <Form.Group>
                                        <Form.Label>Galon + isi</Form.Label>
                                        <Form.Control
                                            type="number"
                                            {...register('galon')}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col className="mb-3" md={2}>
                                    <Form.Group>
                                        <Form.Label>Refill Galon</Form.Label>
                                        <Form.Control
                                            type="number"
                                            {...register('refill_galon')}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col className="mb-3" md={2}>
                                    <Form.Group>
                                        <Form.Label>1500ml</Form.Label>
                                        <Form.Control
                                            type="number"
                                            {...register('lima_belas_lt')}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col className="mb-3" md={2}>
                                    <Form.Group>
                                        <Form.Label>600ml</Form.Label>
                                        <Form.Control
                                            type="number"
                                            {...register('enam_ratus_ml')}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col className="mb-3" md={2}>
                                    <Form.Group>
                                        <Form.Label>400ml</Form.Label>
                                        <Form.Control
                                            type="number"
                                            {...register('empat_ratus_ml')}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col className="mb-3" md={6}>
                                    <Form.Group>
                                        <Form.Label>Image</Form.Label>
                                        <Row>
                                            <Col>
                                                <Image src={previewPromoImage ?? "https://placehold.co/367x338 "} thumbnail style={{ minWidth: "367px", minHeight: "338px" }} />
                                            </Col>
                                        </Row>

                                        {/* <Image src="https://placehold.co/367x338" thumbnail /> */}
                                        <Form.Control
                                            type="file"
                                            {...register('promo_image', {
                                                onChange: (e) => {
                                                    const file = URL.createObjectURL(e.target.files[0])
                                                    setPreviewPromoImage(file)
                                                }
                                            })}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col className="mb-3" md={6}>
                                    <Form.Group>
                                        <Form.Label>Thumbnail</Form.Label>
                                        <Row>
                                            <Col>
                                                <Image src={previewPromoThumbnail ?? "https://placehold.co/350x200"} thumbnail style={{ minWidth: "350px", minHeight: "200px" }} />
                                            </Col>
                                        </Row>

                                        {/* <Image src="https://placehold.co/367x338" thumbnail /> */}
                                        <Form.Control
                                            type="file"
                                            {...register('promo_thumbnail', {
                                                onChange: (e) => {
                                                    const file = URL.createObjectURL(e.target.files[0])
                                                    setPreviewPromoThumbnail(file)
                                                }
                                            })}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={12} className='d-grid'>
                                    <Button type="submit" className="btn btn-block" variant="success" size="lg">Save</Button>
                                </Col>
                            </Row>

                        </Card.Body>
                    </Card>

                </form>
            </Container >
        </Loading >
    )
}

export default PromoInputForm;
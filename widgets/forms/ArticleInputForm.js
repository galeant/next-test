import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {  articleStatus } from "enums";
import { Badge, Button, Card, Col, Container, Form, Image, Row, Table } from "react-bootstrap";
import Loading from 'pages/components/loading';
import DatePicker from "react-datepicker";
import CKEditor from "widgets/CKEditor";
import { Controller, useForm } from 'react-hook-form'
import { postArticle } from 'redux/action/article';

const ArticleInputForm = (props) => {
    const [editorLoaded, setEditorLoaded] = useState(false);
    const [previewBanner, setPreviewBanner] = useState();
    const router = useRouter();
    const { query, isReady } = router;
    const dispatch = useDispatch();
    const { control, register, handleSubmit, reset, setValue } = useForm();

    useEffect(() => {
        if (isReady) {
            setEditorLoaded(true);
        }
        reset(props.data)
        setPreviewBanner(props.data.banner)
        console.log(props.data);
    }, [isReady, props.data])

    const onSubmit = (data) => {
        dispatch(postArticle(data,props.id))
    };

    return (
        <Loading>
            <Container fluid className="p-6">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Card>
                        <Card.Body>
                            <Row>
                                <Col className="mb-3" md={6}>
                                    <Form.Group>
                                        <Form.Label>Title</Form.Label>
                                        <Form.Control
                                            type="text"
                                            {...register('title.id')}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col className="mb-3" md={6}>
                                    <Form.Group>
                                        <Form.Label>Slug</Form.Label>
                                        <Form.Control
                                            type="text"
                                            {...register('slug.id')}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col className="mb-3" md={6}>
                                    <Form.Group>
                                        <Form.Label>Meta Title</Form.Label>
                                        <Form.Control
                                            type="text"
                                            {...register('meta_title')}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col className="mb-3" md={6}>
                                    <Form.Group>
                                        <Form.Label>Meta Keyword</Form.Label>
                                        <Form.Control
                                            type="text"
                                            {...register('meta_keyword')}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col className="mb-3" md={12}>
                                    <Form.Group>
                                        <Form.Label>Meta Description</Form.Label>
                                        <Form.Control
                                            type="text"
                                            {...register('meta_description')}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col className="mb-3" md={6}>
                                    <Form.Group>
                                        <Form.Label>Published At</Form.Label>
                                        <Row>
                                            <Col md={12}>
                                                <Controller
                                                    control={control}
                                                    name='published_at'
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
                                <Col className="mb-3" md={6}>
                                    <Form.Group>
                                        <Form.Label>Status</Form.Label>
                                        <Form.Select
                                            {...register('status')}
                                        >
                                            {
                                                articleStatus().map((v, i) => {
                                                    return <option value={i} key={i}>{v.string}</option>
                                                })
                                            }

                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col className="mb-3" md={12}>
                                    <Form.Group>
                                        <Form.Label>Content</Form.Label>
                                        <Controller
                                            control={control}
                                            name='content.id'
                                            render={({ field }) => (
                                                <CKEditor
                                                    name="content.id"
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
                                <Col className="mb-3" md={6}>
                                    <Form.Group>
                                        <Form.Label>Image</Form.Label>
                                        <Row>
                                            <Col>
                                                <Image src={previewBanner ?? "https://placehold.co/600x345 "} thumbnail style={{ minWidth: "600px", minHeight: "345px" }} />
                                            </Col>
                                        </Row>

                                        {/* <Image src="https://placehold.co/367x338" thumbnail /> */}
                                        <Form.Control
                                            type="file"
                                            {...register('banner', {
                                                onChange: (e) => {
                                                    const file = URL.createObjectURL(e.target.files[0])
                                                    setPreviewBanner(file)
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

export default ArticleInputForm;
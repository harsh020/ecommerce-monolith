import React, {useEffect, useState} from 'react';
import {Row, Col, Card, Image, ListGroup, Button, Form, ToastContainer} from "react-bootstrap";
import {useSelector, useDispatch} from "react-redux";
import {useParams, useNavigate, Link} from "react-router-dom";
import {Toast} from "react-bootstrap";

import LinkButton from "../components/ui/LinkButton";
import classes from './style/ProductScreen.module.css';
import Rating from "../components/ui/Rating";
import {productDetails} from "../store/product/productActions";
import {createReview} from "../store/review/reviewActions";
import Loader from "../components/ui/Loader";
import Message from "../components/ui/Message";
import {addToCart} from "../store/cart/cartActions";
import {REVIEW_CREATE_RESET} from "../store/review/reviewConstants";
import {HELPERS} from "../utils/helpers";

const initialReviewState = {
    rating: '0',
    comment: ''
}

function ProductScreen(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userLogin = useSelector(state => state.userLogin);
    const { user : loggedIn } = userLogin;

    const prodDetails = useSelector(state => state.productDetails);
    let {error, loading, product} = prodDetails;

    if(!product) loading = true; // Wierd behaviour: as useEffect is not triggering immediately

    const reviewCreate = useSelector(state => state.reviewCreate);
    const {error : createError, loading : createLoading, success : createSuccess} = reviewCreate;

    const {productId} = useParams();

    const [qty, setQty] = useState(1);
    const [showToast, setShowToast] = useState(false);
    const [reviewDetailState, setReviewDetailState] = useState(initialReviewState);

    useEffect(() => {
        if(createSuccess) {
            setReviewDetailState(initialReviewState);
            dispatch({type: REVIEW_CREATE_RESET});
        }
        dispatch(productDetails(productId));
    }, [dispatch, productId, createSuccess]);

    const addToCartHandler = (e) => {
        e.preventDefault();
        dispatch(addToCart(productId, Number(qty)));
        setShowToast(true);
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(createReview({
            author: loggedIn.id,
            product: Number(productId),
            ...reviewDetailState
        }))
    }

    return (
        <React.Fragment>
            {
                (showToast &&
                    <ToastContainer position={'top-center'} className={classes['toast-container']}>
                        <Toast bg={'light'}
                               onClose={() => setShowToast(false)}
                               animation autohproductIde delay={1500}>
                            <Toast.Header>
                                <i className={'fas fa-check-circle'} style={{color: 'green',}}/>
                                <strong className={'me-auto mx-2'}>Item added to cart!</strong>
                            </Toast.Header>
                        </Toast>
                    </ToastContainer>
                )
            }
            <LinkButton link={'/'} className={`btn btn-light ${classes['home-btn']}`}>
                <i className="fas fa-caret-left" /> Go Back
            </LinkButton>
            <div className={'mt-2'}>
                {
                    loading ? <Loader/>
                        : error ? <Message variant={'danger'}>{error}</Message>
                            :
                            <div>
                                <Row>
                                    <Col md={5}>
                                        <Image src={HELPERS.backendUrl + product.image} alt={product.name} fluid />
                                    </Col>

                                    <Col md={4}>
                                        <ListGroup variant={'flush'}>
                                            <ListGroup.Item>
                                                <h4>{product.name}</h4>
                                            </ListGroup.Item>

                                            <ListGroup.Item>
                                                <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'}/>
                                            </ListGroup.Item>

                                            <ListGroup.Item>
                                                Price: ${product.price}
                                            </ListGroup.Item>

                                            <ListGroup.Item>
                                                Seller: {`${product.seller && product.seller.name}`}
                                            </ListGroup.Item>

                                            <ListGroup.Item>
                                                {product.description}
                                            </ListGroup.Item>

                                        </ListGroup>
                                    </Col>

                                    <Col md={3}>
                                        <Card>
                                            <ListGroup variant={'flush'}>
                                                <ListGroup.Item>
                                                    <Row>
                                                        <Col md={6}>
                                                            Price
                                                        </Col>
                                                        <Col md={6}>
                                                            <strong>${product.price}</strong>
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>

                                                <ListGroup.Item>
                                                    <Row>
                                                        <Col md={6}>
                                                            Status
                                                        </Col>
                                                        <Col md={6}>
                                                            <strong>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</strong>
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>

                                                {product.countInStock > 0 && (
                                                    <ListGroup.Item>
                                                        <Row>
                                                            <Col md={6}>
                                                                Qty
                                                            </Col>
                                                            <Col xs={'auto'} md={6} className={'my-1'}>
                                                                <Form.Control
                                                                    as={'select'}
                                                                    value={qty}
                                                                    className={classes['quantity-selector']}
                                                                    onChange={(e) => setQty(Number(e.target.value))}
                                                                >
                                                                    {
                                                                        [...Array(product.countInStock).keys()].map((c) => (
                                                                            <option
                                                                                key={c + 1}
                                                                                value={c + 1}>
                                                                                {c + 1}
                                                                            </option>
                                                                        ))
                                                                    }
                                                                </Form.Control>

                                                            </Col>
                                                        </Row>
                                                    </ListGroup.Item>
                                                )}

                                                <ListGroup.Item>
                                                    <Button
                                                        className={'btn-block'}
                                                        type={'button'}
                                                        disabled={!(product.countInStock > 0)}
                                                        style={{width: '100%'}}
                                                        onClick={addToCartHandler}>
                                                        Add to Cart
                                                    </Button>
                                                </ListGroup.Item>
                                            </ListGroup>


                                        </Card>
                                    </Col>
                                </Row>

                                <Row className={'mt-5'}>
                                    <Col md={6}>
                                        <h3>Reviews</h3>
                                        {product.reviews.length === 0 && <Message variant={'info'}>No reviews!</Message>}
                                        <ListGroup variant={'flush'}>
                                            {
                                                product.reviews.map(review => (
                                                    <ListGroup.Item key={review.id}>
                                                        <strong>{review.author.name}</strong>
                                                        <Rating value={review.rating} color={'#f8e825'}/>
                                                        <p>{HELPERS.getDateTime(review.created)}</p>
                                                        <p>{review.comment}</p>
                                                    </ListGroup.Item>
                                                ))
                                            }
                                        </ListGroup>
                                    </Col>
                                    <Col md={6}>
                                        <ListGroup variant={'flush'}>
                                            <h4>Write a review</h4>
                                            <ListGroup.Item className={'mt-3'}>

                                                {createLoading && <Loader />}
                                                {createSuccess && <Message variant='success'>Review Submitted</Message>}
                                                {createError && <Message variant='danger'>{createError}</Message>}
                                                {
                                                    loggedIn ? (
                                                        <Form onSubmit={submitHandler}>
                                                            <Form.Group>
                                                                <Form.Label>Rating</Form.Label>
                                                                <Form.Control
                                                                    as={'select'}
                                                                    value={reviewDetailState.rating}
                                                                    onChange={(e) => {
                                                                        setReviewDetailState({
                                                                            ...reviewDetailState,
                                                                            rating: e.target.value
                                                                        })
                                                                    }}>
                                                                    <option value=''>Select...</option>
                                                                    <option value='1'>1 - Poor</option>
                                                                    <option value='2'>2 - Fair</option>
                                                                    <option value='3'>3 - Good</option>
                                                                    <option value='4'>4 - Very Good</option>
                                                                    <option value='5'>5 - Excellent</option>
                                                                </Form.Control>
                                                            </Form.Group>

                                                            <Form.Group>
                                                                <Form.Label>Review</Form.Label>
                                                                <Form.Control
                                                                    as={'textarea'}
                                                                    row={'5'}
                                                                    value={reviewDetailState.comment}
                                                                    onChange={(e) => {
                                                                        setReviewDetailState({
                                                                            ...reviewDetailState,
                                                                            comment: e.target.value
                                                                        })
                                                                    }} />
                                                            </Form.Group>

                                                            <Button
                                                                disabled={createLoading}
                                                                type='submit'
                                                                variant='primary'
                                                                className={'mt-2'}
                                                            >
                                                                Submit
                                                            </Button>
                                                        </Form>
                                                    ) : (
                                                        <Message variant={'info'}>Please <Link to={'/app/login'}>login</Link> to write a review.</Message>
                                                    )
                                                }
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Col>
                                </Row>
                            </div>
                }
            </div>
        </React.Fragment>

    );
}

export default ProductScreen;
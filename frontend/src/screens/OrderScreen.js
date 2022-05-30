import React, {useEffect, useState} from 'react';
import {loadScript} from '@paypal/paypal-js';
import {PayPalButton} from 'react-paypal-button-v2'
import {Button, Card, Col, Form, FormGroup, Image, ListGroup, Row} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {Link, useNavigate, useParams } from "react-router-dom";
import Message from "../components/ui/Message";
import {getOrderDetails, payOrder, updateOrder} from '../store/order/orderActions';
import Loader from "../components/ui/Loader";
import {HELPERS} from "../utils/helpers";

import {ORDER_PAY_RESET, ORDER_UPDATE_RESET} from "../store/order/orderConstants";


function OrderScreen(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {orderId} = useParams();

    const orderDetails = useSelector(state => state.orderDetails)
    let { loading, order, error } = orderDetails;

    const orderUpdate = useSelector(state => state.orderUpdate)
    let { loading : updateLoading, error : updateError, success : updateSuccess } = orderUpdate;

    const orderPay = useSelector(state => state.orderPay)
    const { loading: payLoading, success: successPay } = orderPay;

    const userLogin = useSelector(state => state.userLogin);
    const { user : loggedIn } = userLogin;

    const [paypalSDKReady, setPaypalSDKReady] = useState(false);
    const [paypalSDKError, setPaypalSDKError] = useState('');
    // const [orderStatus, setOrderStatus] = useState('');

    const orderStatuses = HELPERS.orderStatus();

    if(loading === undefined) loading = true;
    if(error === undefined) error = false;

    let totalPrice = 0;

    if(!loading && !error) {
        totalPrice = (+order.totalAmount + +order.taxAmount + +order.shippingAmount);
        totalPrice = totalPrice.toFixed(2);
    }

    useEffect(() => {
        const loadPaypal = async () => {
            try {
                await loadScript({ "client-id": "AUQXhsC77GrkcWGM_Bf_8u9JDLcyf1rWd40IQQ3zAl8waebBx6eodBEqDW8zjYNffZc93rLz1wn4Tx2b" });
                setPaypalSDKReady(true);
                setPaypalSDKError('');
            } catch (error) {
                setPaypalSDKReady(false);
                setPaypalSDKError(error.message);
            }
        }

        if(!loggedIn) {
            navigate('/app/login');
        }

        if(!order || successPay || order.id !== Number(orderId) || updateSuccess) {
            dispatch({type: ORDER_PAY_RESET});
            dispatch({type: ORDER_UPDATE_RESET});

            dispatch(getOrderDetails(orderId));
        }
        else if(order.payment.payment_status !== 'SF' && !window.paypal) {
            loadPaypal();
        }
    }, [dispatch, order, orderId, successPay, updateSuccess, paypalSDKReady, paypalSDKError]);

    const successPaymentHandler = (paymentResult) => {
        if(paymentResult.status === 'COMPLETED') {
            dispatch(payOrder(orderId, 'SF'));
        }
    }

    const orderStatusChangeHandler = (e) => {
        const data = {
            status: e.target.value,
        };

        dispatch(updateOrder(order.id, data));
    }

    return  loading ? (
        <Loader />
    ) : error ? (
        <Message variant={'danger'}>{error}</Message>
    ) : (
        <React.Fragment>
            <h1 className={'my-2 mb-4'}>Order #{orderId}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant={'flush'}>
                        <ListGroup.Item>
                            <h3>Shipping Details</h3>
                            <p>
                                <strong>Shipping: </strong>
                                {order.shippingAddress.address},<br />
                                {order.shippingAddress.city}, {order.shippingAddress.state}, <br />
                                {order.shippingAddress.country} ({order.shippingAddress.pincode}) <br />
                                {HELPERS.orderStatusDecoder(order)}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h3>Payment Method</h3>
                            <p>
                                <strong>Method: </strong>
                                {order.payment.paymentMethod}<br />
                                {HELPERS.paymentStatusDecoder(order.payment)}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h3>Order Items</h3>
                            {order.productItems.length === 0 ?
                                <Message variant={'info'}>
                                    Your order is empty!
                                </Message> : (
                                    <ListGroup variant={'flush'}>
                                        {order.productItems.map(item => (
                                            <ListGroup.Item key={item.id}>
                                                <Row>
                                                    <Col md={1}>
                                                        <Image src={HELPERS.backendUrl + item.product.image} fluid rounded alt={item.product.name} />
                                                    </Col>

                                                    <Col>
                                                        <Link to={`/app/product/${item.product.slug}`}>{item.product.name}</Link>
                                                    </Col>

                                                    <Col md={4}>
                                                        {item.quantity} X ${item.product.price} = ${(item.quantity * item.product.price).toFixed(2)}
                                                    </Col>

                                                </Row>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col md={4}>
                    <h2>Order Summary</h2>
                    <Card >
                        <ListGroup variant={'flush'}>
                            <ListGroup.Item>
                                <Row className={'my-1'}>
                                    <Col md={8}>Total Items</Col>
                                    <Col md={4}>{order.productItems.length}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row className={'my-1'}>
                                    <Col md={8}>Subtotal</Col>
                                    <Col md={4}>${order.totalAmount}</Col>
                                </Row>

                                <Row className={'my-1'}>
                                    <Col md={8}>Tax</Col>
                                    <Col md={4}>${order.taxAmount}</Col>
                                </Row>

                                <Row className={'my-1'}>
                                    <Col md={8}>Shipping</Col>
                                    <Col md={4}>${order.shippingAmount}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row className={'my-1'}>
                                    <Col md={8}>Total</Col>
                                    <Col md={4}>${totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                        </ListGroup>

                    </Card>

                    {
                        order.payment.paymentStatus !== 'SF' && (
                            <div className={'mt-4'}>
                                {payLoading && <Loader />}
                                {paypalSDKError.length > 0 && <Message variant={'danger'}>{paypalSDKError}</Message>}
                                {!paypalSDKReady ? (
                                    <Loader />
                                ) : (
                                    <PayPalButton
                                        amount={totalPrice}
                                        onSuccess={successPaymentHandler}
                                    />
                                )}

                            </div>
                        )
                    }

                    {updateLoading && <Loader/>}
                    {updateError && <Message variant={'danger'}>{updateError}</Message>}
                    {
                        loggedIn && loggedIn.isAdmin && /*order.payment.paymentStatus === 'SF' &&*/ (
                            <Form className={'mt-4'}>
                                <Form.Group>
                                    <Form.Label>Order Status</Form.Label>
                                    <Form.Select
                                        value={order.status}
                                        onChange={orderStatusChangeHandler}>
                                        {
                                            Object.keys(orderStatuses).map(status => (
                                                <option value={status}>{orderStatuses[status]}</option>
                                            ))
                                        }
                                    </Form.Select>
                                </Form.Group>
                            </Form>
                        )
                    }


                </Col>
            </Row>
        </React.Fragment>
    )
}

export default OrderScreen;
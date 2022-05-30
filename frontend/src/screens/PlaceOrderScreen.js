import React, {useEffect, useState} from 'react';
import FormContainer from "../components/ui/FormContainer";
import {Button, Card, Col, Form, Image, ListGroup, Row} from "react-bootstrap";
import {useDispatch, useSelector, useStore} from "react-redux";
import {Link, useNavigate, useSearchParams} from "react-router-dom";
import {modifyCart, saveShippingAddress} from "../store/cart/cartActions";
import CheckoutSteps from "../components/cart/CheckoutSteps";
import classes from "./style/CartScreen.module.css";
import Message from "../components/ui/Message";
import {createOrder} from '../store/order/orderActions';
import {HELPERS} from "../utils/helpers";
import Loader from "../components/ui/Loader";

import { ORDER_CREATE_RESET } from '../store/order/orderConstants';


function PlaceOrderScreen(props) {
    const cart = useSelector(state => state.cart);
    const orderCreate = useSelector(state => state.orderCreate)

    const { cartItems, shippingAddress : shippingDetails, paymentMethod } = cart;
    const { order, success, error} = orderCreate;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {totalItems, totalAmount, taxAmount, shippingAmount, totalPrice} = HELPERS.priceCalculator(cartItems);

    if(!paymentMethod) {
        navigate('/app/payment');
    }

    useEffect(() => {
        if(success) {
            navigate(`/app/order/${order.id}`);
            dispatch({type: ORDER_CREATE_RESET});
        }
    }, [navigate, success]);


    const placeOrderHandler = (e) => {
        e.preventDefault();
        dispatch(createOrder({
            cartItems,
            paymentMethod,
            totalAmount,
            taxAmount,
            shippingAmount,
            shippingAddress: shippingDetails
        }))
    }

    return (
        <React.Fragment>
            <CheckoutSteps login shipping payment order />

            <Row>
                <Col md={8}>
                    <ListGroup variant={'flush'}>
                        <ListGroup.Item>
                            <h3>Shipping Details</h3>
                            <p>
                                <strong>Shipping: </strong>
                                {shippingDetails.address},<br />
                                {shippingDetails.city}, {shippingDetails.state}, <br />
                                {shippingDetails.country} ({shippingDetails.pincode})
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h3>Payment Method</h3>
                            <p>
                                <strong>Method: </strong>
                                {paymentMethod}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h3>Order Items</h3>
                            {cartItems.length === 0 ?
                                    <Message variant={'info'}>
                                        Your cart is empty!
                                    </Message> : (
                                        <ListGroup variant={'flush'}>
                                            {cartItems.map(item => (
                                                <ListGroup.Item key={item.id}>
                                                    <Row>
                                                        <Col md={1}>
                                                            <Image src={HELPERS.backendUrl + item.image} fluid rounded alt={item.name} />
                                                        </Col>

                                                        <Col>
                                                            <Link to={`/app/product/${item.slug}`}>{item.name}</Link>
                                                        </Col>

                                                        <Col md={4}>
                                                            {item.quantity} X ${item.price} = ${(item.quantity * item.price).toFixed(2)}
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
                                    <Col md={4}>{totalItems}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row className={'my-1'}>
                                    <Col md={8}>Subtotal</Col>
                                    <Col md={4}>${totalAmount}</Col>
                                </Row>

                                <Row className={'my-1'}>
                                    <Col md={8}>Tax</Col>
                                    <Col md={4}>${taxAmount}</Col>
                                </Row>

                                <Row className={'my-1'}>
                                    <Col md={8}>Shipping</Col>
                                    <Col md={4}>${shippingAmount}</Col>
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

                    {error && <Message variant={'danger'}>{error}</Message>}

                    <Button
                        className={'btn-block my-3'}
                        disabled={!totalItems}
                        type={'button'}
                        style={{width: '100%'}}
                        onClick={placeOrderHandler}>
                        Place Order
                    </Button>
                </Col>
            </Row>
        </React.Fragment>
    );
}

export default PlaceOrderScreen;
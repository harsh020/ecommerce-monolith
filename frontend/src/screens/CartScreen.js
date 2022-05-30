import React, {useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import {Link, useNavigate, useParams, useSearchParams} from "react-router-dom";
import {Row, Col, ListGroup, Button, Image, Form, Card} from "react-bootstrap";

import {addToCart, modifyCart, removeFromCart} from "../store/cart/cartActions";
import Message from '../components/ui/Message';
import classes from './style/CartScreen.module.css';
import {HELPERS} from "../utils/helpers";


const CartScreen = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cart = useSelector(store => store.cart);
    const { cartItems } = cart;

    const {totalItems, totalAmount, taxAmount, shippingAmount, totalPrice} = HELPERS.priceCalculator(cartItems);

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    }

    const checkoutHandler = () => {
        navigate('/app/login?redirect=/app/shipping');
    }

    return (
        <Row>
            <Col md={8}>
                <h1 className={classes['cart-header']}>Shopping Cart</h1>
                {
                    cartItems.length === 0 ?
                        <Message variant={'info'}>
                            You have no item in your cart. <Link to={'/app'}>Go Back</Link>
                        </Message>
                        :
                        (
                            <ListGroup variant={'flush'}>
                                {cartItems.map(item => (
                                    <ListGroup.Item key={item.id}>
                                        <Row>
                                            <Col md={2}>
                                                <Image src={HELPERS.backendUrl + item.image} fluid rounded alt={item.name} />
                                            </Col>

                                            <Col md={5}>
                                                <Link to={`/app/product/${item.slug}`}>{item.name}</Link>
                                            </Col>

                                            <Col md={3}>
                                                <Form.Control
                                                    as={'select'}
                                                    value={item.quantity}
                                                    className={classes['quantity-selector']}
                                                    onChange={(e) => dispatch(modifyCart(item.slug, Number(e.target.value)))}
                                                >
                                                    {
                                                        [...Array(item.countInStock).keys()].map((c) => (
                                                            <option
                                                                key={c + 1}
                                                                value={c + 1}>
                                                                {c + 1}
                                                            </option>
                                                        ))
                                                    }
                                                </Form.Control>
                                            </Col>

                                            <Col md={2}>
                                                <Button variant={'light'}
                                                        onClick={() => removeFromCartHandler(item.id)}
                                                >
                                                    <i className={'fas fa-trash'} />
                                                </Button>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>

                        )
                }
            </Col>

            <Col md={4}>
                <h2>Summary</h2>
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

                <Button
                    className={'btn-block my-3'}
                    disabled={!totalItems}
                    type={'button'}
                    style={{width: '100%'}}
                    onClick={checkoutHandler}>
                    Checkout
                </Button>
            </Col>
        </Row>
    );
};

export default CartScreen;

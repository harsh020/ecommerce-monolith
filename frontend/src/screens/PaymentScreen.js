import React, {useEffect, useState} from 'react';
import FormContainer from "../components/ui/FormContainer";
import {Button, Col, Form, Row} from "react-bootstrap";
import {useDispatch, useSelector, useStore} from "react-redux";
import {Link, useNavigate, useSearchParams} from "react-router-dom";
import CheckoutSteps from "../components/cart/CheckoutSteps";
import {savePaymentMethod} from "../store/cart/cartActions";

function PaymentScreen(props) {
    const cart = useSelector(state => state.cart);
    const { shippingAddress : shippingDetails } = cart;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    if(!shippingDetails) {
        navigate('/app/shipping');
    }

    const [paymentMethod, setPaymentMethod] = useState('PayPal');

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        navigate('/app/place-order');
    }

    return (
        <React.Fragment>
            <CheckoutSteps login shipping payment />
            <FormContainer sm={12} md={6}>
                <h1>Payment Method</h1>

                <Form className={'my-3'} onSubmit={submitHandler}>
                    <Form.Group className={'my-3'}>
                        <Form.Label as={'legend'}>Select Method</Form.Label>
                        <Form.Check
                            required
                            type={'radio'}
                            label={'PayPal or Credit Card'}
                            id={'paypal'}
                            name={'payment-method'}
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                    </Form.Group>

                    <Button variant={'primary'} type={'submit'}>Continue</Button>

                </Form>
            </FormContainer>
        </React.Fragment>
    );
}

export default PaymentScreen;
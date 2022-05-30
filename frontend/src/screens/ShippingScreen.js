import React, {useEffect, useState} from 'react';
import FormContainer from "../components/ui/FormContainer";
import {Button, Col, Form, Row} from "react-bootstrap";
import {useDispatch, useSelector, useStore} from "react-redux";
import {Link, useNavigate, useSearchParams} from "react-router-dom";
import {saveShippingAddress} from "../store/cart/cartActions";
import CheckoutSteps from "../components/cart/CheckoutSteps";

const initialShippingAddressState = {
    address: '',
    city: '',
    state: '',
    country: '',
    pincode: ''
};

function ShippingScreen(props) {
    const cart = useSelector(state => state.cart);
    const { shippingAddress : shippingDetails } = cart;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [shippingAddress, setShippingAddress] = useState(initialShippingAddressState);

    useEffect(() => {
        if(Object.keys(shippingDetails).length !== 0) {
            setShippingAddress(shippingDetails);
        }
    }, [shippingDetails]);


    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress(shippingAddress));
        navigate('/app/payment');
    }

    return (
        <React.Fragment>
            <CheckoutSteps login shipping />
            <FormContainer sm={12} md={6}>
                <h1>Shipping Details</h1>

                <Form className={'my-3'} onSubmit={submitHandler}>
                    <Form.Group className={'my-2'}>
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            required
                            type={'text'}
                            placeholder={'Enter address'}
                            value={shippingAddress.address}
                            onChange={(e) => setShippingAddress({
                                ...shippingAddress,
                                address: e.target.value,
                            })}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Row>
                            <Col md={6}>
                                <Form.Label>City</Form.Label>
                                <Form.Control
                                    required
                                    type={'text'}
                                    placeholder={'Enter city'}
                                    value={shippingAddress.city}
                                    onChange={(e) => setShippingAddress({
                                        ...shippingAddress,
                                        city: e.target.value,
                                    })}
                                />
                            </Col>
                            <Col md={6}>
                                <Form.Label>State</Form.Label>
                                <Form.Control
                                    required
                                    type={'text'}
                                    placeholder={'Enter state'}
                                    value={shippingAddress.state}
                                    onChange={(e) => setShippingAddress({
                                        ...shippingAddress,
                                        state: e.target.value,
                                    })}
                                />
                            </Col>
                        </Row>
                    </Form.Group>


                    <Form.Group className={'my-3'}>
                        <Row>
                            <Col md={6}>
                                <Form.Label>Country</Form.Label>
                                <Form.Control
                                    required
                                    type={'text'}
                                    placeholder={'Enter country'}
                                    value={shippingAddress.country}
                                    onChange={(e) => setShippingAddress({
                                        ...shippingAddress,
                                        country: e.target.value,
                                    })}
                                />
                            </Col>

                            <Col md={6}>
                                <Form.Label>Pincode</Form.Label>
                                <Form.Control
                                    required
                                    type={'text'}
                                    placeholder={'Enter pincode'}
                                    value={shippingAddress.pincode}
                                    onChange={(e) => setShippingAddress({
                                        ...shippingAddress,
                                        pincode: e.target.value,
                                    })}
                                />
                            </Col>
                        </Row>
                    </Form.Group>


                    <Button variant={'primary'} type={'submit'}>Continue</Button>

                </Form>
            </FormContainer>
        </React.Fragment>

    );
}

export default ShippingScreen;
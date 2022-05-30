import React, {useEffect, useState} from 'react';
import FormContainer from "../components/ui/FormContainer";
import {Button, Col, Form, Row} from "react-bootstrap";
import {useDispatch, useSelector, useStore} from "react-redux";
import {Link, useNavigate, useSearchParams} from "react-router-dom";
import {register} from "../store/user/userActions";
import Message from "../components/ui/Message";
import Loader from "../components/ui/Loader";

const initialRegisterState = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
};

function RegisterScreen(props) {
    const [userDetails, setUserDetails] = useState(initialRegisterState);
    const [message, setMessage] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userRegister = useSelector(state => state.userRegister);
    const {error, loading, userRegister : user} = userRegister;

    const [searchParams] = useSearchParams();
    const redirect = searchParams && (searchParams.get('redirect') ? searchParams.get('redirect') : '/')

    useEffect(() => {
        if(user) {
            navigate(redirect);
        }
    }, [navigate, user, redirect]);

    const validateFormData = (data) => {
        if(data.password !== data.confirmPassword) {
            setMessage('Passwords do not match!');
            return false;
        }
        else setMessage('');
        return true;
    }

    const submitHandler = (e) => {
        e.preventDefault();
        const {name, email, password, confirmPassword} = userDetails;
        const isValid = validateFormData({name, email, password, confirmPassword});
        if (isValid) {
            dispatch(register({name, email, password}));
        }
    }

    return (
        <FormContainer sm={12} md={6}>
            <h1>Register</h1>
            {message && <Message variant={'danger'}>{message}</Message>}
            {error && <Message variant={'danger'}>{error}</Message>}
            {loading && <Loader />}

            <Form className={'my-3'} onSubmit={submitHandler}>
                <Form.Group className={'my-2'}>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        required
                        type={'text'}
                        placeholder={'Enter full name'}
                        value={userDetails.firstName}
                        onChange={(e) => setUserDetails({
                            ...userDetails,
                            name: e.target.value,
                        })}
                    />
                </Form.Group>

                <Form.Group className={'my-2'}>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        required
                        type={'email'}
                        placeholder={'Enter email'}
                        value={userDetails.email}
                        onChange={(e) => setUserDetails({
                            ...userDetails,
                            email: e.target.value,
                        })}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        required
                        type={'password'}
                        placeholder={'Enter password'}
                        value={userDetails.password}
                        onChange={(e) => setUserDetails({
                            ...userDetails,
                            password: e.target.value,
                        })}
                    />
                </Form.Group>

                <Form.Group className={'my-2'}>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        required
                        type={'password'}
                        placeholder={'Enter confirm password'}
                        value={userDetails.confirmPassword}
                        onChange={(e) => setUserDetails({
                            ...userDetails,
                            confirmPassword: e.target.value,
                        })}
                    />
                </Form.Group>

                <Button variant={'primary'} className={'my-3'} type={'submit'}>Register</Button>
            </Form>

            <Row>
                <Col>
                    Already registered? <Link to={`/app/login?redirect=${redirect}`}>Login</Link>
                </Col>
            </Row>
        </FormContainer>
    );
}

export default RegisterScreen;
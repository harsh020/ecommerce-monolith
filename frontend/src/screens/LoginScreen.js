import React, {useEffect, useState} from 'react';
import FormContainer from "../components/ui/FormContainer";
import {Button, Col, Form, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate, useSearchParams} from "react-router-dom";
import {login} from "../store/user/userActions";
import Message from "../components/ui/Message";
import Loader from "../components/ui/Loader";

function LoginScreen(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.userLogin);
    const {error, loading, user} = userLogin;

    const [searchParams] = useSearchParams();
    const redirect = searchParams && (searchParams.get('redirect') ? searchParams.get('redirect') : '/')

    useEffect(() => {
        if(user) {
            navigate(redirect);
        }
    }, [navigate, user, redirect]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    }

    return (
        <FormContainer sm={12} md={6}>
            <h1>Sign In</h1>

            {error && <Message variant={'danger'}>{error}</Message>}
            {loading && <Loader />}

            <Form className={'my-3'} onSubmit={submitHandler}>
                <Form.Group className={'my-2'}>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        required
                        type={'email'}
                        placeholder={'Enter email'}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        required
                        type={'password'}
                        placeholder={'Enter password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>

                <Button variant={'primary'} className={'my-3'} type={'submit'}>Sign In</Button>
            </Form>

            <Row>
                <Col>
                    New Customer? <Link to={`/app/register?redirect=${redirect}`}>Register</Link>
                </Col>
            </Row>
        </FormContainer>
    );
}

export default LoginScreen;
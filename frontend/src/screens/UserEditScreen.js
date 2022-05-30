import React, {useEffect, useState} from 'react';
import FormContainer from "../components/ui/FormContainer";
import {Button, Col, Form, Row} from "react-bootstrap";
import {useDispatch, useSelector, useStore} from "react-redux";
import {Link, useNavigate, useParams, useSearchParams} from "react-router-dom";
import {getUserDetails, listUsers, updateUser} from "../store/user/userActions";
import Message from "../components/ui/Message";
import Loader from "../components/ui/Loader";
import {USER_UPDATE_RESET} from "../store/user/userConstants";

const initialUserDetailsState = {
    name: '',
    email: '',
    mobile: '',
    gender: '',
    isAdmin: ''
};

function UserEditScreen(props) {
    const [userDetailsState, setUserDetailsState] = useState(initialUserDetailsState);
    const [message, setMessage] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userDetails = useSelector(state => state.userProfile);
    const {error, loading, userProfile : user} = userDetails;

    const userLogin = useSelector(state => state.userLogin);
    const { user : loggedIn } = userLogin;

    const userUpdate = useSelector(state => state.userUpdate);
    const { loading: updateLoading, success: updateSuccess, error: updateError } = userUpdate;

    const { userId } = useParams();

    useEffect(() => {
        if(updateSuccess) {
            dispatch({type: USER_UPDATE_RESET});
            navigate('/app/admin/users')
        }
        else {
            if(!user || !user.name || user.id !== Number(userId)) {
                dispatch(getUserDetails(userId));
            }
            else {
                setUserDetailsState({
                    name: user.name,
                    email: user.email,
                    mobile: user.profile ? user.profile.mobile : '',
                    gender: user.profile ? user.profile.gender : '',
                    isAdmin: user.isAdmin
                })
            }
        }
    }, [dispatch, user, userId, navigate, updateSuccess]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateUser(userId, {
            name: userDetailsState.name,
            email: userDetailsState.email,
            profile: {
                mobile: userDetailsState.mobile,
                gender: userDetailsState.gender
            },
            isAdmin: userDetailsState.isAdmin
        }))
    }

    return (
        <React.Fragment>
            <h1 className={'mb-3'}>Edit User #{userId}</h1>
            {updateError && <Message variant={'danger'}>{updateError}</Message>}
            {updateLoading && <Loader />}
            {loading
            ? (
                <Loader />
            ) : error ? (
                <Message varaiant={'danger'}>error</Message>
            ) : (
                <FormContainer sm={12} md={6}>
                            <Form className={'my-3'} onSubmit={submitHandler}>
                                <Form.Group className={'my-2'}>
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        required
                                        type={'text'}
                                        placeholder={'Enter full name'}
                                        value={userDetailsState.name}
                                        onChange={(e) => setUserDetailsState({
                                            ...userDetailsState,
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
                                        value={userDetailsState.email}
                                        onChange={(e) => setUserDetailsState({
                                            ...userDetailsState,
                                            email: e.target.value,
                                        })}
                                    />
                                </Form.Group>

                                <Form.Group className={'my-2'}>
                                    <Row>
                                        <Col md={6}>
                                            <Form.Label>Mobile No</Form.Label>
                                            <Form.Control
                                                type={'tel'}
                                                placeholder={'Enter mobile no'}
                                                value={userDetailsState.mobile}
                                                onChange={(e) => setUserDetailsState({
                                                    ...userDetailsState,
                                                    mobile: e.target.value
                                                })}
                                            />
                                        </Col>

                                        <Col md={6}>
                                            <Form.Label>Gender</Form.Label>
                                            <Form.Select
                                                value={userDetailsState.gender.length ? userDetailsState.gender : ''}
                                                onChange={(e) => setUserDetailsState({
                                                    ...userDetailsState,
                                                    gender: e.target.value
                                                })}>
                                                <option value={''}>Select gender</option>
                                                <option value={'M'}>Male</option>
                                                <option value={'F'}>Female</option>
                                            </Form.Select>
                                        </Col>
                                    </Row>
                                </Form.Group>

                                <Form.Group className={'my-2'}>
                                    <Form.Check
                                        type={'checkbox'}
                                        label={'Is admin'}
                                        checked={userDetailsState.isAdmin}
                                        onChange={(e) => setUserDetailsState({
                                            ...userDetailsState,
                                            isAdmin: e.target.checked,
                                        })}
                                    />
                                </Form.Group>

                                <Button variant={'primary'} className={'my-3'} type={'submit'}>Update</Button>
                            </Form>

                        </FormContainer>
            )}
        </React.Fragment>
    )
}

export default UserEditScreen;
import React, {useEffect, useState} from 'react';
import FormContainer from "../components/ui/FormContainer";
import {Button, Col, Form, Row, Table} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap';
import {useDispatch, useSelector, useStore} from "react-redux";
import {Link, useNavigate, useSearchParams} from "react-router-dom";
import {getUserDetails, updateUserDetails} from "../store/user/userActions";
import Message from "../components/ui/Message";
import Loader from "../components/ui/Loader";
import {listUserOrders} from '../store/order/orderActions';
import {USER_PROFILE_RESET} from "../store/user/userConstants";
import {HELPERS} from "../utils/helpers";

const initialProfileState = {
    name: '',
    email: '',
    mobile: '',
    gender: '',
};

function ProfileScreen(props) {
    const [userDetails, setUserDetails] = useState(initialProfileState);
    const [message, setMessage] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userProfile = useSelector(state => state.userProfile);
    const {error, loading, userProfile : user} = userProfile;

    const userLogin = useSelector(state => state.userLogin);
    const { user : loggedIn } = userLogin;

    const userProfileUpdate = useSelector(state => state.userProfileUpdate);
    const { success } = userProfileUpdate;

    const userOrderList = useSelector(state => state.userOrderList)
    const {loading : ordersLoading, error : ordersError, orders} = userOrderList;

    console.log(orders);

    useEffect(() => {
        if(!loggedIn) {
            navigate('/app/login');
        }
        else {
            console.log("logged in ", loggedIn.id, typeof loggedIn.id)

            if(!user || !user.name || success || user.id !== loggedIn.id) {
                dispatch({type: USER_PROFILE_RESET});
                dispatch(getUserDetails('profile'));
                dispatch(listUserOrders());
            }
            else {
                setUserDetails({
                    name: user.name,
                    email: user.email,
                    mobile: user.profile.mobile ? user.profile.mobile : '',
                    gender: user.profile.gender ? user.profile.gender : ''
                })
            }
        }
    }, [dispatch, navigate, loggedIn, user, success]);


    const submitHandler = (e) => {
        e.preventDefault();
        let {name, email, mobile, gender} = userDetails;
        const data = {
            name,
            email,
            update_profile: {
                mobile,
                gender
            }
        }

        dispatch(updateUserDetails(data));
    }

    return (
        <Row>
            <Col md={4}>
                <h1>Profile</h1>

                <FormContainer sm={12} md={12}>
                    {success && <Message variant={'success'}>{message}</Message>}
                    {error && <Message variant={'danger'}>{error}</Message>}
                    {loading && <Loader />}

                    <Form className={'my-3'} onSubmit={submitHandler}>
                        <Form.Group className={'my-2'}>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                required
                                type={'text'}
                                placeholder={'Enter full name'}
                                value={userDetails.name}
                                onChange={(e) => setUserDetails({
                                    ...userDetails,
                                    name: e.target.value
                                })}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                required
                                type={'email'}
                                placeholder={'Enter email'}
                                value={userDetails.email}
                                onChange={(e) => setUserDetails({
                                    ...userDetails,
                                    email: e.target.value
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
                                        value={userDetails.mobile}
                                        onChange={(e) => setUserDetails({
                                            ...userDetails,
                                            mobile: e.target.value
                                        })}
                                    />
                                </Col>

                                <Col md={6}>
                                    <Form.Label>Gender</Form.Label>
                                    <Form.Select
                                        value={userDetails.gender.length ? userDetails.gender : ''}
                                        onChange={(e) => setUserDetails({
                                            ...userDetails,
                                            gender: e.target.value
                                        })}>
                                        <option value={''}>Select gender</option>
                                        <option value={'M'}>Male</option>
                                        <option value={'F'}>Female</option>
                                    </Form.Select>
                                </Col>
                            </Row>
                        </Form.Group>


                        <Button variant={'primary'} className={'my-3'} type={'submit'}>Update</Button>
                    </Form>
                </FormContainer>
            </Col>

            <Col md={8}>
                <h2>My Orders</h2>

                {
                    ordersLoading ? (
                        <Loader />
                    ) : ordersError ? (
                            <Message variant={'danger'}>{ordersError}</Message>
                        ) : (
                            <Table striped responsive className={'table-sm'}>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Date</th>
                                        <th>Total</th>
                                        <th>Order Status</th>
                                        <th>Payment Status</th>
                                        <th></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        orders.map(order => (
                                            <tr key={order.id}>
                                                <td>{order.id}</td>
                                                <td>{HELPERS.getDateTime(order.created)}</td>
                                                <td>{order.payment.amount}</td>
                                                <td style={{textAlign: 'center'}}>
                                                    {order.status === 'DL' ?
                                                        <i className={'fas fa-check'} style={{color: 'green',}}/> :
                                                        (order.status === 'FL' || order.status === 'CL') ?
                                                        <i className={'fas fa-times justify-content'} style={{color: 'red',}}/> :
                                                        <i className={'fas fa-check'} style={{color: 'orange',}}/>
                                                    }
                                                </td>
                                                <td style={{textAlign: 'center'}}>
                                                    {order.payment.paymentStatus === 'SF' ?
                                                        <i className={'fas fa-check'} style={{color: 'green',}}/> :
                                                        <i className={'fas fa-times'} style={{color: 'red',}}/>
                                                    }
                                                </td>
                                                <td>
                                                    <LinkContainer to={`/app/order/${order.id}`}>
                                                        <Button variant={'light'} className={'btn-sm'}>View</Button>
                                                    </LinkContainer>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </Table>
                    )
                }
            </Col>
        </Row>
    );
}

export default ProfileScreen;
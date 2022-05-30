import React, {useEffect, useState} from 'react';
import {Table, Button, Col, Form, Row} from "react-bootstrap";
import {useDispatch, useSelector, useStore} from "react-redux";
import {Link, useNavigate, useSearchParams} from "react-router-dom";
import {deleteUser, listUsers} from '../store/user/userActions';
import Message from "../components/ui/Message";
import Loader from "../components/ui/Loader";
import {HELPERS} from "../utils/helpers";
import {LinkContainer} from "react-router-bootstrap";

function UserListScreen(props) {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const userList = useSelector(state => state.userList);
    const { loading, error, users } = userList;

    const userLogin = useSelector(state => state.userLogin);
    const { user : loggedIn } = userLogin;

    const userDelete = useSelector(state => state.userDelete);
    const { loading: deleteLoading, deleteSuccess, error: deleteError } = userDelete;

    useEffect(() => {
        if(loggedIn && loggedIn.isAdmin || deleteSuccess) {
            dispatch(listUsers());
        }
        else {
            navigate('/app/login');
        }
    }, [dispatch, loggedIn, deleteSuccess, navigate])

    const deleteHandler = (userId) => {
        if(window.confirm('Are you sure you want to delete this user?')) {
            dispatch(deleteUser(userId));
        }
    }

    return (
        <React.Fragment>
            <h1 className={'mb-4'}>Users</h1>
            {deleteLoading && <Loader />}
            {deleteError && <Message variant={'danger'}>{deleteError}</Message>}

            {
                loading
                ? (
                    <Loader />
                ) : error ? (
                    <Message varant={'danger'}>error</Message>
                ) : (
                    <Table striped responsive hover bordered className={'table-sm'}>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Admin</th>
                                <th>Date Joined</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                users.map(user => (
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td style={{textAlign: 'center'}}>
                                            {
                                                user.isAdmin
                                                    ? (<i className={'fas fa-check'} style={{color: 'green',}}/>)
                                                    : (<i className={'fas fa-times'} style={{color: 'red',}}/>)
                                            }
                                        </td>
                                        <td>
                                            {HELPERS.getDateTime(user.dateJoined)}
                                        </td>
                                        <td>
                                            <Row className={'justify-content-center'}>
                                                <Col md={4}>
                                                    <LinkContainer to={`/app/admin/user/${user.id}/edit`}>
                                                        <Button variant={'light'} className={'btn-sm'}>
                                                            <i className={'fas fa-edit'} />
                                                        </Button>
                                                    </LinkContainer>
                                                </Col>
                                                <Col md={4}>
                                                    <Button variant={'danger'}
                                                            className={'btn-sm'}
                                                            onClick={() => deleteHandler(user.id)}
                                                    >
                                                        <i className={'fas fa-trash'} />
                                                    </Button>
                                                </Col>
                                            </Row>

                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                )
            }
        </React.Fragment>
    );
}

export default UserListScreen;
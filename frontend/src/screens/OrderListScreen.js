import React, {useEffect} from 'react';
import {Table, Button, Col, Form, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import Message from "../components/ui/Message";
import Loader from "../components/ui/Loader";
import {HELPERS} from "../utils/helpers";
import {LinkContainer} from "react-router-bootstrap";
import {PRODUCT_CREATE_RESET} from "../store/product/productConstants";
import {listOrders} from "../store/order/orderActions";

function OrderListScreen(props) {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const orderList = useSelector(state => state.orderList);
    const { loading, error, orders } = orderList;

    const userLogin = useSelector(state => state.userLogin);
    const { user : loggedIn } = userLogin;

    useEffect(() => {
        dispatch({ type: PRODUCT_CREATE_RESET });

        if(!loggedIn || !loggedIn.isAdmin) {
            navigate('/app/login');
        }
        else {
            dispatch(listOrders());
        }

    }, [dispatch, loggedIn, navigate])


    return (
        <React.Fragment>
            <h1>Orders</h1>

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
                                <th>User</th>
                                <th>Date</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th>Payment Status</th>
                                <th></th>
                            </tr>
                            </thead>

                            <tbody>
                            {
                                orders.map(order => (
                                    <tr key={order.id}>
                                        <td>{order.id}</td>
                                        <td>{order.user && (
                                            <Link to={`/app/admin/user/${order.user.id}/edit`}>
                                                {order.user.name ? order.user.name : order.user.username}
                                            </Link>)}
                                        </td>
                                        <td>{HELPERS.getDateTime(order.created)}</td>
                                        <td>
                                            ${(Number(order.totalAmount) +
                                                Number(order.shippingAmount) +
                                                Number(order.taxAmount))
                                                .toFixed(2)}</td>
                                        <td>{HELPERS.orderStatusDecoder(order, false)}</td>
                                        <td>{HELPERS.paymentStatusDecoder(order.payment, false)}</td>
                                        <td>
                                            <LinkContainer to={`/app/order/${order.id}`}>
                                                <Button variant={'light'} className={'btn-sm'}>
                                                    Details
                                                </Button>
                                            </LinkContainer>
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

export default OrderListScreen;
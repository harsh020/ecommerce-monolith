import React from 'react';
import {LinkContainer} from "react-router-bootstrap";

import {Navbar, Nav, Container, NavDropdown} from 'react-bootstrap';
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../store/user/userActions";
import {USER_DETAILS_RESET} from "../../store/user/userConstants";
import SearchBox from "../ui/SearchBox";

const Header = (props) => {
    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin);
    const { user } = userLogin;

    const logoutHandler = () => {
        localStorage.removeItem('user');
        dispatch(logout());
        dispatch({type: USER_DETAILS_RESET});
    }

    return (
        <header>
            <Navbar bg='dark' variant='dark' expand='lg' className={'mb-2'} collapseOnSelect>
                <Container>
                    <LinkContainer to={'/'}>
                        <Navbar.Brand>ProShop</Navbar.Brand>
                    </LinkContainer>
                    <SearchBox />
                    <Navbar.Toggle aria-controls='basic-navbar-nav'/>
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='justify-content-end' style={{width: '100%'}}>
                            <LinkContainer to={'/app/cart'}>
                                <Nav.Link><i className={'fas fa-shopping-cart'}/> Cart</Nav.Link>
                            </LinkContainer>

                            {
                                user ? (
                                    <NavDropdown title={user.name} id={'username'}>
                                        <LinkContainer to={'/app/profile'}>
                                            <NavDropdown.Item>Profile</NavDropdown.Item>
                                        </LinkContainer>


                                        <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                                    </NavDropdown>
                                ) : (
                                    <LinkContainer to={'/app/login'}>
                                        <Nav.Link><i className={'fas fa-user'}/> Login</Nav.Link>
                                    </LinkContainer>
                                )
                            }
                            {
                                user && user.isAdmin && (
                                    <NavDropdown title={'Manage'} id={'admin-menu'}>
                                        <LinkContainer to={'/app/admin/users'}>
                                            <NavDropdown.Item>Users</NavDropdown.Item>
                                        </LinkContainer>

                                        <LinkContainer to={'/app/admin/products'}>
                                            <NavDropdown.Item>Products</NavDropdown.Item>
                                        </LinkContainer>

                                        <LinkContainer to={'/app/admin/orders'}>
                                            <NavDropdown.Item>Orders</NavDropdown.Item>
                                        </LinkContainer>
                                    </NavDropdown>
                                )
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}

export default Header;
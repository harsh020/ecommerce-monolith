import React from 'react';
import {Image, Nav} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'

function CheckoutSteps(props) {
    return (
        <Nav className={'justify-content-center mb-5'} >
            <Nav.Item className={'mx-5'}>
                {props.login ? (
                    <LinkContainer to={'/app/login'}>
                        <Nav.Link><i className="fa-solid fa-arrow-right-to-bracket" style={{color: 'green'}}/></Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled><i className="fa-solid fa-arrow-right-to-bracket" /></Nav.Link>
                )}
            </Nav.Item>

            <Nav.Item className={'mx-5'}>
                {props.shipping ? (
                    <LinkContainer to={'/app/shipping'}>
                        <Nav.Link><i className="fa-solid fa-truck-fast" style={{color: 'green'}}/></Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled><i className="fa-solid fa-truck-fast" /></Nav.Link>
                )}
            </Nav.Item>

            <Nav.Item className={'mx-5'}>
                {props.payment ? (
                    <LinkContainer to={'/app/payment'}>
                        <Nav.Link><i className="fa-regular fa-credit-card" style={{color: 'green'}}/></Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled><i className="fa-regular fa-credit-card"/></Nav.Link>
                )}
            </Nav.Item>

            <Nav.Item className={'mx-5'}>
                {props.order ? (
                    <LinkContainer to={'/app/order'}>
                        <Nav.Link><i className="fa-solid fa-bag-shopping" style={{color: 'green'}}/></Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled><i className="fa-solid fa-bag-shopping"/></Nav.Link>
                )}
            </Nav.Item>
        </Nav>
    );
}

export default CheckoutSteps;
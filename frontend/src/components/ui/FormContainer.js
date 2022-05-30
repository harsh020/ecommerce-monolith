import React from 'react';
import {Col, Container, Row} from "react-bootstrap";

function FormContainer(props) {
    return (
        <Container>
            <Row className={'justify-content-md-center'}>
                <Col sm={props.sm} md={props.md}>
                    {props.children}
                </Col>
            </Row>
        </Container>
    );
}

export default FormContainer;
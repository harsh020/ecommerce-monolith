import React from 'react';

import classes from './style/NotFound.module.css';
import {Col, Image, Row} from "react-bootstrap";

function NotFound(props) {
    return (
        <Row className="justify-content-md-center">
            <Col xs={12} sm={4} md={4}>
                <Image width={'100%'} src={'/images/404-error.png'} />
            </Col>
        </Row>
        // <div className={classes.notfound}>
        //     <h1>
        //         <span>
        //             <i className='fa-solid fa-ghost' />
        //         </span>
        //         <span style={{margin: '0 2rem'}}>
        //             Are you lost?
        //         </span>
        //     </h1>
        //     <h4>
        //         <span>
        //             Sorry, We cannot find the page that you are looking for!
        //         </span>
        //     </h4>
        // </div>
    );
}

export default NotFound;
import React from 'react';

import classes from './style/Container.module.css';

import {Container} from "react-bootstrap";

const Content = (props) => {
    return (
        <main className={classes['main-content']}>
            <Container className={'py-3'}>
                {props.children}
            </Container>
        </main>
    );
}

export default Content;
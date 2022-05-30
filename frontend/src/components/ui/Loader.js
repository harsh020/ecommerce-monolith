import React from 'react';

import { Spinner } from 'react-bootstrap';
import classes from './style/Loader.module.css';

function Loader(props) {
    return (
        <Spinner
            className={classes.loader}
            animation={'border'}
            role={'status'}
        >
            <span className={'sr-only'}>Loading...</span>
        </Spinner>
    );
}

export default Loader;
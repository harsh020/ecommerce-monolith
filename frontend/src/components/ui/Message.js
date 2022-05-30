import React from 'react';

import { Alert } from 'react-bootstrap';

function Message(props) {
    return (
        <Alert variant={props.variant}>
            {props.children}
        </Alert>
    );
}

export default Message;
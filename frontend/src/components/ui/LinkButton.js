import React from 'react';
import {Link} from "react-router-dom";

function LinkButton(props) {
    return (
        <Link
            to={props.link}
              className={props.class ?
                  props.class :
                  'btn btn-light'}>
            {props.children}
        </Link>
    );
}

export default LinkButton;
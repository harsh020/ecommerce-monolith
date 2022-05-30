import React from 'react';

import classes from './style/Rating.module.css';

function Rating(props) {
    const { value, text, total=5 } = props;

    let stars = [];
    for(let i=1; i<=total; i++) {
        stars.push(
            <span key={`rating_${i}`}>
                <i style={{color: '#f8e825'}}
                   className={`${
                       value >= i ?
                           'fas fa-star' :
                           value >= (i - 0.5) ?
                               'fas fa-star-half-alt' :
                               'far fa-star'}`} >
                </i>
            </span>
        );
    }

    return (
        <div className={classes.rating}>
            {stars}
            <span className={'text'}>{text && text}</span>
        </div>
    );
}

export default Rating;
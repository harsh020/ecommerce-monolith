import React from 'react';
import { Link } from 'react-router-dom';

import {Card} from 'react-bootstrap';
import Rating from '../ui/Rating';
import {HELPERS} from "../../utils/helpers";


const Product = (props) => {
    const { product } = props;

    return (
        <Card className={'my-3 p-3 rounded'}>
            <Link to={`/app/product/${product.id}`}>
                <Card.Img src={HELPERS.backendUrl + product.image} />
            </Link>

            <Card.Title as={'div'}>
                <Link to={`/app/product/${product.id}`}><strong>{product.name}</strong></Link>
            </Card.Title>

            <Card.Text as={'div'}>
                <div className={'my-3'}>
                    <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                </div>
            </Card.Text>

            <Card.Text as={'h3'}>
                ${product.price}
            </Card.Text>
        </Card>
    );
}

export default Product;
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {listTopRatedProducts} from "../../store/product/productActions";
import Loader from "../ui/Loader";
import {Carousel, Image} from "react-bootstrap";
import Message from "../ui/Message";
import {Link} from "react-router-dom";
import {HELPERS} from "../../utils/helpers";

import classes from './style/ProductCarousel.modeule.css';

function ProductCarousel(props) {
    const dispatch = useDispatch();

    const productTopRated = useSelector(state => state.productTopRated);
    const { error, loading, products } = productTopRated;

    useEffect(() => {
        dispatch(listTopRatedProducts({
           limit: 5
        }));
    }, [dispatch]);

    return loading ? (
        <Loader />
    ) : error ? (
        <Message variant={'danger'}>{error}</Message>
    ) : (
        <React.Fragment>
            <Carousel pause={'hover'} className={'bg-dark mb-4'}>
                {
                    products.map(product => (
                        <Carousel.Item key={product.id}>
                            <Link to={`/app/product/${product.id}`}>
                                <Image src={HELPERS.backendUrl + product.image} />
                                <Carousel.Caption className={'carousel.caption'}>
                                    <h4>{product.name} (${product.price})</h4>
                                </Carousel.Caption>
                            </Link>
                        </Carousel.Item>
                    ))
                }
            </Carousel>
        </React.Fragment>
    );
}

export default ProductCarousel;
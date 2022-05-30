import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {Col, Row} from 'react-bootstrap';
import Product from '../components/product/Product';
import { listProducts } from '../store/product/productActions';
import Loader from "../components/ui/Loader";
import Message from "../components/ui/Message";
import {useSearchParams} from "react-router-dom";
import Paginate from "../components/ui/Paginate";
import ProductCarousel from "../components/product/ProductCarousel";

const HomeScreen = (props) => {
    const dispatch = useDispatch();
    const productList = useSelector(state => state.productList);
    const {error, loading, products, page, pages} = productList;

    const [searchParams] = useSearchParams();
    const q = searchParams.get('q') ? searchParams.get('q') : '';
    const pg = searchParams.get('page');
    const limit = searchParams.get('limit');

    useEffect(() => {
       dispatch(listProducts({
           search: q,
           page: pg,
           limit
       }));
    }, [dispatch, q, pg, limit]);

    return (
        <React.Fragment>
            {q.length === 0 && <ProductCarousel />}
            <h1>Latest Product</h1>
            <div>
                {
                    loading ? <Loader />
                        : error ? <Message variant={'danger'}>{error}</Message>
                            :
                            <div>
                                <Row>
                                    {products.map(product =>
                                        <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
                                            <Product product={product} />
                                        </Col>
                                    )}
                                </Row>

                                <Paginate page={page} pages={pages} search={q} />
                            </div>
                }
            </div>
        </React.Fragment>
    );
}

export default HomeScreen;
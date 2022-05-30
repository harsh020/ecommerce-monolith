import React, {useEffect} from 'react';
import {Table, Button, Col, Form, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useSearchParams} from "react-router-dom";
import Message from "../components/ui/Message";
import Loader from "../components/ui/Loader";
import {HELPERS} from "../utils/helpers";
import {LinkContainer} from "react-router-bootstrap";
import {createProduct, deleteProduct, listProducts} from "../store/product/productActions";
import {PRODUCT_CREATE_RESET} from "../store/product/productConstants";
import Paginate from "../components/ui/Paginate";

function ProductListScreen(props) {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const productList = useSelector(state => state.productList);
    const { loading, error, products, page, pages } = productList;

    const userLogin = useSelector(state => state.userLogin);
    const { user : loggedIn } = userLogin;

    const productDelete = useSelector(state => state.productDelete);
    const { loading: deleteLoading, success: deleteSuccess, error: deleteError } = productDelete;

    const productCreate = useSelector(state => state.productCreate);
    const { loading: createLoading, success: createSuccess, error: createError, product } = productCreate;

    const [searchParams] = useSearchParams();
    const q = searchParams.get('q') ? searchParams.get('q') : '';
    const pg = searchParams.get('page');
    const limit = searchParams.get('limit');

    useEffect(() => {
        dispatch({ type: PRODUCT_CREATE_RESET });

        if(!loggedIn.isAdmin) {
            navigate('/app/login');
        }

        if(createSuccess) {
            navigate(`/app/admin/product/${product.id}/edit`)
        }
        else {
            dispatch(listProducts({
                search: q,
                page: pg,
                limit
            }));
        }

    }, [dispatch, loggedIn, navigate, deleteSuccess, createSuccess, q, pg, limit])

    const deleteHandler = (productId) => {
        if(window.confirm('Are you sure you want to delete this product?')) {
            dispatch(deleteProduct(productId));
        }
    }

    const createProductHandler = () => {
        dispatch(createProduct({}));
    }

    return (
        <React.Fragment>
            <Row className='mb-4 align-items-center'>
                <Col>
                    <h1>Products</h1>
                </Col>

                <Col md={2} className='text-right'>
                    <Button onClick={createProductHandler}>
                        <i className='fas fa-plus' /> Create
                    </Button>
                </Col>
            </Row>

            {deleteLoading && <Loader />}
            {deleteError && <Message variant={'danger'}>{deleteError}</Message>}

            {createLoading && <Loader />}
            {createError && <Message variant={'danger'}>{createError}</Message>}

            {
                loading
                    ? (
                        <Loader />
                    ) : error ? (
                        <Message varant={'danger'}>error</Message>
                    ) : (
                        <div>
                            <Table striped responsive hover bordered className={'table-sm'}>
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Brand</th>
                                    <th>Category</th>
                                    <th>Price</th>
                                    <th>Stock</th>
                                    <th></th>
                                </tr>
                                </thead>

                                <tbody>
                                {
                                    products.map(product => (
                                        <tr key={product.id}>
                                            <td>{product.id}</td>
                                            <td>{product.name}</td>
                                            <td>{product.brand}</td>
                                            <td>{product.category}</td>
                                            <td>{product.price}</td>
                                            <td>{product.countInStock}</td>
                                            <td>
                                                <Row className={'justify-content-center'}>
                                                    <Col md={4}>
                                                        <LinkContainer to={`/app/admin/product/${product.id}/edit`}>
                                                            <Button variant={'light'} className={'btn-sm'}>
                                                                <i className={'fas fa-edit'} />
                                                            </Button>
                                                        </LinkContainer>
                                                    </Col>
                                                    <Col md={4}>
                                                        <Button variant={'danger'}
                                                                className={'btn-sm'}
                                                                onClick={() => deleteHandler(product.id)}
                                                        >
                                                            <i className={'fas fa-trash'} />
                                                        </Button>
                                                    </Col>
                                                </Row>

                                            </td>
                                        </tr>
                                    ))
                                }
                                </tbody>
                            </Table>
                            <Paginate page={page} pages={pages} search={q} redirect={'/admin/products'}/>
                        </div>
                    )
            }
        </React.Fragment>
    );
}

export default ProductListScreen;
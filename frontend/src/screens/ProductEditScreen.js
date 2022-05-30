import React, {useEffect, useState} from 'react';
import FormContainer from "../components/ui/FormContainer";
import {Button, Col, Form, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import Message from "../components/ui/Message";
import Loader from "../components/ui/Loader";
import {PRODUCT_UPDATE_RESET} from "../store/product/productConstants";
import {productDetails, updateProduct} from "../store/product/productActions";
import {PRODUCT_APIS} from "../apis/productApis";

const initialProductDetailsState = {
    name: '',
    // image: '',
    description: '',
    brand: '',
    category: '',
    price: 0.0,
    countInStock: 0,
    rating: 0.0,
    numReviews: 0
};

function ProductEditScreen(props) {
    const [productDetailsState, setProductDetailsState] = useState(initialProductDetailsState);
    const [uploading, setUploading] = useState(false);
    const [uploadingError, setUploadingError] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const prodDetails = useSelector(state => state.productDetails);
    const {error, loading, product} = prodDetails;

    const userLogin = useSelector(state => state.userLogin);
    const { user : loggedIn } = userLogin;

    const productUpdate = useSelector(state => state.productUpdate);
    const { loading: updateLoading, success: updateSuccess, error: updateError } = productUpdate;

    const { productId } = useParams();

    useEffect(() => {
        if(updateSuccess) {
            dispatch({type: PRODUCT_UPDATE_RESET});
            navigate('/app/admin/products')
        }
        else {
            if(!product || product.id !== Number(productId)) {
                dispatch(productDetails(productId));
            }
            else {
                setProductDetailsState({
                    name: product.name,
                    image: product.image ? product.image : '',
                    description: product.description ? product.description : '',
                    brand: product.brand ? product.brand : '',
                    category: product.category ? product.category : '',
                    price: product.price ? product.price : '0.0',
                    countInStock: product.countInStock ? product.countInStock : 0,
                    rating: product.rating ? product.rating : '0.0',
                    numReviews: product.numReviews ? product.numReviews : 0
                })
            }
        }
    }, [dispatch, product, productId, navigate, updateSuccess]);

    const submitHandler = (e) => {
        e.preventDefault();
        // dispatch(updateUser(productId, {
        //     name: productDetailsState.name,
        //     email: productDetailsState.email,
        //     profile: {
        //         mobile: productDetailsState.mobile,
        //         gender: productDetailsState.gender
        //     },
        //     isAdmin: productDetailsState.isAdmin
        // }))
        dispatch(updateProduct(productId, {
            ...productDetailsState,
            seller: loggedIn.id,
        }))
    }

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);

        const configs = {
            headers: {
                Authorization: `Bearer ${loggedIn.access}`
            },
        }
        try {
            const response = await PRODUCT_APIS.uploadProductImage(productId, formData, configs);
            setProductDetailsState({
                ...productDetailsState,
                image: response.data.image
            });
        }
        catch (error) {
            setUploadingError(error.response.data && error.response.data.message ?
                error.response.data.message : 'Something went wrong!');
        }
        setUploading(false);
    }

    return (
        <React.Fragment>
            <h1 className={'mb-3'}>Edit Product #{productId}</h1>
            {updateError && <Message variant={'danger'}>{updateError}</Message>}
            {updateLoading && <Loader />}
            {loading
                ? (
                    <Loader />
                ) : error ? (
                    <Message varaiant={'danger'}>error</Message>
                ) : (
                    <FormContainer sm={12} md={6}>
                        <Form className={'my-3'} onSubmit={submitHandler}>
                            <Form.Group className={'my-2'}>
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    required
                                    type={'text'}
                                    placeholder={'Enter product name'}
                                    value={productDetailsState.name}
                                    onChange={(e) => setProductDetailsState({
                                        ...productDetailsState,
                                        name: e.target.value,
                                    })}
                                />
                            </Form.Group>

                            <Form.Group className={'my-2'}>
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    required
                                    as={'textarea'}
                                    row={4}
                                    placeholder={'Enter description'}
                                    value={productDetailsState.description}
                                    onChange={(e) => setProductDetailsState({
                                        ...productDetailsState,
                                        description: e.target.value,
                                    })}
                                />
                            </Form.Group>

                            <Form.Group className={'my-2'}>
                                <Form.Label>Image: {productDetailsState.image}</Form.Label>
                                <Form.Control
                                    type={"file"}
                                    onChange={uploadFileHandler}
                                />
                                {uploading && <Loader />}
                                {uploadingError && <Message variant={'danger'}>uploadingError</Message>}

                            </Form.Group>

                            <Form.Group className={'my-2'}>
                                <Row>
                                    <Col md={4}>
                                        <Form.Label>Brand</Form.Label>
                                        <Form.Control
                                            required
                                            type={'text'}
                                            placeholder={'Enter Brand'}
                                            value={productDetailsState.brand}
                                            onChange={(e) => setProductDetailsState({
                                                ...productDetailsState,
                                                brand: e.target.value
                                            })}
                                        />
                                    </Col>

                                    <Col md={4}>
                                        <Form.Label>Category</Form.Label>
                                        <Form.Control
                                            required
                                            type={'text'}
                                            value={productDetailsState.category}
                                            onChange={(e) => setProductDetailsState({
                                                ...productDetailsState,
                                                category: e.target.value
                                            })}
                                        />
                                    </Col>

                                    <Col md={4}>
                                        <Form.Label>Price</Form.Label>
                                        <Form.Control
                                            required
                                            type={'text'}
                                            placeholder={'Enter price'}
                                            value={productDetailsState.price}
                                            onChange={(e) => setProductDetailsState({
                                                ...productDetailsState,
                                                price: e.target.value
                                            })}
                                        />
                                    </Col>

                                </Row>
                            </Form.Group>

                            <Form.Group className={'my-2'}>
                                <Row>

                                    <Col md={4}>
                                        <Form.Label>Stock</Form.Label>
                                        <Form.Control
                                            required
                                            type={'text'}
                                            value={productDetailsState.countInStock}
                                            onChange={(e) => setProductDetailsState({
                                                ...productDetailsState,
                                                countInStock: Number(e.target.value)
                                            })}
                                        />
                                    </Col>

                                    <Col md={4}>
                                        <Form.Label>Rating</Form.Label>
                                        <Form.Control
                                            required
                                            type={'text'}
                                            placeholder={'Enter Brand'}
                                            value={productDetailsState.rating}
                                            onChange={(e) => setProductDetailsState({
                                                ...productDetailsState,
                                                rating: e.target.value
                                            })}
                                        />
                                    </Col>

                                    <Col md={4}>
                                        <Form.Label># Reviews</Form.Label>
                                        <Form.Control
                                            required
                                            type={'number'}
                                            value={productDetailsState.numReviews}
                                            onChange={(e) => setProductDetailsState({
                                                ...productDetailsState,
                                                numReviews: Number(e.target.value)
                                            })}
                                        />
                                    </Col>

                                </Row>
                            </Form.Group>


                            <Button variant={'primary'} className={'my-3'} type={'submit'}>Update</Button>
                        </Form>

                    </FormContainer>
                )}
        </React.Fragment>
    )
}

export default ProductEditScreen;
import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,

    PRODUCT_DETAIL_REQUEST,
    PRODUCT_DETAIL_SUCCESS,
    PRODUCT_DETAIL_FAIL,

    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,

    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_RESET,

    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_UPDATE_RESET,

    PRODUCT_TOP_REQUEST,
    PRODUCT_TOP_SUCCESS,
    PRODUCT_TOP_FAIL,
} from './productConstants';

import { HELPERS } from '../../utils/helpers';
import { PRODUCT_APIS } from '../../apis/productApis'

export const listProducts = (params) => async (dispatch) => {
    try {
        dispatch({
            type: PRODUCT_LIST_REQUEST
        });

        const response = await PRODUCT_APIS.listProducts(params);
        let { products, page, pages } = response.data
        products = products.map(res => HELPERS.snakeToCamel(res));
        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: {
                products,
                page,
                pages
            }
        });
    }
    catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        });
    }
}

export const listTopRatedProducts = (params) => async (dispatch) => {
    try {
        dispatch({
            type: PRODUCT_TOP_REQUEST
        });

        const response = await PRODUCT_APIS.listTopRatedProducts(params);
        let res = response.data.map(res => HELPERS.snakeToCamel(res));
        dispatch({
            type: PRODUCT_TOP_SUCCESS,
            payload: res
        });
    }
    catch (error) {
        dispatch({
            type: PRODUCT_TOP_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        });
    }
}

export const productDetails = (id) => async (dispatch) => {
    try {
        dispatch({
            type: PRODUCT_DETAIL_REQUEST
        });

        const response = await PRODUCT_APIS.productDetails(id);
        const data = HELPERS.snakeToCamel(response.data)
        dispatch({
            type: PRODUCT_DETAIL_SUCCESS,
            payload: data
        });
    }
    catch (error) {
        dispatch({
            type: PRODUCT_DETAIL_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        });
    }
}

export const deleteProduct = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_DELETE_REQUEST
        })

        const {
            userLogin: { user }
        } = getState();

        const configs = {
            headers: {
                Authorization: `Bearer ${user.access}`
            },
        }
        let response = await PRODUCT_APIS.deleteProduct(id, configs);
        response = response.data.map(res => HELPERS.snakeToCamel(res));

        dispatch({
            type: PRODUCT_DELETE_SUCCESS,
            payload: response
        })
    }
    catch (error) {
        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const createProduct = (data) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_CREATE_REQUEST
        })

        const {
            userLogin: { user }
        } = getState();

        const configs = {
            headers: {
                Authorization: `Bearer ${user.access}`
            },
        }
        data = HELPERS.camelToSnake(data);
        let response = await PRODUCT_APIS.createProduct(data, configs);
        response = HELPERS.snakeToCamel(response.data);

        dispatch({
            type: PRODUCT_CREATE_SUCCESS,
            payload: response
        })
    }
    catch (error) {
        dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const updateProduct = (id, data) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_UPDATE_REQUEST
        })

        const {
            userLogin: { user }
        } = getState();

        const configs = {
            headers: {
                Authorization: `Bearer ${user.access}`
            },
        }
        data = HELPERS.camelToSnake(data);
        let response = await PRODUCT_APIS.updateProduct(id, data, configs);
        response = HELPERS.snakeToCamel(response.data);

        dispatch({
            type: PRODUCT_UPDATE_SUCCESS,
            payload: response
        })

        dispatch({
            type: PRODUCT_DETAIL_SUCCESS,
            payload: response
        })
    }
    catch (error) {
        dispatch({
            type: PRODUCT_UPDATE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}
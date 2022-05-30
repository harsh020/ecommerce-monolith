import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,

    ORDER_DETAIL_REQUEST,
    ORDER_DETAIL_SUCCESS,
    ORDER_DETAIL_FAIL,

    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL,

    USER_ORDER_LIST_REQUEST,
    USER_ORDER_LIST_SUCCESS,
    USER_ORDER_LIST_FAIL,

    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAIL,

    ORDER_UPDATE_REQUEST,
    ORDER_UPDATE_SUCCESS,
    ORDER_UPDATE_FAIL,
} from "./orderConstants";
import {HELPERS} from "../../utils/helpers";
import {ORDER_APIS} from "../../apis/orderApis";
import {CART_CLEAR_ITEMS} from "../cart/cartConstants";

export const createOrder = (data) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_CREATE_REQUEST,
        });

        const {
            userLogin: { user }
        } = getState();

        const configs = {
            headers: {
                Authorization: `Bearer ${user.access}`
            },
        }

        const req = HELPERS.orderCreateRequestObj(data);
        let res = await ORDER_APIS.createOrder(req, configs);
        res = HELPERS.snakeToCamel(res.data);

        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: res
        });

        dispatch({
            type: CART_CLEAR_ITEMS,
            payload: res
        })

        localStorage.removeItem('cartItems');
    }
    catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        });
    }
}

export const getOrderDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_DETAIL_REQUEST,
        });

        const {
            userLogin: { user }
        } = getState();

        const configs = {
            headers: {
                Authorization: `Bearer ${user.access}`
            },
        }

        let res = await ORDER_APIS.orderDetails(id, configs);
        res = HELPERS.snakeToCamel(res.data);

        dispatch({
            type: ORDER_DETAIL_SUCCESS,
            payload: res
        });
    }
    catch (error) {
        dispatch({
            type: ORDER_DETAIL_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        });
    }
}

export const payOrder = (id, paymentResult) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_PAY_REQUEST,
        });

        const {
            userLogin: { user }
        } = getState();

        const configs = {
            headers: {
                Authorization: `Bearer ${user.access}`
            },
        }
        const data = {
            payment: {
                payment_status: paymentResult
            }
        }
        let res = await ORDER_APIS.orderUpdate(id, data, configs);
        res = HELPERS.snakeToCamel(res.data);

        dispatch({
            type: ORDER_PAY_SUCCESS,
            payload: res
        });
    }
    catch (error) {
        dispatch({
            type: ORDER_PAY_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        });
    }
}

export const listUserOrders = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_ORDER_LIST_REQUEST,
        });

        const {
            userLogin: { user }
        } = getState();

        const configs = {
            headers: {
                Authorization: `Bearer ${user.access}`
            },
        }

        let res = await ORDER_APIS.listUserOrders(configs);
        res = res.data.map(r => HELPERS.snakeToCamel(r));

        dispatch({
            type: USER_ORDER_LIST_SUCCESS,
            payload: res
        });
    }
    catch (error) {
        dispatch({
            type: USER_ORDER_LIST_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        });
    }
}

export const listOrders = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_LIST_REQUEST,
        });

        const {
            userLogin: { user }
        } = getState();

        const configs = {
            headers: {
                Authorization: `Bearer ${user.access}`
            },
        }

        let res = await ORDER_APIS.listOrders(configs);
        res = res.data.map(r => HELPERS.snakeToCamel(r));

        dispatch({
            type: ORDER_LIST_SUCCESS,
            payload: res
        });
    }
    catch (error) {
        dispatch({
            type: ORDER_LIST_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        });
    }
}

export const updateOrder = (id, data) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_UPDATE_REQUEST,
        });

        const {
            userLogin: { user }
        } = getState();

        const configs = {
            headers: {
                Authorization: `Bearer ${user.access}`
            },
        }

        data = HELPERS.camelToSnake(data);
        let res = await ORDER_APIS.updateOrder(id, data, configs);
        res = HELPERS.snakeToCamel(res.data);

        dispatch({
            type: ORDER_UPDATE_SUCCESS,
            payload: res
        });
    }
    catch (error) {
        dispatch({
            type: ORDER_UPDATE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        });
    }
}
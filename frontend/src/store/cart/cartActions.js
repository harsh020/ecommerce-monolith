import {
    CART_ADD_ITEM, CART_MODIFY_ITEM, CART_PAYMENT_METHOD_SAVE,
    CART_REMOVE_ITEM, CART_SHIPPING_ADDRESS_SAVE
} from "./cartConstants";

import {PRODUCT_APIS} from "../../apis/productApis";
import {HELPERS} from "../../utils/helpers";

export const addToCart = (id, quantity) => async (dispatch, getState) => {
    const response = await PRODUCT_APIS.productDetails(id);
    const item = HELPERS.snakeToCamel(response.data);
    console.log(item);

    dispatch({
       type: CART_ADD_ITEM,
       payload: {
           ...item,
           quantity
       }
    });

    const cartItems = getState().cart.cartItems;
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

export const modifyCart = (id, quantity) => async (dispatch, getState) => {
    const response = await PRODUCT_APIS.productDetails(id);
    const item = HELPERS.snakeToCamel(response.data);

    dispatch({
        type: CART_MODIFY_ITEM,
        payload: {
            ...item,
            quantity
        }
    });

    const cartItems = getState().cart.cartItems;
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id
    })

    const cartItems = getState().cart.cartItems;
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

export const saveShippingAddress = (data) => (dispatch) => {
    dispatch({
        type: CART_SHIPPING_ADDRESS_SAVE,
        payload: data
    })

    localStorage.setItem('shippingAddress', JSON.stringify(data));
}

export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({
        type: CART_PAYMENT_METHOD_SAVE,
        payload: data
    })

    localStorage.setItem('paymentMethod', JSON.stringify(data));
}
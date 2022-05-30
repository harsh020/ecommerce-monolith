import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
    productCreateReducer,
    productDeleteReducer,
    productDetailsReducer,
    productListReducer, productTopRatedReducer, productUpdateReducer
} from "./product/productReducers";
import {cartReducer} from "./cart/cartReducers";
import {
    userDeleteReducer,
    userListReducer,
    userLoginReducer,
    userProfileReducer,
    userProfileUpdateReducer,
    userRegisterReducer, userUpdateReducer
} from "./user/userReducers";
import {
    orderCreateReducer,
    orderDetailsReducer,
    userOrderListReducer,
    orderPayReducer,
    orderListReducer, orderUpdateReducer
} from './order/orderReducers';
import {reviewCreateReducer, reviewListReducer} from "./review/reviewReducers";

const reducers = combineReducers({
    productList: productListReducer,
    productTopRated: productTopRatedReducer,
    productDetails: productDetailsReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,

    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userUpdate: userUpdateReducer,
    userProfile: userProfileReducer,
    userProfileUpdate: userProfileUpdateReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,

    cart: cartReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    userOrderList: userOrderListReducer,
    orderList: orderListReducer,
    orderUpdate: orderUpdateReducer,

    reviewCreate: reviewCreateReducer,
    reviewList: reviewListReducer, // Note: we never use this, we are getting reviews in product list.
});

const cartItemFromStorage = localStorage.getItem('cartItems') ?
    JSON.parse(localStorage.getItem('cartItems')) : [];

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ?
    JSON.parse(localStorage.getItem('shippingAddress')) : {};

const paymentMethodFromStorage = localStorage.getItem('paymentMethod') ?
    JSON.parse(localStorage.getItem('paymentMethod')) : null;

const userFromStorage = localStorage.getItem('user') ?
    JSON.parse(localStorage.getItem('user')) : null;

const initialState = {
    cart: {
        cartItems: cartItemFromStorage,
        shippingAddress: shippingAddressFromStorage,
        paymentMethod: paymentMethodFromStorage
    },
    userLogin: {
        user: userFromStorage
    }
};
const middlewares = [thunk];

const store = createStore(reducers, initialState,
    composeWithDevTools(applyMiddleware(...middlewares)));

export default store;
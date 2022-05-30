import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,

    USER_LOGOUT,

    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,

    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_RESET,

    USER_PROFILE_UPDATE_REQUEST,
    USER_PROFILE_UPDATE_SUCCESS,
    USER_PROFILE_UPDATE_FAIL,
    USER_PROFILE_RESET,

    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_LIST_RESET,

    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,

    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
} from './userConstants';
import {USER_APIS} from "../../apis/userApis";
import {HELPERS} from "../../utils/helpers";
import {USER_ORDER_LIST_RESET} from "../order/orderConstants";
import {CART_CLEAR_ITEMS} from "../cart/cartConstants";

export const login = (username, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })

        const response = await USER_APIS.userLogin(username, password);
        const data = HELPERS.snakeToCamel(response.data);

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('user', JSON.stringify(data));
    }
    catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message
                     ? error.response.data.message
                     : error.message
        })
    }
}

export const logout = () => (dispatch) => {
    localStorage.removeItem('user');
    dispatch({
        type: USER_LOGOUT
    })

    dispatch({
        type: USER_DETAILS_RESET
    })

    dispatch({
        type: USER_ORDER_LIST_RESET
    })

    dispatch({
        type: USER_LIST_RESET
    })

    dispatch({
        type: CART_CLEAR_ITEMS
    })
}

export const register = (data) => async (dispatch) => {
    data = HELPERS.camelToSnake(data);
    try {
        dispatch({
            type: USER_REGISTER_REQUEST
        })

        let response = await USER_APIS.userRegister(data);
        response = HELPERS.snakeToCamel(response.data);

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: response
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: response
        })

        localStorage.setItem('user', JSON.stringify(response));
    }
    catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DETAILS_REQUEST
        })

        const {
            userLogin: { user }
        } = getState();

        const configs = {
            headers: {
                Authorization: `Bearer ${user.access}`
            },
        }
        let response = await USER_APIS.getUserProfile(id, configs);
        response = HELPERS.snakeToCamel(response.data);

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: response
        })
    }
    catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const updateUserDetails = (data) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_PROFILE_UPDATE_REQUEST
        })

        const {
            userLogin: { user }
        } = getState();

        const configs = {
            headers: {
                Authorization: `Bearer ${user.access}`
            },
        }
        let response = await USER_APIS.updateUserProfile(data, configs);
        response = HELPERS.snakeToCamel(response.data);

        dispatch({
            type: USER_PROFILE_UPDATE_SUCCESS,
            payload: response
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: response
        })

        localStorage.setItem('user', JSON.stringify(response));
    }
    catch (error) {
        dispatch({
            type: USER_PROFILE_UPDATE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const listUsers = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_LIST_REQUEST
        })

        const {
            userLogin: { user }
        } = getState();

        const configs = {
            headers: {
                Authorization: `Bearer ${user.access}`
            },
        }
        let response = await USER_APIS.listUsers(configs);
        response = response.data.map(res => HELPERS.snakeToCamel(res));

        dispatch({
            type: USER_LIST_SUCCESS,
            payload: response
        })
    }
    catch (error) {
        dispatch({
            type: USER_LIST_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const deleteUser = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DELETE_REQUEST
        })

        const {
            userLogin: { user }
        } = getState();

        const configs = {
            headers: {
                Authorization: `Bearer ${user.access}`
            },
        }
        let response = await USER_APIS.deleteUser(id, configs);
        response = response.data.map(res => HELPERS.snakeToCamel(res));

        dispatch({
            type: USER_DELETE_SUCCESS,
            payload: response
        })
    }
    catch (error) {
        dispatch({
            type: USER_DELETE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const updateUser = (id, data) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_REQUEST
        })

        const {
            userLogin: { user }
        } = getState();

        const configs = {
            headers: {
                Authorization: `Bearer ${user.access}`
            },
        }

        // TODO: convert all `camelToSnake` and `snakeToCamel` to axios interceptor
        data = HELPERS.camelToSnake(data);
        console.log(data)
        let response = await USER_APIS.updateUser(id, data, configs);
        response = HELPERS.snakeToCamel(response.data);

        dispatch({
            type: USER_UPDATE_SUCCESS,
            payload: response
        })

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: response
        })
    }
    catch (error) {
        dispatch({
            type: USER_UPDATE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}
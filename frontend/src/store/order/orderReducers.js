import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_CREATE_RESET,

    ORDER_DETAIL_REQUEST,
    ORDER_DETAIL_SUCCESS,
    ORDER_DETAIL_FAIL,
    ORDER_DETAIL_RESET,

    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_PAY_RESET,

    USER_ORDER_LIST_REQUEST,
    USER_ORDER_LIST_SUCCESS,
    USER_ORDER_LIST_FAIL,
    USER_ORDER_LIST_RESET,

    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAIL,
    ORDER_LIST_RESET,

    ORDER_UPDATE_REQUEST,
    ORDER_UPDATE_SUCCESS,
    ORDER_UPDATE_FAIL,
    ORDER_UPDATE_RESET,
} from "./orderConstants";

export const orderCreateReducer = (state={}, action) => {
    switch (action.type) {
        case ORDER_CREATE_REQUEST:
            return {
                loading: true
            }

        case ORDER_CREATE_SUCCESS:
            return {
                loading: false,
                success: true,
                order: action.payload
            }

        case ORDER_CREATE_FAIL:
            return {
                loading: false,
                success: false,
                error: action.payload
            }

        case ORDER_CREATE_RESET:
            return {}

        default:
            return state
    }
}

export const orderDetailsReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_DETAIL_REQUEST:
            return {
                loading: true
            }

        case ORDER_DETAIL_SUCCESS:
            return {
                loading: false,
                order: action.payload
            }

        case ORDER_DETAIL_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case ORDER_DETAIL_RESET:
            return {}

        default:
            return state
    }
}


export const orderPayReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_PAY_REQUEST:
            return {
                loading: true
            }

        case ORDER_PAY_SUCCESS:
            return {
                loading: false,
                success: true
            }

        case ORDER_PAY_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case ORDER_PAY_RESET:
            return {}

        default:
            return state
    }
}

export const userOrderListReducer = (state = {orders: []}, action) => {
    switch (action.type) {
        case USER_ORDER_LIST_REQUEST:
            return {
                loading: true
            }

        case USER_ORDER_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: action.payload
            }

        case USER_ORDER_LIST_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case USER_ORDER_LIST_RESET:
            return {
                ...state,
                orders: []
            }

        default:
            return state
    }
}

export const orderListReducer = (state = {orders: []}, action) => {
    switch (action.type) {
        case ORDER_LIST_REQUEST:
            return {
                loading: true
            }

        case ORDER_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: action.payload
            }

        case ORDER_LIST_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case ORDER_LIST_RESET:
            return {
                ...state,
                orders: []
            }

        default:
            return state
    }
}

export const orderUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_UPDATE_REQUEST:
            return {
                loading: true
            }

        case ORDER_UPDATE_SUCCESS:
            return {
                loading: false,
                success: true
            }

        case ORDER_UPDATE_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case ORDER_UPDATE_RESET:
            return {}

        default:
            return state
    }
}
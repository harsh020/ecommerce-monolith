import { HELPERS } from '../utils/helpers';

export const ORDER_APIS = {
    createOrder: (data, configs) => {
        return HELPERS.request({
            baseURL: 'http://localhost:8000/api',
            url: '/order/create/',
            method: 'POST',
            data: data,
            ...configs
        })
    },

    orderDetails: (id, configs) => {
        return HELPERS.request({
            baseURL: 'http://localhost:8000/api',
            url: `/order/${id}/`,
            method: 'GET',
            ...configs
        })
    },

    orderUpdate: (id, data, configs) => {
        return HELPERS.request({
            baseURL: 'http://localhost:8000/api',
            url: `/order/${id}/`,
            method: 'PATCH',
            data: data,
            ...configs
        })
    },

    listUserOrders: (configs) => {
        return HELPERS.request({
            baseURL: 'http://localhost:8000/api',
            url: `/order/user/list/`,
            method: 'GET',
            ...configs
        })
    },

    listOrders: (configs) => {
        return HELPERS.request({
            baseURL: 'http://localhost:8000/api',
            url: `/order/list/`,
            method: 'GET',
            ...configs
        })
    },

    updateOrder: (id, data, configs) => {
        return HELPERS.request({
            baseURL: 'http://localhost:8000/api',
            url: `/order/update/${id}/`,
            method: 'PATCH',
            data: data,
            ...configs
        })
    },
}
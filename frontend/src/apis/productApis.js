import { HELPERS } from '../utils/helpers';

export const PRODUCT_APIS = {
    listProducts: (params) => {
        return HELPERS.request({
            baseURL: 'http://localhost:8000/api',
            url: '/products/list/',
            params: params,
            method: 'GET'
        })
    },

    listTopRatedProducts: (params) => {
        return HELPERS.request({
            baseURL: 'http://localhost:8000/api',
            url: '/products/list/top/',
            params: params,
            method: 'GET'
        })
    },

    createProduct: (data, configs) => {
        return HELPERS.request({
            baseURL: 'http://localhost:8000/api',
            url: `/products/create/`,
            method: 'POST',
            ...configs
        })
    },

    updateProduct: (id, data, configs) => {
        return HELPERS.request({
            baseURL: 'http://localhost:8000/api',
            url: `/products/update/${id}/`,
            method: 'PATCH',
            data: data,
            ...configs
        })
    },

    uploadProductImage: (id, data, configs) => {
        return HELPERS.request({
            baseURL: 'http://localhost:8000/api',
            url: `/products/image/upload/${id}/`,
            method: 'POST',
            data: data,
            ...configs
        })
    },

    deleteProduct: (id, configs) => {
        return HELPERS.request({
            baseURL: 'http://localhost:8000/api',
            url: `/products/delete/${id}/`,
            method: 'DELETE',
            ...configs
        })
    },

    productDetails: (slug) => {
        return HELPERS.request({
            baseURL: 'http://localhost:8000/api',
            url: `/products/${slug}/`,
            method: 'GET'
        })
    }
}
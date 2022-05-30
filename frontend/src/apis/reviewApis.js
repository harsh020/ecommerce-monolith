import { HELPERS } from '../utils/helpers';

export const REVIEW_APIS = {
    listReviews: () => {
        return HELPERS.request({
            baseURL: 'http://localhost:8000/api',
            url: '/review/list/',
            method: 'GET'
        })
    },

    createReview: (data, configs) => {
        return HELPERS.request({
            baseURL: 'http://localhost:8000/api',
            url: `/review/create/`,
            method: 'POST',
            data: data,
            ...configs
        })
    },
}
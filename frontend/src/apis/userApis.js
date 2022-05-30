import { HELPERS } from "../utils/helpers";

export const USER_APIS = {
    userLogin: (username, password) => {
        return HELPERS.request({
            baseURL: 'http://localhost:8000/api',
            url: `/user/login/`,
            method: 'POST',
            data: {
                username: username,
                password: password
            }
        })
    },

    userRegister: (data) => {
        return HELPERS.request({
            baseURL: 'http://localhost:8000/api',
            url: `/user/register/`,
            method: 'POST',
            data: data
        })
    },

    deleteUser: (id, configs) => {
        return HELPERS.request({
            baseURL: 'http://localhost:8000/api',
            url: `/user/delete/${id}/`,
            method: 'DELETE',
            ...configs
        })
    },

    updateUser: (id, data, configs) => {
        return HELPERS.request({
            baseURL: 'http://localhost:8000/api',
            url: `/user/update/${id}/`,
            method: 'PATCH',
            data: data,
            ...configs
        })
    },

    listUsers: (configs) => {
        return HELPERS.request({
            baseURL: 'http://localhost:8000/api',
            url: `/user/list/`,
            method: 'GET',
            ...configs
        })
    },

    getUserProfile: (id, configs) => {
        return HELPERS.request({
            baseURL: 'http://localhost:8000/api',
            url: `/user/${id}/`,
            method: 'GET',
            ...configs
        })
    },

    updateUserProfile: (data, configs) => {
        return HELPERS.request({
            baseURL: 'http://localhost:8000/api',
            url: `/user/profile/`,
            method: 'PATCH',
            data: data,
            ...configs
        })
    }
}
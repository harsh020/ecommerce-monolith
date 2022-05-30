import {
    REVIEW_LIST_REQUEST,
    REVIEW_LIST_SUCCESS,
    REVIEW_LIST_FAIL,

    REVIEW_CREATE_REQUEST,
    REVIEW_CREATE_SUCCESS,
    REVIEW_CREATE_FAIL,
} from './reviewConstants';
import {HELPERS} from "../../utils/helpers";
import {REVIEW_APIS} from "../../apis/reviewApis";

export const listReviews = () => async (dispatch) => {
    try {
        dispatch({
            type: REVIEW_LIST_REQUEST
        });

        const response = await REVIEW_APIS.listReviews();
        const data = response.data.map(res => HELPERS.snakeToCamel(res));
        dispatch({
            type: REVIEW_LIST_SUCCESS,
            payload: data
        });
    }
    catch (error) {
        dispatch({
            type: REVIEW_LIST_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        });
    }
}

export const createReview = (data) => async (dispatch, getState) => {
    try {
        dispatch({
            type: REVIEW_CREATE_REQUEST
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
        console.log(data);
        let response = await REVIEW_APIS.createReview(data, configs);
        response = HELPERS.snakeToCamel(response.data);

        dispatch({
            type: REVIEW_CREATE_SUCCESS,
            payload: response
        })
    }
    catch (error) {
        dispatch({
            type: REVIEW_CREATE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}
import {
    AUTH_GET_STATUS,
    AUTH_GET_STATUS_SUCCESS,
    AUTH_GET_STATUS_FAILURE
} from './ActionTypes';
import axios from 'axios';

/* GET STATUS */
export function getStatusRequest() {
    return (dispatch) => {
        // inform Get Status API is starting
        dispatch(getStatus());

        return axios.get('/api/account/getInfo')
        .then((response) => {
            dispatch(getStatusSuccess(response.data.info.email));
        }).catch((error) => {
            dispatch(getStatusFailure());
        });
    };
}

export function getStatus() {
    return {
        type: AUTH_GET_STATUS
    };
}

export function getStatusSuccess(email) {
    return {
        type: AUTH_GET_STATUS_SUCCESS,
        email
    };
}

export function getStatusFailure() {
    return {
        type: AUTH_GET_STATUS_FAILURE
    };
}

import {
    AUTH_REGISTER,
    AUTH_REGISTER_SUCCESS,
    AUTH_REGISTER_FAILURE
} from './ActionTypes';
import axios from 'axios';

export function registerRequest(email, password) {
    return (dispatch) => {
        // Inform Register API is starting
        dispatch(register());

        return axios.post('/api/account/signup', { email, password })
        .then((response) => {
            dispatch(registerSuccess());
        }).catch((error) => {
            dispatch(registerFailure(error.response.data.code));
        });
  };
}

export function register() {
    return {
        type: AUTH_REGISTER
    };
}

export function registerSuccess() {
    return {
        type: AUTH_REGISTER_SUCCESS
    };
}

export function registerFailure(error) {
    return {
        type: AUTH_REGISTER_FAILURE,
        error
    };
}

import {
  AUTH_LOGIN,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_REGISTER,
  AUTH_REGISTER_SUCCESS,
  AUTH_REGISTER_FAILURE,
  AUTH_GET_STATUS,
  AUTH_GET_STATUS_SUCCESS,
  AUTH_GET_STATUS_FAILURE,
  AUTH_LOGOUT
} from './ActionTypes';
import axios from 'axios';

/* LOGIN */
export function loginRequest(email, password) {
  return (dispatch) => {
    dispatch(login());
    //api request
    return axios.post('/api/account/signin', { email, password })
    .then((response) => {
      //succed
      dispatch(loginSuccess(response.data.info));
    }).catch((error) => {
      //failed
      dispatch(loginFailure());
    });
  };
}

/* REGISTER */
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

/* GET STATUS */
export function getStatusRequest() {
  return (dispatch) => {
      // inform Get Status API is starting
      dispatch(getStatus());

      return axios.get('/api/account/getInfo')
      .then((response) => {
          dispatch(getStatusSuccess(response.data.info));
      }).catch((error) => {
          dispatch(getStatusFailure());
      });
  };
}

/* LOGOUT */
export function logoutRequest() {
    return (dispatch) => {
        return axios.post('/api/account/logout')
        .then((response) => {
            dispatch(logout());
        });
    };
}

export function login() {
  return {
    type: AUTH_LOGIN
  };
}

export function loginSuccess(info) {
  return {
    type: AUTH_LOGIN_SUCCESS,
    info
  };
}

export function loginFailure() {
  return {
    type: AUTH_LOGIN_FAILURE
  };
}

export function register() {
  return {
      type: AUTH_REGISTER
  };
}

export function registerSuccess() {
  return {
      type: AUTH_REGISTER_SUCCESS,
  };
}

export function registerFailure(error) {
  return {
      type: AUTH_REGISTER_FAILURE,
      error
  };
}

export function getStatus() {
    return {
        type: AUTH_GET_STATUS
    };
}

export function getStatusSuccess(info) {
    return {
        type: AUTH_GET_STATUS_SUCCESS,
        info
    };
}

export function getStatusFailure() {
    return {
        type: AUTH_GET_STATUS_FAILURE
    };
}

export function logout() {
    return {
        type: AUTH_LOGOUT
    };
}

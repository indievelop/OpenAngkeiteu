import {
    ANGKEITEU_POST,
    ANGKEITEU_POST_SUCCESS,
    ANGKEITEU_POST_FAILURE,
    ANGKEITEU_LIST,
    ANGKEITEU_LIST_SUCCESS,
    ANGKEITEU_LIST_FAILURE,
    ANGKEITEU_GET,
    ANGKEITEU_GET_SUCCESS,
    ANGKEITEU_GET_FAILURE
} from './ActionTypes';
import axios from 'axios';

/* angkeiteu POST */
export function angkeiteuPostRequest(title, description, options) {
    return (dispatch) => {
        // inform angkeiteu POST API is starting
        dispatch(angkeiteuPost());
        
        return axios.post('/api/angkeiteu/', { title, description, options })
        .then((response) => {
            dispatch(angkeiteuPostSuccess());
        }).catch((error) => {
            dispatch(angkeiteuPostFailure(error.response.data.code));
        });
    };
}

export function angkeiteuPost() {
    return {
        type: ANGKEITEU_POST
    };
}

export function angkeiteuPostSuccess() {
    return {
        type: ANGKEITEU_POST_SUCCESS
    };
}

export function angkeiteuPostFailure(error) {
    return {
        type: ANGKEITEU_POST_FAILURE,
        error
    };
}

/* ANGKEITEU LIST */

/*
    Parameter:
        - isInitial: whether it is for initial loading
        - listType:  OPTIONAL; loading 'old' angkeiteu or 'new' angkeiteu
        - id:        OPTIONAL; angkeiteu id (one at the bottom or one at the top)
        - username:  OPTIONAL; find angkeiteus of following user
*/
export function angkeiteuListRequest(isInitial, listType, id, username) {
    return (dispatch) => {
      // inform angkeiteu list API is starting
      dispatch(angkeiteuList());

      let url = '/api/angkeiteu';

      if(typeof username === 'undefined') {
          // username not given, load public angkeiteu
          url = isInitial ? url : `${url}/${listType}/${id}`;
          // or url + '/' + listType + '/' +  id
      } else {
          // load angkeiteus of specific user
          /* to be implemented */
      }

      return axios.get(url)
      .then((response) => {
          dispatch(angkeiteuListSuccess(response.data, isInitial, listType));
      }).catch((error) => {
          dispatch(angkeiteuListFailure());
      });
    };
}

export function angkeiteuList() {
    return {
        type: ANGKEITEU_LIST
    };
}

export function angkeiteuListSuccess(data, isInitial, listType) {
    return {
        type: ANGKEITEU_LIST_SUCCESS,
        data,
        isInitial,
        listType
    };
}

export function angkeiteuListFailure() {
    return {
        type: ANGKEITEU_LIST_FAILURE
    };
}

/** ANGKEITEU GET **/
export function angkeiteuGetRequest(data) {
  return (dispatch) => {
    //dev....
    dispatch(angkeiteuGet());
    return new Promise((resolve, resject) => {

      dispatch(angkeiteuGetSuccess(data));
      resolve();
    });
  }
}

export function angkeiteuGet() {
  return {
    type: ANGKEITEU_GET
  };
}

export function angkeiteuGetSuccess(data) {
  return {
    type: ANGKEITEU_GET_SUCCESS,
    data
  }
}

export function angkeiteuGetFailure() {
  return {
    type: ANGKEITEU_GET_FAILURE
  }
}

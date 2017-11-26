import {
    COMMENT_POST,
    COMMENT_POST_SUCCESS,
    COMMENT_POST_FAILURE,
    COMMENT_LIST,
    COMMENT_LIST_SUCCESS,
    COMMENT_LIST_FAILURE,
} from './ActionTypes';
import axios from 'axios';

/* comment POST */

export function commentPostRequest(angkeiteuId, content) {
  return (dispatch) => {
    // inform comment POST API is starting
    dispatch(commentPost());
    return axios.post(`/api/comment/${angkeiteuId}`, { content })
    .then((response) => {
        dispatch(commentPostSuccess(response.data.id));
    }).catch((error) => {
        dispatch(commentPostFailure(error.response.data.code));
    });
  };
}

export function commentPost() {
    return {
        type: COMMENT_POST
    };
}

export function commentPostSuccess(id) {
    return {
        type: COMMENT_POST_SUCCESS,
        id
    };
}

export function commentPostFailure(error) {
    return {
        type: COMMENT_POST_FAILURE,
        error
    };
}

/* COMMENT LIST */
export function commentListRequest(isInitial, angkeiteuId, listType, id, email) {
    return (dispatch) => {
      let url = `/api/comment/${angkeiteuId}`;

      dispatch(commentList());
      if(typeof email === 'undefined') {
          url = isInitial ? url : `${url}/${listType}/${id}`;
      } else {
          // load angkeiteus of specific user
          /* to be implemented */
      }

      return axios.get(url)
      .then((response) => {
          dispatch(commentListSuccess(response.data, isInitial, listType));
      }).catch((error) => {
          dispatch(commentListFailure(error));
      });
    };
}

export function commentList() {
    return {
        type: COMMENT_LIST
    };
}

export function commentListSuccess(data, isInitial, listType) {
    return {
        type: COMMENT_LIST_SUCCESS,
        data,
        isInitial,
        listType
    };
}

export function commentListFailure(error) {
    return {
        type: COMMENT_LIST_FAILURE,
        error
    };
}

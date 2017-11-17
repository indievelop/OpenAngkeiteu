import {
    ANGKEITEU_POST,
    ANGKEITEU_POST_SUCCESS,
    ANGKEITEU_POST_FAILURE,
    ANGKEITEU_LIST,
    ANGKEITEU_LIST_SUCCESS,
    ANGKEITEU_LIST_FAILURE,
    ANGKEITEU_GET,
    ANGKEITEU_GET_SUCCESS,
    ANGKEITEU_GET_FAILURE,
    ANGKEITEU_PARTICIPATE,
    ANGKEITEU_PARTICIPATE_SUCCESS,
    ANGKEITEU_PARTICIPATE_FAILURE
} from './ActionTypes';
import axios from 'axios';

/* angkeiteu POST */
export function angkeiteuPostRequest(title, description, options, parentId, triggerOptionId) {
    return (dispatch) => {
        // inform angkeiteu POST API is starting
        dispatch(angkeiteuPost());

        return axios.post('/api/angkeiteu/', { title, description, options, parentId, triggerOptionId, })
        .then((response) => {
            dispatch(angkeiteuPostSuccess(response.data.id));
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

export function angkeiteuPostSuccess(id) {
    return {
        type: ANGKEITEU_POST_SUCCESS,
        id
    };
}

export function angkeiteuPostFailure(error) {
    return {
        type: ANGKEITEU_POST_FAILURE,
        error
    };
}

/* ANGKEITEU LIST */
export function angkeiteuListRequest(isInitial, orderType, listType, id, email) {
    return (dispatch) => {
      let url = '/api/angkeiteu';

      dispatch(angkeiteuList(orderType));

      if(orderType === 'hotToday') {
        url += '/hot/today'
      } else if(orderType === 'hotThisMonth') {
        url += '/hot/thisMonth'
      }

      if(typeof email === 'undefined') {
          url = isInitial ? url : `${url}/${listType}/${id}`;
      } else {
          // load angkeiteus of specific user
          /* to be implemented */
      }

      return axios.get(url)
      .then((response) => {
          dispatch(angkeiteuListSuccess(response.data, isInitial, orderType, listType));
      }).catch((error) => {
          dispatch(angkeiteuListFailure(orderType, error));
      });
    };
}

export function angkeiteuList(orderType) {
    return {
        type: ANGKEITEU_LIST,
        orderType
    };
}

export function angkeiteuListSuccess(data, isInitial, orderType, listType) {
    return {
        type: ANGKEITEU_LIST_SUCCESS,
        data,
        isInitial,
        orderType,
        listType
    };
}

export function angkeiteuListFailure(orderType, error) {
    return {
        type: ANGKEITEU_LIST_FAILURE,
        orderType,
        error
    };
}

/** ANGKEITEU GET **/
export function angkeiteuGetRequest(id) {
  return (dispatch) => {
    let url = '/api/angkeiteu';

    dispatch(angkeiteuGet());
    url = `${url}/${id}`;
    return axios.get(url)
    .then((response) => {
      dispatch(angkeiteuGetSuccess(response.data));
    }).catch((error) => {
      dispatch(angkeiteuGetFailure(error));
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
  };
}

export function angkeiteuGetFailure(error) {
  return {
    type: ANGKEITEU_GET_FAILURE,
    error
  };
}

/** ANGKEITEU PARTICIPATE **/
export function angkeiteuParticipateRequest(id, optionId) {
  return (dispatch) => {
    let url = '/api/angkeiteu';

    dispatch(angkeiteuParticipate());
    url = `${url}/${id}/selectOption/${optionId}`;
    return axios.put(url)
    .then((response) => {
      dispatch(angkeiteuParticipateSuccess(response.data));
    }).catch((error) => {
      dispatch(angkeiteuParticipateFailure(error.response.data));
    });
  }
}

export function angkeiteuParticipate() {
  return {
    type: ANGKEITEU_PARTICIPATE
  };
}

export function angkeiteuParticipateSuccess(data) {
  return {
    type: ANGKEITEU_PARTICIPATE_SUCCESS,
    data
  };
}

export function angkeiteuParticipateFailure(error) {
  return {
    type: ANGKEITEU_PARTICIPATE_FAILURE,
    error
  };
}

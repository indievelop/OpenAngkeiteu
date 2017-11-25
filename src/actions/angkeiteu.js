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
export function angkeiteuPostRequest(title, description, options, triggerOptionId) {
    return (dispatch) => {
        // inform angkeiteu POST API is starting
        dispatch(angkeiteuPost());

        return axios.post('/api/angkeiteu/', { title, description, options, triggerOptionId })
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
export function angkeiteuListRequest(isInitial, listName, listType, id, email) {
    return (dispatch) => {
      let url = '/api/angkeiteu';

      dispatch(angkeiteuList(listName));

      switch (listName) {
        case 'hotToday':
          url += '/hot/today';
          break;
        case 'hotThisMonth':
          url += '/hot/thisMonth'
          break;
        default:
          break;
      }

      if(typeof email === 'undefined') {
          url = isInitial ? url : `${url}/${listType}/${id}`;
      } else {
          // load angkeiteus of specific user
          /* to be implemented */
      }

      return axios.get(url)
      .then((response) => {
          dispatch(angkeiteuListSuccess(response.data, isInitial, listName, listType));
      }).catch((error) => {
          dispatch(angkeiteuListFailure(listName, error));
      });
    };
}

export function angkeiteuList(listName) {
    return {
        type: ANGKEITEU_LIST,
        listName
    };
}

export function angkeiteuListSuccess(data, isInitial, listName, listType) {
    return {
        type: ANGKEITEU_LIST_SUCCESS,
        data,
        isInitial,
        listName,
        listType
    };
}

export function angkeiteuListFailure(listName, error) {
    return {
        type: ANGKEITEU_LIST_FAILURE,
        listName,
        error
    };
}

/** ANGKEITEU GET **/
export function angkeiteuGetRequest(id, accountId) {
  return (dispatch) => {
    let url = '/api/angkeiteu';

    dispatch(angkeiteuGet());

    if(typeof accountId ==='undefined')
      url = `${url}/${id}`;
    else
      url = `${url}/${id}?accountId=${accountId}`;
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

/** TRIGGER ANGKEITEU LIST **/
export function triggerAngkeiteuListRequest(triggerOptionId) {
  return (dispatch) => {
    let url = '/api/angkeiteu';
    const listName = 'triggerList';
    const isInitial = true;
    const listType = undefined;

    dispatch(angkeiteuList(listName));
    url +=`?options._id=${triggerOptionId}`;
    return axios.get(url)
    .then((response) => {
        console.log(response.data);
        dispatch(angkeiteuListSuccess(response.data, isInitial, listName, listType));
    }).catch((error) => {
        dispatch(angkeiteuListFailure(listName, error));
    });
  };
}

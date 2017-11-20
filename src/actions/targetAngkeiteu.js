import {
  TARGET_ANGKEITEU_LIST,
  TARGET_ANGKEITEU_LIST_SUCCESS,
  TARGET_ANGKEITEU_LIST_FAILURE,
  TARGET_ANGKEITEU_LIST_INIT
} from './ActionTypes';
import axios from 'axios';


/** TARGET SUBANGKEITEU LIST **/
export function targetAngkeiteuListRequest(id) {
  return (dispatch) => {
    let url = '/api/angkeiteu';

    dispatch(targetAngkeiteuList());
    url = `${url}?triggerOptionId=${id}`;
    return axios.get(url)
    .then((response) => {
      dispatch(targetAngkeiteuListSuccess(response.data));
    }).catch((error) => {
      dispatch(targetAngkeiteuListFailure(error));
    });
  };
}

export function targetAngkeiteuList() {
  return {
    type: TARGET_ANGKEITEU_LIST
  };
}

export function targetAngkeiteuListSuccess(data) {
  return {
    type: TARGET_ANGKEITEU_LIST_SUCCESS,
    data
  };
}

export function targetAngkeiteuListFailure(error) {
  return {
    type: TARGET_ANGKEITEU_LIST_FAILURE,
    error
  };
}

export function targetAngkeiteuListInit() {
  return {
    type: TARGET_ANGKEITEU_LIST_INIT
  }
}

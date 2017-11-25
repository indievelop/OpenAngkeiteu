import {
  TARGET_ANGKEITEU_LIST,
  TARGET_ANGKEITEU_LIST_SUCCESS,
  TARGET_ANGKEITEU_LIST_FAILURE,
  TARGET_ANGKEITEU_LIST_INIT
} from './ActionTypes';
import axios from 'axios';


/** TARGET SUBANGKEITEU LIST **/
export function targetAngkeiteuListRequest(isInitial, triggerOptionId, listType, id) {
  return (dispatch) => {
    let url = '/api/angkeiteu';

    dispatch(targetAngkeiteuList());
    url = isInitial ? `${url}?triggerOptionId=${triggerOptionId}` : `${url}/${listType}/${id}?triggerOptionId=${triggerOptionId}`;
    return axios.get(url)
    .then((response) => {
      dispatch(targetAngkeiteuListSuccess(response.data, isInitial, listType));
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

export function targetAngkeiteuListSuccess(data, isInitial, listType) {
  return {
    type: TARGET_ANGKEITEU_LIST_SUCCESS,
    data,
    isInitial,
    listType
  };
}

export function targetAngkeiteuListFailure(error) {
  return {
    type: TARGET_ANGKEITEU_LIST_FAILURE,
    error
  };
}

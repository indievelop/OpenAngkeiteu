import {
  ANGKEITEU_SEARCH,
  ANGKEITEU_SEARCH_SUCCESS,
  ANGKEITEU_SEARCH_FAILURE,
  OPEN_SEARCH_VIEW,
  CLOSE_SEARCH_VIEW,
  ENTER_KEYWORD
} from './ActionTypes';
import axios from 'axios';

export function openSearchView() {
  return {
    type: OPEN_SEARCH_VIEW
  };
}

export function closeSearchView() {
  return {
    type: CLOSE_SEARCH_VIEW
  };
}

export function EnterKeyword(keyword) {
  return {
    type: ENTER_KEYWORD,
    keyword
  };
}

/** ANGKEITEU_SEARCH **/
export function angkeiteuSearchRequest(keyword) {
  return (dispatch) => {
    let url = '/api/angkeiteu/search'

    dispatch(angkeiteuSearch());
    url = `${url}/${keyword}`;
    return axios.get(url)
    .then((response) => {
      dispatch(angkeiteuSearchSuccess(response.data));
    }).catch((error) => {
      dispatch(angkeiteuSearchFailure(error));
    });
  }
}

export function angkeiteuSearch() {
  return {
    type: ANGKEITEU_SEARCH
  };
}

export function angkeiteuSearchSuccess(data) {
  return {
    type: ANGKEITEU_SEARCH_SUCCESS,
    data
  };
}

export function angkeiteuSearchFailure(error) {
  return {
    type: ANGKEITEU_SEARCH_FAILURE,
    error
  };
}

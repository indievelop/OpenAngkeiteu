import * as types from 'actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
  view: {
    isOpen: false,
    keyword: ''
  },
  result: {
    status:'INIT',
    error: -1,
    data:[]
  }

};

export default function search(state, action) {
  if(typeof state === "undefined") {
      state = initialState;
  }
  switch(action.type) {
    case types.OPEN_SEARCH_VIEW:
      return update(state, {
        view: {
          isOpen: { $set: true },
        }
      });
    case types.CLOSE_SEARCH_VIEW:
      return update(state, {
        view: {
          isOpen: { $set: false },
        }
      });
    case types.ENTER_KEYWORD:
      return update(state, {
        view: {
          isOpen: { $set: false },
          keyword: action.keyword
        }
      });
    case types.ANGKEITEU_SEARCH:
      return update(state, {
        result: {
          status: { $set: 'WAITING' },
          error: { $set: '-1' },
          data: []
        }
      });
    case types.ANGKEITEU_SEARCH_SUCCESS:
      return update(state, {
        result: {
          status: { $set: 'SUCCESS' },
          data: { $set: action.data }
        }
      });
    case types.ANGKEITEU_SEARCH_FAILURE:
      return update(state, {
        result: {
          status: { $set: 'FAILURE' },
          error: { $set: action.error }
        }
      });
    default:
      return state;
  }
}

import * as types from 'actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
  list: {
      status: 'INIT',
      error: -1,
      data: [],
      isLast: false
  }
}

export default function targetAngkeiteu(state, action) {
  if(typeof state === "undefined") {
      state = initialState;
  }

  switch(action.type) {
    case types.TARGET_ANGKEITEU_LIST:
      return update(state, {
        list: {
          status: { $set: 'WAITING' },
          error: { $set: -1 }
        }
      });
    case types.TARGET_ANGKEITEU_LIST_SUCCESS:
      return update(state, {
        list: {
          status: { $set: 'SUCCESS' },
          data: { $set: action.data },
          isLast: { $set: action.data.length < 8 }
        }
      });
    case types.TARGET_ANGKEITEU_LIST_FAILURE:
      return update(state, {
        list: {
          status: { $set: 'FAILURE' },
          error: { $set: action.error }
        }
      });
    case types.TARGET_ANGKEITEU_LIST_INIT:
      return update(state, {
        list: {
          status: { $set: 'INIT' },
          error: { $set: -1 },
          data: { $set: [] },
          isLast: { $set: false }
        }
      });
    default:
      return state;
  }
}

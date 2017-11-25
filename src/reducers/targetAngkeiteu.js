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
      if(action.isInitial) {
        return update(state, {
          list: {
            status: { $set: 'SUCCESS' },
            data: { $set: action.data },
            isLast: { $set: action.data.length < 8 }
          }
        });
      } else {
        if(action.listType === 'new') {
          return update(state, {
              list: {
                status: { $set: 'SUCCESS' },
                data: { $unshift: action.data },
              }
          });
        } else {
          return update(state, {
              list: {
                  status: { $set: 'SUCCESS' },
                  data: { $push: action.data },
                  isLast: { $set: action.data.length < 4 }
              }
          });
        }
      }
    case types.TARGET_ANGKEITEU_LIST_FAILURE:
      return update(state, {
        list: {
          status: { $set: 'FAILURE' },
          error: { $set: action.error }
        }
      });
    default:
      return state;
  }
}

import * as types from 'actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
    status: 'INIT',
    error: -1
};

export default function register(state, action) {
  if(typeof state === 'undefined')
    state = initialState;

    switch(action.type) {
          case types.AUTH_REGISTER:
              return update(state, {
                      status: { $set: 'WAITING' },
                      error: { $set: -1 }
              });
          case types.AUTH_REGISTER_SUCCESS:
              return update(state, {
                      status: { $set: 'SUCCESS' },
              });
          case types.AUTH_REGISTER_FAILURE:
              return update(state, {
                      status: { $set: 'FAILURE' },
                      error: { $set: action.error }
              });
          default:
              return state;
    }
}

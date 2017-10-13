import * as types from 'actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
  valid: false,
  isLoggedIn: false,
  currentUser: '',
};

export default function getStatus(state, action) {
  if(typeof state === 'undefined')
    state = initialState;

    switch(action.type) {
    /* codes .. */
        case types.AUTH_GET_STATUS:
            return update(state, {
                    isLoggedIn: { $set: true }
            });
        case types.AUTH_GET_STATUS_SUCCESS:
            return update(state, {
                    valid: { $set: true },
                    currentUser: { $set: action.email }
            });
        case types.AUTH_GET_STATUS_FAILURE:
            return update(state, {
                    valid: { $set: false },
                    isLoggedIn: { $set: false }
            });
        default:
            return state;
    }
}

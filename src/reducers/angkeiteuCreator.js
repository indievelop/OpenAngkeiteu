import * as types from 'actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
  status: 'INIT',
  triggerOption: {}
}

export default function angkeiteuCreator(state, action) {
  if(typeof state === "undefined") {
      state = initialState;
  }

  switch (action.type) {
    case types.ANGKEITEU_CREATOR_INIT:
      return update(state, {
        status: { $set: 'INIT' },
        triggerOption: { $set: action.data }
      });
    case types.ANGKEITEU_CREATOR_COMPLETE:
      return update(state, {
        status: { $set: 'COMPLETE' },
        triggerOption: { $set: {} }
      });
    default:
      return state;
  }
}

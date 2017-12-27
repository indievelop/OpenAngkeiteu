import * as types from 'actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
  selectedAngkeiteu: {}
}

export default function angkeiteuExplorer(state, action) {
  if(typeof state === "undefined") {
      state = initialState;
  }

  switch (action.type) {
    case types.ANGKEITEU_EXPLORER_ANGKEITEU_SELECT:
      return update(state, {
        selectedAngkeiteu: { $set: action.data}
      });
    case types.ANGKEITEU_EXPLORER_ANGKEITEU_UNSELECT:
      return update(state, {
        selectedAngkeiteu: { $set: {} }
      })
    default:
      return state;
  }
}

import * as types from 'actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
  status: 'INIT',
  selectedAngkeiteu: {},
  selectedOption: {}
}

export default function angkeiteuExplorer(state, action) {
  if(typeof state === "undefined") {
      state = initialState;
  }

  switch (action.type) {
    case types.ANGKEITEU_EXPLORER_INIT:
      return update(state, {
        status: { $set: 'INIT' },
        selectedAngkeiteu: { $set: {} },
        selectedOption: { $set: {} }
      });
    case types.ANGKEITEU_EXPLORER_ANGKEITEU_SELECT:
      return update(state, {
        status: { $set: 'WAITING' },
        selectedAngkeiteu: { $set: action.data }
      });
    case types.ANGKEITEU_EXPLORER_ANGKEITEU_UNSELECT:
      return update(state, {
        status: { $set: 'WAITING' },
        selectedAngkeiteu: { $set: {} }
      });
    case types.ANGKEITEU_EXPLORER_OPTION_SELECT:
      return update(state, {
        status: { $set: 'WAITING' },
        selectedOption: { $set: action.data }
      });
    case types.ANGKEITEU_EXPLORER_COMPLETE:
      return update(state, {
        status: { $set: 'COMPLETE' }
      });
    default:
      return state;
  }
}

import * as types from 'actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {}

export default function modal(state, action) {
  if(typeof state === "undefined") {
    state = initialState;
  }

  switch (action.type) {
    case types.MODAL_SHOW:
      return {
        [action.name]: true
      }
    case types.MODAL_HIDE:
      return {
        [action.name]: false
      }
    default:
      return state
  }
}

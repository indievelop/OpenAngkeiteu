import * as types from 'actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
  selectedObjId: ''
}

export default function imageViewer(state, action) {
  if(typeof state === "undefined") {
    state = initialState;
  }

  switch (action.type) {
    case types.IMAGE_VIEWER_OBJ_SELECT:
      return update(state, {
        selectedObjId: { $set: action.data }
      });
    default:
      return state;
  }
}

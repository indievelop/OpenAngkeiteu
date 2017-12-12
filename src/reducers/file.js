import * as types from 'actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
  upload: {
    status: 'INIT',
    error: ''
  }
}

export default function file(state, action) {
  if(typeof state === "undefined") {
      state = initialState;
  }

  switch (action.type) {
    case types.IMAGE_FILE_UPLOAD:
      return update(state, {
        upload: {
          status: { $set: 'WAITING'},
          error: { $set: '' }
        }
      });
    case types.IMAGE_FILE_UPLOAD_SUCCESS:
      return update(state, {
        upload: {
          status: { $set: 'SUCCESS'}
        }
      });
    case types.IMAGE_FILE_UPLOAD_FAILURE:
      return update(state, {
        upload: {
          status: { $set: 'FAILURE'},
          error: { $set: action.error }
        }
      });
    default:
      return state;
  }
}

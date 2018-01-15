import { IMAGE_VIEWER_OBJ_SELECT } from './ActionTypes';

export function selectObjId(objId) {
  return {
    type: IMAGE_VIEWER_OBJ_SELECT,
    data: objId
  }
}

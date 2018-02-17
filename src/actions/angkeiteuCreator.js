import {
  ANGKEITEU_CREATOR_INIT,
  ANGKEITEU_CREATOR_COMPLETE
} from './ActionTypes';

export function init(triggerOption) {
  return {
    type: ANGKEITEU_CREATOR_INIT,
    data: triggerOption
  }
}

export function complete() {
  return {
    type: ANGKEITEU_CREATOR_COMPLETE,
  }
}

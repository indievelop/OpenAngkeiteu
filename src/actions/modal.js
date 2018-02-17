import { MODAL_SHOW, MODAL_HIDE } from './ActionTypes'

export function showModal(name) {
  return {
    type: MODAL_SHOW,
    name
  }
}

export function hideModal(name) {
  return {
    type: MODAL_HIDE,
    name
  }
}

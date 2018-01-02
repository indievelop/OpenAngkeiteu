import {
  ANGKEITEU_EXPLORER_ANGKEITEU_SELECT,
  ANGKEITEU_EXPLORER_ANGKEITEU_UNSELECT,
  ANGKEITEU_EXPLORER_OPTION_SELECT,
  ANGKEITEU_EXPLORER_INIT,
  ANGKEITEU_EXPLORER_COMPLETE,
} from './ActionTypes';

export function selectAngkeiteu(angkeiteu) {
  return {
    type: ANGKEITEU_EXPLORER_ANGKEITEU_SELECT,
    data: angkeiteu
  }
}

export function unselectAngkeiteu() {
  return {
    type: ANGKEITEU_EXPLORER_ANGKEITEU_UNSELECT
  }
}

export function selectOption(option) {
  return {
    type: ANGKEITEU_EXPLORER_OPTION_SELECT,
    data: option
  }
}

export function init(purpose) {
  return {
    type: ANGKEITEU_EXPLORER_INIT,
    data: purpose
  }
}

export function complete() {
  return {
    type: ANGKEITEU_EXPLORER_COMPLETE,
  }
}

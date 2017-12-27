import {
  ANGKEITEU_EXPLORER_ANGKEITEU_SELECT,
  ANGKEITEU_EXPLORER_ANGKEITEU_UNSELECT
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

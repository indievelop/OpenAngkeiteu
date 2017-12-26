import {
  CHART_FILTER_CONDITION_ADD,
  CHART_FILTER_CONDITION_REMOVE,
  CHART_FILTER_ANGKEITEU_SELECT
} from './ActionTypes';

export function addChartFilterCondition(filterCondition) {
  return {
    type: CHART_FILTER_CONDITION_ADD,
    data: filterCondition
  }
}

export function removeChartFilterCondition(filterCondition) {
  return {
    type: CHART_FILTER_CONDITION_REMOVE,
    data: filterCondition
  }
}

export function selectAngkeiteu(angkeiteu) {
  return {
    type: CHART_FILTER_ANGKEITEU_SELECT,
    data: angkeiteu
  }
}

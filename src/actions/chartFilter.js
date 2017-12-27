import {
  CHART_FILTER_CONDITION_ADD,
  CHART_FILTER_CONDITION_REMOVE
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

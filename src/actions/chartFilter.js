import {
  CHART_FILTER_CONDITION_ADD,
  CHART_FILTER_CONDITION_REMOVE,
  CHART_FILTER_FILTERING
} from './ActionTypes';

export function addChartFilterCondition(angkeiteu, option) {
  let filterCondition = {};
  filterCondition['_id'] = option._id
  filterCondition['angkeiteu'] = angkeiteu;
  filterCondition['option'] = option;
  
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

export function filtering(originParticipants) {
  return {
    type: CHART_FILTER_FILTERING,
    data: originParticipants
  }
}

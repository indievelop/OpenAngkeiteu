import * as types from 'actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
  conditions: []
}

const findFilterCondition = (state, filterCondition) => {
  return state.conditions.findIndex((e) => {
    return e.option._id === filterCondition.option._id;
  })
}

export default function chartFilter(state, action) {
  if(typeof state === "undefined") {
      state = initialState;
  }

  switch (action.type) {
    case types.CHART_FILTER_CONDITION_ADD:
      if(findFilterCondition(state, action.data) === -1) {
        return update(state, {
          conditions: { $push: [action.data] }
        });
      } else {
          return state
      }
    case types.CHART_FILTER_CONDITION_REMOVE:
      if(findFilterCondition(state, action.data) !== -1) {
        return update(state, {
          conditions: {$splice: [findFilterCondition(state, action.data), 1]}
        });
      } else {
        console.log('not exist');
      }
    default:
      return state
  }
}

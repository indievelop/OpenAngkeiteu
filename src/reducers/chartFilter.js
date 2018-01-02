import * as types from 'actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
  conditions: [],
  filteredParticipants: []
}

const findFilterCondition = (state, filterCondition) => {
  return state.conditions.findIndex((e) => {
    return e.option._id === filterCondition.option._id;
  })
}

const filterParticipants = (state, originParticipants) => {
  let conditions = state.conditions;
  let conditionParticipants = [];
  let basicAccountIds = new Set();
  let conditionAccountIds = null;
  let filteredParticipants = [];

  for(var i = 0; i < conditions.length; i++) {
    conditionParticipants = conditions[i].angkeiteu.participants.filter(participant => {
      return participant.selectedOptionId === conditions[i].option._id;
    });

    //if no conditionParticipants, no basicAccountIds
    if(conditionParticipants.length === 0) {
      basicAccountIds.clear();
      break;
    }

    conditionAccountIds = new Set(conditionParticipants.map(participant => {
      return participant.accountId;
    }));

    if(i === 0) {
      basicAccountIds = basicAccountIds.union(conditionAccountIds);
      continue;
    }
    basicAccountIds = basicAccountIds.intersection(conditionAccountIds);
  }

  for(var participant of originParticipants) {
    for(var basicAccountId of basicAccountIds) {
      if(participant.accountId === basicAccountId) {
        filteredParticipants.push(participant);
      }
    }
  }
  return filteredParticipants;
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
    case types.CHART_FILTER_FILTERING:
      return update(state, {
        filteredParticipants: { $set: filterParticipants(state, action.data) }
      });
    default:
      return state
  }
}

Set.prototype.union = function(setB) {
    var union = new Set(this);
    for (var elem of setB) {
        union.add(elem);
    }
    return union;
}

Set.prototype.intersection = function(setB) {
    var intersection = new Set();
    for (var elem of setB) {
        if (this.has(elem)) {
            intersection.add(elem);
        }
    }
    return intersection;
}

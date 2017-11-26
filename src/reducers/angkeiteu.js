import * as types from 'actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
    post: {
        status: 'INIT',
        error: -1,
        id: ''
    },
    get: {
        status: 'INIT',
        error: -1,
        data: {}
    },
    participate: {
        status: 'INIT',
        error: -1,
        data: {}
    },
    list: {
        status: 'INIT',
        error: -1,
        data: [],
        isLast: false
    },
    hot_todayList: {
        status: 'INIT',
        error: -1,
        data: [],
        isLast: false
    },
    hot_thisMonthList: {
        status: 'INIT',
        error: -1,
        data: [],
        isLast: false
    },
    triggerList: {
      status: 'INIT',
      error: -1,
      data: [],
      isLast: false
    },
    targetList: {
      status: 'INIT',
      error: -1,
      data: [],
      isLast: false
    }
};

export default function angkeiteu(state, action) {
    if(typeof state === "undefined") {
        state = initialState;
    }

    switch(action.type) {
        case types.ANGKEITEU_POST:
            return update(state, {
                post: {
                    status: { $set: 'WAITING' },
                    error: { $set: -1 },
                    id: {$set: ''}
                }
            });
        case types.ANGKEITEU_POST_SUCCESS:
            return update(state, {
                post: {
                    status: { $set: 'SUCCESS' },
                    id: { $set: action.id }
                }
            });
        case types.ANGKEITEU_POST_FAILURE:
            return update(state, {
                post: {
                    status: { $set: 'FAILURE' },
                    error: { $set: action.error }
                }
            });
        case types.ANGKEITEU_LIST:
            return update(state, {
                [action.listName]: {
                    status: { $set: 'WAITING' },
                    error: { $set: -1 }
                }
            });
        case types.ANGKEITEU_LIST_SUCCESS:
            if(action.isInitial) {
                return update(state, {
                    [action.listName]: {
                        status: { $set: 'SUCCESS' },
                        data: { $set: action.data },
                        isLast: { $set: action.data.length < 8 }
                    }
                });
            } else {
              if(action.listType === 'new') {
                return update(state, {
                    [action.listName]: {
                      status: { $set: 'SUCCESS' },
                      data: { $unshift: action.data },
                    }
                });
              } else {
                return update(state, {
                    [action.listName]: {
                        status: { $set: 'SUCCESS' },
                        data: { $push: action.data },
                        isLast: { $set: action.data.length < 4 }
                    }
                });
              }
            }
        case types.ANGKEITEU_LIST_FAILURE:
            return update(state, {
                [action.listName]: {
                    status: { $set: 'FAILURE' },
                    error: { $set: action.error }
                }
            });
        case types.ANGKEITEU_GET:
            return update(state, {
              get: {
                status: { $set: 'WAITING' },
                error: { $set: -1 },
                data: { $set: {} }
              }
            });
        case types.ANGKEITEU_GET_SUCCESS:
            return update(state, {
              get: {
                status: { $set: 'SUCCESS' },
                data: { $set: action.data }
              }
            });
        case types.ANGKEITEU_GET_FAILURE:
            return update(state, {
              get: {
                status: { $set: 'FAILURE' },
                error: { $set: action.error }
              }
            });
        case types.ANGKEITEU_PARTICIPATE:
            return update(state, {
              participate: {
                status: { $set: 'WAITING' },
                error: { $set: -1 }
              }
            });
        case types.ANGKEITEU_PARTICIPATE_SUCCESS:
          return update(state, {
            participate: {
              status: { $set: 'SUCCESS' },
              data: { $set: action.data }
            }
          });
        case types.ANGKEITEU_PARTICIPATE_FAILURE:
          return update(state, {
            participate: {
              status: { $set: 'FAILURE' },
              error: { $set: action.error }
            }
          });
        default:
            return state;
    }
}

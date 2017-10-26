import * as types from 'actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
    post: {
        status: 'INIT',
        error: -1
    },
    list: {
        status: 'INIT',
        error: -1,
        data: [],
        isLast: false
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
                    error: { $set: -1 }
                }
            });
        case types.ANGKEITEU_POST_SUCCESS:
            return update(state, {
                post: {
                    status: { $set: 'SUCCESS' }
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
                list: {
                    status: { $set: 'WAITING' },
                    error: { $set: -1 }
                }
            });
        case types.ANGKEITEU_LIST_SUCCESS:
            if(action.isInitial) {
                return update(state, {
                    list: {
                        status: { $set: 'SUCCESS' },
                        data: { $set: action.data },
                        isLast: { $set: action.data.length < 8 }
                    }
                });
            } else {
                return update(state, {
                    list: {
                        status: { $set: 'SUCCESS' },
                        data: { $push: action.data },
                        isLast: { $set: action.data.length < 8 }
                    }
                });
            }
        case types.ANGKEITEU_LIST_FAILURE:
            return update(state, {
                list: {
                    status: { $set: 'FAILURE' },
                    error: { $set: action.error }
                }
            });
        case types.ANGKEITEU_GET:
            return update(state, {
              get: {
                status: { $set: 'WAITING' },
                error: { $set: -1 }
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

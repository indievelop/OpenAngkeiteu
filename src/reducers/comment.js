import * as types from 'actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
  post: {
      status: 'INIT',
      error: -1,
      id: ''
  },
  list: {
      status: 'INIT',
      error: -1,
      data: [],
      isLast: false
  },
  recommend: {
    status: 'INIT',
    error: -1,
    data: {}
  }
}

export default function comment(state, action) {
  if(typeof state === "undefined") {
      state = initialState;
  }

  switch (action.type) {
    case types.COMMENT_POST:
      return update(state, {
        post: {
          status: { $set: 'WAITING'},
          error: { $set: -1 },
          id: { $set: '' }
        }
      });
    case types.COMMENT_POST_SUCCESS:
      return update(state, {
        post: {
          status: { $set: 'SUCCESS'},
          id: { $set: action.id }
        }
      });
    case types.COMMENT_POST_FAILURE:
      return update(state, {
        post: {
          status: { $set: 'FAILURE'},
          error: { $set: action.error }
        }
      });
    case types.COMMENT_LIST:
        return update(state, {
            list: {
                status: { $set: 'WAITING' },
                error: { $set: -1 }
            }
        });
    case types.COMMENT_LIST_SUCCESS:
        if(action.isInitial) {
            return update(state, {
                list: {
                    status: { $set: 'SUCCESS' },
                    data: { $set: action.data },
                    isLast: { $set: action.data.length < 8 }
                }
            });
        } else {
          if(action.listType === 'new') {
            return update(state, {
                list: {
                  status: { $set: 'SUCCESS' },
                  data: { $unshift: action.data },
                }
            });
          } else {
            return update(state, {
                list: {
                    status: { $set: 'SUCCESS' },
                    data: { $push: action.data },
                    isLast: { $set: action.data.length < 4 }
                }
            });
          }
        }
    case types.COMMENT_LIST_FAILURE:
        return update(state, {
            list: {
                status: { $set: 'FAILURE' },
                error: { $set: action.error }
            }
        });
    case types.COMMENT_RECOMMEND:
        return update(state, {
            recommend: {
                status: { $set: 'WAITING' },
                error: { $set: -1 },
                data: { $set: {} }
            }
        });
    case types.COMMENT_RECOMMEND_SUCCESS:
        return update(state, {
            recommend: {
                status: { $set: 'SUCCESS' },
                data: { $set: action.data }
            }
        });
    case types.COMMENT_RECOMMEND_FAILURE:
        return update(state, {
            recommend: {
                status: { $set: 'FAILURE' },
                error: { $set: action.error }
            }
        });
    default:
      return state;
  }
}

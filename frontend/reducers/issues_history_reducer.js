import { RECEIVE_ISSUE_HISTORY } from '../actions/issues/issues_actions'


const issueHistoryReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_ISSUE_HISTORY:
      return _.merge({}, state, action.history.histories)
    default:
      return state;
  }
}

export default issueHistoryReducer

import { RECEIVE_ISSUE_HISTORIES, RECEIVE_ISSUE,  RECEIVE_ISSUE_HISTORY, } from '../actions/issues/issues_actions'


const issueHistoriesReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_ISSUE_HISTORIES:
      return _.merge({}, state, action.histories.histories)
    case RECEIVE_ISSUE_HISTORY:
      return _.merge({}, state, {[action.history.history.id]: action.history.history})
    case RECEIVE_ISSUE:
      return _.merge({}, state, action.issue.history)
    default:
      return state;
  }
}

export default issueHistoriesReducer

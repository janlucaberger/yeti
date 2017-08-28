import _ from 'lodash'

import { RECEIVE_ISSUE_HISTORY, RECEIVE_ISSUE, RECEIVE_ALL_ISSUES } from '../actions/issues/issues_actions';
import { RECEIVE_ALL_USERS } from '../actions/users/user_actions';

const usersReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_ISSUE_HISTORY:
      return _.merge({}, state, action.history.users)
    case RECEIVE_ALL_USERS:
      return action.users
    case RECEIVE_ISSUE:
      return _.merge({}, state, action.issue.assigned_user)
    case RECEIVE_ALL_ISSUES:
      return action.issues.assigned_users || {}
    default:
      return state;
  }
}

export default usersReducer

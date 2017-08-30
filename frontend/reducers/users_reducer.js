import _ from 'lodash'

import { RECEIVE_ISSUE_HISTORIES, RECEIVE_ISSUE, RECEIVE_ALL_ISSUES } from '../actions/issues/issues_actions';
import { RECEIVE_ALL_USERS } from '../actions/users/user_actions';
import { RECEIVE_TEAM_ACTIVITY } from '../actions/teams/teams_actions'
import { RECEIVE_RESOURCES } from '../actions/ui_actions';

const usersReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_ISSUE_HISTORIES:
      return _.merge({}, state, action.histories.users)
    case RECEIVE_ALL_USERS:
      return action.users
    case RECEIVE_ISSUE:
      return _.merge({}, state, action.issue.assigned_user)
    case RECEIVE_ALL_ISSUES:
      return action.issues.assigned_users || {}
    case RECEIVE_TEAM_ACTIVITY:
      return _.merge({}, state, action.activity.users)
    case RECEIVE_RESOURCES:
      return _.merge({}, state, action.resources.users)
    default:
      return state;
  }
}

export default usersReducer

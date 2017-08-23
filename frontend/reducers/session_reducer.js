import _ from 'lodash';

import { RECEIVE_CURRENT_USER, REMOVE_CURRENT_USER, RECEIVE_LOGIN_ERROR } from '../actions/session_actions'
import { RECEIVE_CURRENT_TEAM } from '../actions/teams/teams_actions'

const defaultState = {
  current_user: null,
  current_team: null,
  errors: []
}

const sessionReducer = (state = defaultState, action) => {
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return _.merge({}, defaultState, {
        current_user: action.user.current_user,
        current_team: action.user.current_team
      })
    case RECEIVE_CURRENT_TEAM:
      return _.merge({}, state, {current_team: action.team})
    case REMOVE_CURRENT_USER:
      return defaultState
    case RECEIVE_LOGIN_ERROR:
      return _.merge({}, state, {errors: action.error})
    default:
      return state;
  }
}

export default sessionReducer;

import _ from 'lodash'

import { RECEIVE_ISSUE_HISTORY } from '../actions/issues/issues_actions'

const usersReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_ISSUE_HISTORY:
      return _.merge({}, state, action.history.users)
    default:
      return state;
  }
}

export default usersReducer

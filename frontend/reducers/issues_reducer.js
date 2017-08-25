import _ from "lodash";

import {
  RECEIVE_ISSUE,
  RECEIVE_ISSUE_ERROR
} from '../actions/issues/issues_actions';


const issuesReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_ISSUE:
      return _.merge({}, state, action.issue)
    default:
      return state;
  }
}

export default issuesReducer

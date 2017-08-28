
import { RECEIVE_PROJECT, RECEIVE_PROJECT_ERROR } from '../actions/projects/projects_actions'
import { RECEIVE_ISSUE_ERROR } from '../actions/issues/issues_actions'

const defaultState = {
  projects: null,
  issues: null
}
const errorsReducer = (state = defaultState, action) => {
  let newState;
  switch (action.type) {
    case RECEIVE_ISSUE_ERROR:
      newState = _.merge({}, state)
      newState["issues"] = action.error
      return newState
    case RECEIVE_PROJECT_ERROR:
      newState = _.merge({}, state)
      newState["projects"] = action.error
      return newState
    default:
      return defaultState;
  }
}

export default errorsReducer

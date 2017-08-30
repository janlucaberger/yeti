import _ from 'lodash'
import { RECEIVE_SPRINT, RECEIVE_COMPLETED_SPRINT_ISSUES } from '../actions/sprints/sprints_actions'
import { RECEIVE_PROJECT } from '../actions/projects/projects_actions'

const sprintsReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case RECEIVE_SPRINT:
      return _.merge({}, state, {[action.sprint.id]: action.sprint})
    case RECEIVE_PROJECT:
      return _.merge({}, state, {[action.project.sprint.id]:action.project.sprint})
    case RECEIVE_COMPLETED_SPRINT_ISSUES:
      if(action.issues.sprint){
        newState = _.merge({}, state)
        delete newState[action.issues.sprint.id]
        return newState
      } else {
        return state
      }
    default:
      return state;
  }
}

export default sprintsReducer

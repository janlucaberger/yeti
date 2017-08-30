
import { RECEIVE_TEAM_ACTIVITY } from '../actions/teams/teams_actions'
import { RECEIVE_ALL_PROJECTS, RECEIVE_PROJECT } from '../actions/projects/projects_actions'
import { RECEIVE_ALL_ISSUES } from '../actions/issues/issues_actions'
import _ from 'lodash';

const projectsReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_ALL_PROJECTS:
      return action.projects;
    case RECEIVE_PROJECT:
      return _.merge({}, state, { [action.project.project.id]: action.project.project})
    case RECEIVE_TEAM_ACTIVITY:
      return _.merge({}, state, action.activity.projects)
    case RECEIVE_ALL_ISSUES:
      return _.merge({}, state, action.issues.projects)
    default:
      return state;
  }
}

export default projectsReducer

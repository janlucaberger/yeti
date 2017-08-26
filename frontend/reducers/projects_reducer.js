
import { RECEIVE_ALL_PROJECTS, RECEIVE_PROJECT } from '../actions/projects/projects_actions'
import _ from 'lodash';

const projectsReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_ALL_PROJECTS:
      return action.projects;
    case RECEIVE_PROJECT:
      return _.merge({}, state, { [action.project.project.id]: action.project.project})
    default:
      return state;
  }
}

export default projectsReducer

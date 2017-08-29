
import { RECEIVE_SPRINT } from '../actions/sprints/sprints_actions'

const sprintsReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_SPRINT:
      return _.merge({}, state, {[action.sprint.id]: action.sprint})
    default:
      return state;
  }
}

export default sprintsReducer

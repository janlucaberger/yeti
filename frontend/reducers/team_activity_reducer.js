

import { RECEIVE_TEAM_ACTIVITY } from '../actions/dashboard/analytics'


const teamActivityReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_TEAM_ACTIVITY:
      return _.merge({}, state, action.activity.activity)
    default:
      return state;
  }
}

export default teamActivityReducer

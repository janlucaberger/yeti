

import { RECEIVE_TEAMS } from '../actions/teams/teams_actions'


const teamsReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_TEAMS:
      return action.teams
    default:
      return state;
  }
}

export default teamsReducer

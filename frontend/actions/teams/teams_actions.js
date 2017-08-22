import * as ApiUtil from '../../util/teams_api.js';

export const RECEIVE_TEAMS = "RECEIVE_TEAMS";

export const receiveTeams = teams => {
  return {
    type: RECEIVE_TEAMS,
    teams
  }
}


export const fetchTeamByName = teamname => dispatch => {
  return ApiUtil.fetchTeams(teamname).then(
    (teams) => dispatch(receiveTeams(teams))
  )
}

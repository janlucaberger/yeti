import * as ApiUtil from '../../util/teams_api.js';

export const RECEIVE_TEAMS = "RECEIVE_TEAMS";
export const RECEIVE_CURRENT_TEAM = "RECEIVE_CURRENT_TEAM";


export const receiveTeams = teams => {
  return {
    type: RECEIVE_TEAMS,
    teams
  }
}

export const receiveCurrentTeam = team => {
  return {
    type: RECEIVE_CURRENT_TEAM,
    team
  }
}


export const fetchTeamByName = teamname => dispatch => {
  return ApiUtil.fetchTeams(teamname).then(
    (teams) => dispatch(receiveTeams(teams))
  )
}

export const createNewTeam = team => dispatch => {
  return ApiUtil.createNewTeam(team).then((team) => {
    dispatch(receiveCurrentTeam(team))
  })
}

export const fetchCurrentTeam = teamId => dispatch => {

  return ApiUtil.fetchCurrentTeam(teamId).then(
    team => dispatch(receiveCurrentTeam(team))
  )
}

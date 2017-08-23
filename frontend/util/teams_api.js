

export const fetchTeams = teamname => {
  console.log(`fetching teamname with ${teamname}`)
  return $.ajax({
    method: "GET",
    url: "/api/teams",
    data: { query: {similar: teamname} }
  })
}


export const createNewTeam = team => {
  console.log(`creating new team ${team.team_name}`)
  return $.ajax({
    method: "POST",
    url: "/api/teams",
    data: { team }
  })
}

export const fetchTeamnameCheck = teamname => {
  console.log(`fetching teamnane ${teamname}`)
  return $.ajax({
    method: "GET",
    url: "/api/teams",
    data: { query: {exact: teamname} }
  })
}

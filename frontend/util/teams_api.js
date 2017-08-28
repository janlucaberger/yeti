

export const fetchTeams = teamname => {
  return $.ajax({
    method: "GET",
    url: "/api/teams",
    data: { query: {similar: teamname} }
  })
}

export const fetchCurrentTeam = teamId => {
  return $.ajax({
    method: "GET",
    url: `/api/teams/${teamId}`,
  })
}

export const createNewTeam = formData => {
  return $.ajax({
    method: "POST",
    url: "/api/teams",
    processData: false,
    contentType: false,
    dataType: 'json',
    data: formData
  })
}

export const fetchTeamnameCheck = teamname => {
  return $.ajax({
    method: "GET",
    url: "/api/teams",
    data: { query: {exact: teamname} }
  })
}
export const fetchTeamActivity = () => {
  return $.ajax({
    method: "GET",
    url: "/api/teams/activity",
  })
}

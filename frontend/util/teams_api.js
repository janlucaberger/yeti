

export const fetchTeams = teamname => {
  console.log(`fetching teamname with ${teamname}`)
  return $.ajax({
    method: "GET",
    url: "/api/teams",
    data: { query: {similar: teamname} }
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
  console.log(`fetching teamnane ${teamname}`)
  return $.ajax({
    method: "GET",
    url: "/api/teams",
    data: { query: {exact: teamname} }
  })
}

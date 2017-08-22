

export const fetchTeams = teamname => {
  console.log(`fetching teamname with ${teamname}`)
  return $.ajax({
    method: "GET",
    url: "/api/teams",
    data: { query: teamname }
  })
}

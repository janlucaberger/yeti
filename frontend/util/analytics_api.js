



export const fetchAssignedIssues = () =>{
  return $.ajax({
    method: "GET",
    url: "/api/analytics/assigned_issues"
  })
}


export const fetchTeamActivity = () => {
  return $.ajax({
    method: "GET",
    url: "/api/teams/activity",
  })
}

export const fetchAnalyticsData = () => {
  return $.ajax({
    method: "GET",
    url: "/api/analytics/data"
  })
}

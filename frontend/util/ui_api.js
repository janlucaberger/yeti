

export const fetchIssueTypes = () => {
  return $.ajax({
    method: "GET",
    url: "/api/issue_types"
  })
}
export const fetchPriorityTypes = () => {
  return $.ajax({
    method: "GET",
    url: "/api/priority_types"
  })
}
export const fetchStatusTypes = () => {
  return $.ajax({
    method: "GET",
    url: "/api/status_types"
  })
}

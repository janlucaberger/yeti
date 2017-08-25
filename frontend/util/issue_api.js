

export const fetchIssue = id => {
  return $.ajax({
    method: "GET",
    url: `/api/issues/${id}`
  })
}

export const updateIssue = issue => {
  return $.ajax({
    method: "PATCH",
    url: `/api/issues/${issue.id}`,
    data: {issue}
  })
}

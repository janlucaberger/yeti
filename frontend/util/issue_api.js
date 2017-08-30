

export const fetchIssue = id => {
  return $.ajax({
    method: "GET",
    url: `/api/issues/${id}`
  })
}

export const fetchAllIssues = () => {
  return $.ajax({
    method: "GET",
    url: `/api/issues`
  })
}

export const fetchIssuesByProject = project_id => {
  return $.ajax({
    method: "GET",
    url: `/api/issues?project_id=${project_id}&resolved=true`
  })
}

export const fetchIssueHistory = id => {
  return $.ajax({
    method: "GET",
    url: `/api/issues/${id}/history`
  })
}

export const updateIssue = issue => {
  return $.ajax({
    method: "PATCH",
    url: `/api/issues/${issue.id}`,
    data: {issue}
  })
}

export const postIssueAttachment = formData => {
  const id = formData.get("issue[id]")
  return $.ajax({
    method: "POST",
    url: `/api/issues/${id}/attachments`,
    processData: false,
    contentType: false,
    dataType: 'json',
    data: formData
  })
}

export const deleteIssueAttachment = issueAttachment => {

  return $.ajax({
    method: "DELETE",
    url: `/api/issues/${issueAttachment.issue_id}/attachments`,
    data: { attachment: issueAttachment }
  })
}

export const createIssue = issue => {
  return $.ajax({
    method: "POST",
    url: `/api/issues/`,
    data: { issue }
  })
}

export const createVote = issueId => {
  return $.ajax({
    method: "POST",
    url: `/api/issues/${issueId}/votes`,
  })
}
export const createWatcher = issueId => {
  return $.ajax({
    method: "POST",
    url: `/api/issues/${issueId}/watchers`,
  })
}

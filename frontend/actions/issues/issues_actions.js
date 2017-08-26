import * as ApiUtil from '../../util/issue_api'

export const RECEIVE_ISSUE = "RECEIVE_ISSUE"
export const RECEIVE_ISSUE_ATTACHMENT = "RECEIVE_ISSUE_ATTACHMENT"
export const RECEIVE_ISSUE_HISTORY = "RECEIVE_ISSUE_HISTORY"
export const REMOVE_ISSUE_ATTACHMENT = "REMOVE_ISSUE_ATTACHMENT"
export const RECEIVE_ISSUE_ERROR = "RECEIVE_ISSUE_ERROR"


export const receiveIssue = issue => {
  return{
    type: RECEIVE_ISSUE,
    issue
  }
}
export const receiveIssueAttachment = attachment => {
  return{
    type: RECEIVE_ISSUE_ATTACHMENT,
    attachment
  }
}

export const receiveIssueHistory = history => {
  return{
    type: RECEIVE_ISSUE_HISTORY,
    history
  }
}

export const removeIssueAttachment = attachment => {
  return{
    type: REMOVE_ISSUE_ATTACHMENT,
    attachment
  }
}

export const receiveIssueError = error => {
  return{
    type: RECEIVE_ISSUE_ERROR,
    error
  }
}


export const fetchIssue = id => dispatch =>{
  return ApiUtil.fetchIssue(id)
    .then(
      issue => dispatch(receiveIssue(issue)),
      err => dispatch(receiveIssueError(err.responseJSON))
    )
}

export const fetchIssueHistory = id => dispatch =>{
  return ApiUtil.fetchIssueHistory(id)
    .then(
      history => dispatch(receiveIssueHistory(history)),
      err => dispatch(receiveIssueError(err.responseJSON))
    )
}

export const updateIssue = issue => dispatch =>{
  return ApiUtil.updateIssue(issue)
    .then(
      issue => dispatch(receiveIssue(issue)),
      err => dispatch(receiveIssueError(err.responseJSON))
    )
}

export const postIssueAttachment = issueAttachment => dispatch =>{
  return ApiUtil.postIssueAttachment(issueAttachment)
    .then(
      attachment => dispatch(receiveIssueAttachment(attachment)),
      err => dispatch(receiveIssueError(err.responseJSON))
    )
}

export const deleteIssueAttachment = issueAttachment => dispatch =>{
  return ApiUtil.deleteIssueAttachment(issueAttachment)
    .then(
      attachment => dispatch(removeIssueAttachment(attachment)),
      err => dispatch(receiveIssueError(err.responseJSON))
    )
}

import * as ApiUtil from '../../util/issue_api'

export const RECEIVE_ISSUE = "RECEIVE_ISSUE"
export const RECEIVE_ALL_ISSUES = "RECEIVE_ALL_ISSUES"
export const RECEIVE_ISSUE_ATTACHMENT = "RECEIVE_ISSUE_ATTACHMENT"
export const RECEIVE_ISSUE_HISTORY = "RECEIVE_ISSUE_HISTORY"
export const REMOVE_ISSUE_ATTACHMENT = "REMOVE_ISSUE_ATTACHMENT"
export const RECEIVE_ISSUE_ERROR = "RECEIVE_ISSUE_ERROR"
export const RECEIVE_VOTE = "RECEIVE_VOTE"
export const RECEIVE_WATCHER = "RECEIVE_WATCHER"


export const receiveIssue = issue => {
  return{
    type: RECEIVE_ISSUE,
    issue
  }
}
export const receiveAllIssues = issues => {
  return{
    type: RECEIVE_ALL_ISSUES,
    issues
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

export const receiveVote = vote => {
  return{
    type: RECEIVE_VOTE,
    vote
  }
}
export const receiveWatcher = watcher => {
  return{
    type: RECEIVE_WATCHER,
    watcher
  }
}


export const fetchIssue = id => dispatch =>{
  return ApiUtil.fetchIssue(id)
    .then(
      issue => dispatch(receiveIssue(issue)),
      err => dispatch(receiveIssueError(err.responseJSON))
    )
}

export const fetchAllIssues = () => dispatch =>{
  return ApiUtil.fetchAllIssues()
    .then(
      issues => dispatch(receiveAllIssues(issues)),
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

export const createIssue = issue => dispatch =>{
  return ApiUtil.createIssue(issue)
    .then(
      issue => dispatch(receiveIssue(issue)),
      err => dispatch(receiveIssueError(err.responseJSON))
    )
}
export const createVote = issueId => dispatch =>{
  return ApiUtil.createVote(issueId)
    .then(
      vote => dispatch(receiveVote(vote)),
      err => dispatch(receiveIssueError(err.responseJSON))
    )
}
export const createWatcher = issueId => dispatch =>{
  return ApiUtil.createWatcher(issueId)
    .then(
      watcher => dispatch(receiveWatcher(watcher)),
      err => dispatch(receiveIssueError(err.responseJSON))
    )
}

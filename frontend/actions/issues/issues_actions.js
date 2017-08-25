import * as ApiUtil from '../../util/issue_api'

export const RECEIVE_ISSUE = "RECEIVE_ISSUE"
export const RECEIVE_ISSUE_ERROR = "RECEIVE_ISSUE_ERROR"


export const receiveIssue = issue => {
  return{
    type: RECEIVE_ISSUE,
    issue
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
export const updateIssue = issue => dispatch =>{
  return ApiUtil.updateIssue(issue)
    .then(
      issue => dispatch(receiveIssue(issue)),
      err => dispatch(receiveIssueError(err.responseJSON))
    )
}

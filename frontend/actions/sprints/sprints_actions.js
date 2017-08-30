import * as ApiUtil from '../../util/sprints_api'

export const RECEIVE_SPRINT = "RECEIVE_SPRINT"
export const RECEIVE_SPRINT_ERROR = "RECEIVE_SPRINT_ERROR"
export const RECEIVE_COMPLETED_SPRINT_ISSUES = "RECEIVE_COMPLETED_SPRINT_ISSUES"

export const receiveSprint = sprint => {
  return {
    type: RECEIVE_SPRINT,
    sprint
  }
}
export const receiveSprintError = error => {
  return {
    type: RECEIVE_SPRINT_ERROR,
    error
  }
}
export const receiveCompletedSprintIssues = issues => {
  
  return {
    type: RECEIVE_COMPLETED_SPRINT_ISSUES,
    issues
  }
}


export const createSprint = sprint => dispatch => {

  return ApiUtil.createSprint(sprint).then(
    sprint => dispatch(receiveSprint(sprint)),
    err => dispatch(receiveSprintError(err))
  )
}

export const fetchSprint = projectId => dispatch => {
  return ApiUtil.fetchSprint(projectId).then(
    sprint => dispatch(receiveSprint(sprint)),
    err => dispatch(receiveSprintError(err))
  )
}

export const completeSprint = projectId => dispatch => {
  return ApiUtil.completeSprint(projectId).then(
    issues => dispatch(receiveCompletedSprintIssues(issues)),
    err => dispatch(receiveSprintError(err))
  )
}

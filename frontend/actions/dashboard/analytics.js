import * as ApiUtil from '../../util/analytics_api'

export const RECEIVE_TEAM_ACTIVITY = "RECEIVE_TEAM_ACTIVITY";
export const RECEIVE_ASSIGNED_ISSUES = "RECEIVE_ASSIGNED_ISSUES";
export const RECEIVE_ANALYTICS_DATA = "RECEIVE_ANALYTICS_DATA";


export const receiveTeamActivity = activity => {
  return {
    type: RECEIVE_TEAM_ACTIVITY,
    activity
  }
}
export const receiveAssignedIssues = issues => {
  return {
    type: RECEIVE_ASSIGNED_ISSUES,
    issues
  }
}
export const receiveAnalyticsData = data => {
  return {
    type: RECEIVE_ANALYTICS_DATA,
    data
  }
}


export const fetchTeamActivity = () => dispatch => {
  return ApiUtil.fetchTeamActivity().then(
    activity => dispatch(receiveTeamActivity(activity))
  )
}

export const fetchAssignedIssues = () => dispatch => {
  return ApiUtil.fetchAssignedIssues().then(
    issues => dispatch(receiveAssignedIssues(issues))
  )
}

export const fetchAnalyticsData = () => dispatch => {
  return ApiUtil.fetchAnalyticsData().then(
    data => dispatch(receiveAnalyticsData(data))
  )
}

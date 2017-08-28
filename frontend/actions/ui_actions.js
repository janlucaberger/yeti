import * as UserApiUtil from '../util/user_api'
import * as TeamApiUtil from '../util/teams_api'
import * as UiApiUtil from '../util/ui_api'

export const RECEIVE_EMAIL_CHECK = "RECEIVE_EMAIL_CHECK";
export const RECEIVE_TEAMNAME_CHECK = "RECEIVE_TEAMNAME_CHECK";
export const SHOW_MODAL = "SHOW_MODAL"
export const HIDE_MODAL = "HIDE_MODAL"
export const SHOW_LOADING = "SHOW_LOADING"
export const HIDE_LOADING = "HIDE_LOADING"
export const RECEIVE_ISSUE_TYPES = "RECEIVE_ISSUE_TYPES";
export const RECEIVE_PRIORITY_TYPES = "RECEIVE_PRIORITY_TYPES";
export const RECEIVE_STATUS_TYPES = "RECEIVE_STATUS_TYPES";
export const RECEIVE_CURRENT_PAGE = "RECEIVE_CURRENT_PAGE";


export const showModal = (component, props) => {
  return {
    type: SHOW_MODAL,
    component,
    props
  }
}

export const hideModal = () => {
  return {
    type: HIDE_MODAL
  }
}

export const showLoading = props => {
  return{
    type: SHOW_LOADING,
    props
  }
}
export const hideLoading = () => {
  return{
    type: HIDE_LOADING
  }
}

export const receiveEmailCheck = user => {
  return{
    type: RECEIVE_EMAIL_CHECK,
    user
  }
}
export const receiveTeamnameCheck = team => {
  return{
    type: RECEIVE_TEAMNAME_CHECK,
    team
  }
}
export const receiveIssueTypes = issueTypes => {
  return{
    type: RECEIVE_ISSUE_TYPES,
    issueTypes
  }
}
export const receivePriorityTypes = priorityTypes => {
  return{
    type: RECEIVE_PRIORITY_TYPES,
    priorityTypes
  }
}
export const receiveStatusTypes = statusTypes => {
  return{
    type: RECEIVE_STATUS_TYPES,
    statusTypes
  }
}

export const receiveCurrentPage = page => {
  return{
    type: RECEIVE_CURRENT_PAGE,
    page
  }
}



export const fetchIssueTypes = () => dispatch =>{
  return UiApiUtil.fetchIssueTypes().then((issueTypes) => {
    dispatch(receiveIssueTypes(issueTypes))
  })
}

export const fetchPriorityTypes = () => dispatch =>{
  return UiApiUtil.fetchPriorityTypes().then((priorityTypes) => {
    dispatch(receivePriorityTypes(priorityTypes))
  })
}


export const fetchStatusTypes = () => dispatch =>{
  return UiApiUtil.fetchStatusTypes().then((statusTypes) => {
    dispatch(receiveStatusTypes(statusTypes))
  })
}


export const fetchEmailCheck = email => dispatch => {
  return UserApiUtil.fetchEmailCheck(email).then((email) => dispatch(receiveEmailCheck(email)))
}
export const fetchTeamnameCheck = teamname => dispatch => {
  return TeamApiUtil.fetchTeamnameCheck(teamname).then((team) => dispatch(receiveTeamnameCheck(team)))
}

import * as UserApiUtil from '../util/user_api'
import * as TeamApiUtil from '../util/teams_api'

export const RECEIVE_EMAIL_CHECK = "RECEIVE_EMAIL_CHECK";
export const RECEIVE_TEAMNAME_CHECK = "RECEIVE_TEAMNAME_CHECK";
export const SHOW_MODAL = "SHOW_MODAL"
export const HIDE_MODAL = "HIDE_MODAL"
export const SHOW_LOADING = "SHOW_LOADING"
export const HIDE_LOADING = "HIDE_LOADING"


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

export const fetchEmailCheck = email => dispatch => {
  return UserApiUtil.fetchEmailCheck(email).then((email) => dispatch(receiveEmailCheck(email)))
}
export const fetchTeamnameCheck = teamname => dispatch => {
  return TeamApiUtil.fetchTeamnameCheck(teamname).then((team) => dispatch(receiveTeamnameCheck(team)))
}

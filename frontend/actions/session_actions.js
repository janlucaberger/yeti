import * as ApiUtil from '../util/session_api'

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const REMOVE_CURRENT_USER = "REMOVE_CURRENT_USER";
export const RECEIVE_LOGIN_ERROR = "RECEIVE_LOGIN_ERROR";

export const receiveCurrentUser = user => {
  return {
    type: RECEIVE_CURRENT_USER,
    user
  }
}

export const removeCurrentUser = user => {
  return {
    type: REMOVE_CURRENT_USER,
    user
  }
}

export const receiveLoginError = error => {
  return {
    type: RECEIVE_LOGIN_ERROR,
    error
  }
}



export const login = user => dispatch => {
  return ApiUtil.login(user).then((user) => (
    dispatch(receiveCurrentUser(user))
  ), err => (
    dispatch(receiveLoginError(err.responseJSON))
  ))
}

export const logout = () => dispatch => {
  return ApiUtil.logout()
    .then((user) => {
      dispatch(removeCurrentUser(null))
  })
}

import * as ApiUtil from '../util/session_api'

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";

export const receiveCurrentUser = user => {
  return {
    type: RECEIVE_CURRENT_USER,
    user
  }
}

export const login = user => dispatch => {
  return ApiUtil.login(user)
    .then((user) => {
      debugger
      dispatch(receiveCurrentUser(user))
    })
}

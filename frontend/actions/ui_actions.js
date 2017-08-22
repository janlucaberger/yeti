import * as ApiUtil from '../util/user_api'

export const RECEIVE_EMAIL_CHECK = "RECEIVE_EMAIL_CHECK";

export const receiveEmailCheck = user => {
  return{
    type: RECEIVE_EMAIL_CHECK,
    user
  }
}



export const fetchEmailCheck = email => dispatch => {
  return ApiUtil.fetchEmailCheck(email).then((email) => dispatch(receiveEmailCheck(email)))
}

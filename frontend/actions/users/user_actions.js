import { Redirect } from 'react-router-dom';
import * as ApiUtil from '../../util/user_api';
import { receiveCurrentUser } from '../session_actions';


export const RECEIVE_ALL_USERS = "RECEIVE_ALL_USERS";

export const receiveAllUsers = users => {
  return {
    type: RECEIVE_ALL_USERS,
    users
  }
}

export const createUser = user => dispatch => {
  return ApiUtil.createUser(user).then((user) => {

    dispatch(receiveCurrentUser(user))
  })
}


export const fetchAllUsers = () => dispatch => {
  return ApiUtil.fetchAllUsers().then(
    users => dispatch(receiveAllUsers(users))
  )
}

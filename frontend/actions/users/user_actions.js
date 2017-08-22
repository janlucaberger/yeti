import { Redirect } from 'react-router-dom';
import * as ApiUtil from '../../util/user_api';
import { receiveCurrentUser } from '../session_actions';


export const createUser = user => dispatch => {
  return ApiUtil.createUser(user).then((user) => {
    debugger
    dispatch(receiveCurrentUser(user))
  })
}

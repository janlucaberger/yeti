
import { RECEIVE_CURRENT_USER, REMOVE_CURRENT_USER } from '../actions/session_actions'

const defaultState = {
  current_user: null,
  current_team: null,
}

const sessionReducer = (state = defaultState, action) => {
  switch (action.type) {
    case RECEIVE_CURRENT_USER:

      return {
        current_user: action.user.current_user,
        current_team: action.user.current_team
       }
    case REMOVE_CURRENT_USER:
      return defaultState
    default:
      return state;
  }
}

export default sessionReducer;

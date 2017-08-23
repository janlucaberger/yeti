
import { RECEIVE_EMAIL_CHECK, RECEIVE_TEAMNAME_CHECK } from '../actions/ui_actions'

const uiReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_EMAIL_CHECK:
      return { signup_email_exists: Boolean(action.user.id) }
    case RECEIVE_TEAMNAME_CHECK:
      return { team_name_exists: Boolean(action.team.id) }
    default:
      return state;
  }
}

export default uiReducer

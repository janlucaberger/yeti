
import { RECEIVE_EMAIL_CHECK } from '../actions/ui_actions'

const uiReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_EMAIL_CHECK:
      return { signup_email_exists: Boolean(action.user.id) }
    default:
      return state;
  }
}

export default uiReducer

import _ from 'lodash';
import { RECEIVE_ISSUE, RECEIVE_ISSUE_ATTACHMENT, REMOVE_ISSUE_ATTACHMENT } from '../actions/issues/issues_actions';


const attachmentsReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case RECEIVE_ISSUE_ATTACHMENT:
      return _.merge({}, state, {[action.attachment.id]:action.attachment})
    case REMOVE_ISSUE_ATTACHMENT:
      newState = {}
      for(let key in state){
        
        if (state[key].id !== action.attachment.id){
          newState[state[key].id] = state[key]
        }
      }
      return newState;
    case RECEIVE_ISSUE:
      return _.merge({}, state, action.issue.attachments)
    default:
      return state
  }
}

export default attachmentsReducer

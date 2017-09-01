import _ from 'lodash';
import { RECEIVE_ISSUE, RECEIVE_COMMENT } from '../actions/issues/issues_actions';


const commentsReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_ISSUE:
      return _.merge({}, state, action.issue.comments)
    case RECEIVE_COMMENT:
      return _.merge({}, state, {[action.comment.id]: action.comment})
    default:
      return state;
  }
}

export default commentsReducer

import _ from 'lodash';
import { RECEIVE_ISSUE } from '../actions/issues/issues_actions';


const commentsReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_ISSUE:
      return _.merge({}, state, action.issue.comments)
    default:
      return state;
  }
}

export default commentsReducer

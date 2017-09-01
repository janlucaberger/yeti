import { RECEIVE_ASSIGNED_ISSUES, RECEIVE_ANALYTICS_DATA } from '../actions/dashboard/analytics'


const analyticsReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_ASSIGNED_ISSUES:
      return _.merge({}, state, {assigned_issue_ids: action.issues.ids})
    case RECEIVE_ANALYTICS_DATA:
      return _.merge({}, state, {data: action.data})
    default:
      return state;
  }
}

export default analyticsReducer

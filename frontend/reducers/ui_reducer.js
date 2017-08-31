import _ from 'lodash'

const defaultState = {
  modal: {
    display: false,
    component: null,
    props: null,
    styles: null
  },
  loading: {
    display: false,
    props: null
  },
  issue_types: {},
  priority_types: {},
  status_types: {}
}

import {
  RECEIVE_EMAIL_CHECK,
  RECEIVE_TEAMNAME_CHECK,
  RECEIVE_ISSUE_TYPES,
  RECEIVE_PRIORITY_TYPES,
  RECEIVE_STATUS_TYPES,
  SHOW_MODAL,
  HIDE_MODAL,
  SHOW_LOADING,
  HIDE_LOADING,
  RECEIVE_CURRENT_PAGE,
  RECEIVE_RESOURCES
} from '../actions/ui_actions';

import { RECEIVE_TEAM_ACTIVITY } from '../actions/teams/teams_actions'

let modalState;
let loadingState;
const uiReducer = (state = defaultState, action) => {
  switch (action.type) {
    case RECEIVE_EMAIL_CHECK:
      return _.merge({}, state, { signup_email_exists: Boolean(action.user.id) })
    case RECEIVE_TEAMNAME_CHECK:
      return _.merge({}, state, { team_name_exists: Boolean(action.team.id) })
    case SHOW_MODAL:
      modalState = {
        modal: {
          display: true,
          component: action.component,
          props: action.props,
          styles: action.styles
        }
      }
      return _.merge({}, state, modalState)
    case HIDE_MODAL:
      modalState = { modal: {display: false, props: null, styles: null} }
      return _.merge({}, state, modalState)
    case SHOW_LOADING:
      loadingState = {
        loading: {
          display: true,
          props: action.props
        }
      }
      return _.merge({}, state, loadingState)
    case HIDE_LOADING:
      loadingState = { loading: {display: false} }
      return _.merge({}, state, loadingState)
    case RECEIVE_ISSUE_TYPES:
      return _.merge({}, state, {issue_types: action.issueTypes})
    case RECEIVE_PRIORITY_TYPES:
      return _.merge({}, state, {priority_types: action.priorityTypes})
    case RECEIVE_STATUS_TYPES:
      return _.merge({}, state, {status_types: action.statusTypes})
    case RECEIVE_TEAM_ACTIVITY:
      return _.merge({}, state, action.activity.ui)
    case RECEIVE_CURRENT_PAGE:
      return _.merge({}, state, {current_page:action.page})
    case RECEIVE_RESOURCES:
      return _.merge({}, state, action.resources.ui)
    default:
      return state;
  }
}

export default uiReducer

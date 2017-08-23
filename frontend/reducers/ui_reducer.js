import _ from 'lodash'

const defaultState = {
  modal: {
    display: false,
    component: null,
    props: null
  },
  loading: {
    display: false,
    props: null
  }
}

import { RECEIVE_EMAIL_CHECK, RECEIVE_TEAMNAME_CHECK, SHOW_MODAL, HIDE_MODAL, SHOW_LOADING, HIDE_LOADING } from '../actions/ui_actions'
let modalState;
let loadingState;
const uiReducer = (state = defaultState, action) => {
  switch (action.type) {
    case RECEIVE_EMAIL_CHECK:
      return { signup_email_exists: Boolean(action.user.id) }
    case RECEIVE_TEAMNAME_CHECK:
      return { team_name_exists: Boolean(action.team.id) }
    case SHOW_MODAL:
      modalState = {
        modal: {
          display: true,
          component: action.component,
          props: action.props
        }
      }
      return _.merge({}, state, modalState)
    case HIDE_MODAL:
      modalState = { modal: {display: false} }
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
    default:
      return state;
  }
}

export default uiReducer

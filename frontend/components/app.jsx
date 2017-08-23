import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom'
import { login } from '../actions/session_actions';
import LoginForm from './login/login_form'
import LoginContainer from './views/login_container'
import SignupContainer from './views/sign_up_container'
import { AuthRoute, ProtectedRoute } from '../util/route_util'

import ProtectedContent from './protected_content'

const App = (props) => {
  console.log(`User is signed in ${props.user}`)
  return(
    <div>
      <Switch>
        <AuthRoute path="/login" component={LoginContainer} />
        <AuthRoute path="/signup" component={SignupContainer} />
        <ProtectedRoute path="/" component={ProtectedContent} />
      </Switch>
    </div>
  )
}


const mapStateToProps = state => {
  return{
    user: Boolean(state.session.current_user)
  }
}
const mapDispatchToProps = dispatch => {
  return{
    login: (user) => dispatch(login(user))
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))

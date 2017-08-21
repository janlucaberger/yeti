import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom'
import { login } from '../actions/session_actions';
import LoginForm from './login/login_form'
import LoginContainer from './views/login_container'
import { AuthRoute, ProtectedRoute } from '../util/route_util'

import NavigationContainer from './navigation/navigation_container'
import DashboardContainer from './views/dashboard_container'

const App = (props) => {
  console.log(`User is signed in ${props.user}`)
  return(
    <div className="global-container">
      <NavigationContainer />

      <div className="content-container">
        <LoginForm />
        <AuthRoute path="/login" component={LoginContainer} />
        <ProtectedRoute path="/" component={DashboardContainer} />

      </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(App)

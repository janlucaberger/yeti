import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom'
import { login } from '../actions/session_actions';
import LoginForm from './login/login_form'

import NavigationContainer from './navigation/navigation_container'
import DashboardContainer from './views/dashboard_container'

const App = () =>{
  return(
    <div className="global-container">
      <NavigationContainer />
      <div className="content-container">
        <LoginForm />
        <Route path="/" component={DashboardContainer} />
      </div>
    </div>
  )
}


const mapDispatchToProps = dispatch => {
  return{
    login: (user) => dispatch(login(user))
  }
}
export default connect(null, mapDispatchToProps)(App)

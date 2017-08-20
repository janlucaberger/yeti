import React from 'react';
import { connect } from 'react-redux';
import { login } from '../actions/session_actions';
import LoginForm from './login/login_form'

const App = () =>{
  return(
    <div>This is the app!
    <LoginForm />
    </div>
  )
}


const mapDispatchToProps = dispatch => {
  return{
    login: (user) => dispatch(login(user))
  }
}
export default connect(null, mapDispatchToProps)(App)

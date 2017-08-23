import React from 'react';
import LoginForm from '../login/login_form';
import { Link } from 'react-router-dom'


class LoginContainer extends React.Component {

  render(){
    return(
      <div className="login-container">

        <div className="login-left-container">
          <img width="400px" src="https://s3.amazonaws.com/yetiapp-assets/yetiLogoWhite.png" />
        </div>
        <div className="login-right-container">
          <div className="login-form-container">
            <h2>Login</h2>
            <LoginForm />
          </div>
          <Link to="/signup">
            <div className="sign-up-prompt">Dont have an account? Sign up!</div>
          </Link>
        </div>

      </div>
    )
  }
}

export default LoginContainer

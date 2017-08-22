import React from 'react';
import LoginForm from '../login/login_form';
import { Link } from 'react-router-dom'


class LoginContainer extends React.Component {

  componentWillReceiveProps(nextProps) {
    debugger
    if (!nextProps.loggedIn) {
      this.props.history.push('/login');
    }
  }

  componentDidMount(){
    console.log("Login mounted")
  }

  render(){
    return(
      <div className="login-container">

        <div className="login-left-container">
          <div>
            <img width="400px" src="https://s3.amazonaws.com/yetiapp-assets/yetiLogoWhite.png" />
          </div>
        </div>
        <div className="login-right-container">
          <div className="login-form-container">

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

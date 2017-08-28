import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';

const UserPopup = ({user, logout}) => {
  return(
    <div className="user-popup-container">
      <img src={user.avatar} width="40px" />
      <span className="user-popup-username">
        {user.first_name} {user.last_name}
      </span>
      <button className="primary-button blue-background" onClick={logout}>Logout</button>
    </div>
  )
}

const mapStateToProps = state => {
  return{
    user: state.session.current_user
  }
}

const mapDispatchToProps = dispatch => {
  return{
    logout: () => dispatch(logout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPopup)

import React from 'react';
import GlobalNavButton from './global_nav_button';
import { logout } from '../../actions/session_actions'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const GlobalNavContainer = ({logout}) => {
  return(
    <div className='global-nav-container'>
      <div className='global-nav-button-container'>
        <GlobalNavButton link={logout} icon="search" size="1"/>
        <GlobalNavButton link={""} icon="plus" size="1"/>
      </div>
      <div className='global-nav-button-container align-bottom'>
        <GlobalNavButton link={""} icon="plus" size="1" />
      </div>
    </div>
  )
}


const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    logout: () => dispatch(logout())
      .then(() => ownProps.history.push({
        pathname: "/login"
      }))
  }
}

export default withRouter(connect(null, mapDispatchToProps)(GlobalNavContainer))

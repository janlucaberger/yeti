import React from 'react';
import GlobalNavButton from './global_nav_button';
import { logout } from '../../actions/session_actions'
import { connect } from 'react-redux';

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


const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  }
}

export default connect(null, mapDispatchToProps)(GlobalNavContainer)

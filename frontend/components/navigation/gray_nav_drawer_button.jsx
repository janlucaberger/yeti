import React from 'react';
import { NavLink } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';

const GrayNavDrawerButton = ({link, text, icon}) => {
  return(
    <NavLink activeClassName="medium-gray-background" className="gray-nav-drawer-button" to={link}>
      <span className='gray-nav-drawer-button-text'>{text}</span>
    </NavLink>
  )
}

export default GrayNavDrawerButton

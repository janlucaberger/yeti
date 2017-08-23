import React from 'react';
import { NavLink } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';

const NavDrawerButton = ({link, text, icon}) => {
  return(
    <NavLink activeClassName="active-nav-drawer-button" className="nav-drawer-button" to={link}>
      <span className='nav-drawer-button-icon'><FontAwesome name={icon}/></span>
      <span className='nav-drawer-button-text'>{text}</span>
    </NavLink>
  )
}

export default NavDrawerButton

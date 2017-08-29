import React from 'react';
import { Route } from 'react-router-dom';
import NavDrawerButton from './nav_drawer_button';


const NavDrawerContainer = () => {
  return(
    <div className='nav-drawer-container'>
      <div className="nav-drawer-button-container">
        <NavDrawerButton link="/dashboard" text="Dashboards" icon="laptop" />
        <NavDrawerButton link="/projects" text="Projects" icon="folder-o" />
        <NavDrawerButton link="/issues" text="Issues" icon="sliders" />
      </div>
    </div>
  )
}

export default NavDrawerContainer

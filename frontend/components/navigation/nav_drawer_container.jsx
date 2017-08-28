import React from 'react';
import { Route } from 'react-router-dom';
import NavDrawerButton from './nav_drawer_button';
import ProjectsNavigation from './projects_navigation';

const NavDrawerContainer = () => {
  return(
    <div className='nav-drawer-container'>
      <div className="nav-drawer-button-container">
        <NavDrawerButton link="/dashboard" text="Dashboards" icon="laptop" />
        <NavDrawerButton link="/projects" text="Projects" icon="folder-o" />
        <NavDrawerButton link="/issues" text="Issues" icon="sliders" />
        <Route path="/projects/:id" component={ProjectsNavigation} />
      </div>
    </div>
  )
}

export default NavDrawerContainer

import React from 'react';
import GlobalNav from './global_nav_container'
import NavDrawer from './nav_drawer_container'
import { Route, Switch } from 'react-router-dom';
import ProjectsNavigation from './projects_navigation';
const NavigationContainer = () => {
  return(
    <div className="navigation-container">
      <GlobalNav />
      <Switch>
        <Route path="/projects/:id" component={ProjectsNavigation} />
        <Route path="/" component={NavDrawer} />
      </Switch>

    </div>
  )
}

export default NavigationContainer

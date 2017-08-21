import React from 'react';
import GlobalNav from './global_nav_container'
import NavDrawer from './nav_drawer_container'

const NavigationContainer = () => {
  return(
    <div className="navigation-container">
      <GlobalNav />
      <NavDrawer />
    </div>
  )
}

export default NavigationContainer

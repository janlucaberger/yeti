import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom'
import { AuthRoute, ProtectedRoute } from '../util/route_util'

import NavigationContainer from './navigation/navigation_container'
import DashboardContainer from './views/dashboard_container'

const ProtectedContent = (props) => {
  return(
    <div>
      <ProtectedRoute path="/" component={NavigationContainer} />
      <div className="content-container">
        <ProtectedRoute path="/" component={DashboardContainer} />
      </div>
    </div>
  )
}


const mapStateToProps = state => {
  return{
    user: Boolean(state.session.current_user)
  }
}

export default connect(mapStateToProps)(ProtectedContent)

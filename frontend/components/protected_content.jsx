import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom'
import { AuthRoute, ProtectedRoute } from '../util/route_util'

import NavigationContainer from './navigation/navigation_container'
import DashboardContainer from './views/dashboard_container'
import ProjectsContainer from './views/projects_container'
import Modal from './modal/modal';

const ProtectedContent = (props) => {
  return(
    <div className="global-container">
      <ProtectedRoute path="/" component={NavigationContainer} />
      <div className="content-container">
        <Switch>
          <ProtectedRoute path="/projects" component={ProjectsContainer} />
          <ProtectedRoute path="/" component={DashboardContainer} />
        </Switch>
      </div>
      <Modal component={props.modal_component} props={props.modal_props}/>
    </div>
  )
}


const mapStateToProps = state => {
  return{
    modal_component: state.ui.modal.component,
    modal_props: state.ui.modal.props,
  }
}

export default connect(mapStateToProps)(ProtectedContent)

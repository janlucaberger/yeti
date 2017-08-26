import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom'
import { AuthRoute, ProtectedRoute } from '../util/route_util'

import NavigationContainer from './navigation/navigation_container'
import DashboardContainer from './views/dashboard_container'
import ProjectsContainer from './views/projects_container'
import ProjectDetailContainer from './views/project_detail_container'
import IssueDetailContainer from './views/issue_detail_container'
import Modal from './modal/modal';
import Loading from './loading/loading';

const ProtectedContent = (props) => {
  return(
    <div className="global-container">
      <ProtectedRoute path="/" component={NavigationContainer} />
      <div className="content-container">
        <Switch>
          <ProtectedRoute path="/issues/:id" component={IssueDetailContainer} />
          <ProtectedRoute path="/projects/:id" component={ProjectDetailContainer} />
          <ProtectedRoute exact path="/projects" component={ProjectsContainer} />
          <ProtectedRoute path="/" component={DashboardContainer} />
        </Switch>
      </div>
      <Loading />
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

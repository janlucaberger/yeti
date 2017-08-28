import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom'
import { AuthRoute, ProtectedRoute } from '../util/route_util'

import NavigationContainer from './navigation/navigation_container'
import DashboardContainer from './views/dashboard_container'
import ProjectsContainer from './views/projects_container'
import ProjectDetailContainer from './views/project_detail_container'
import IssueDetailContainer from './views/issue_detail_container'
import IssuesContainer from './views/issues_container'
import Modal from './modal/modal';
import FullLoading from './loading/full_loading';

const ProtectedContent = (props) => {
  return(
    <div className="global-container">
      <ProtectedRoute path="/" component={NavigationContainer} />
      <div className="content-container">
        <Switch>
          <ProtectedRoute path="/issues/:id" component={IssueDetailContainer} />
          <ProtectedRoute path="/projects/:id" component={ProjectDetailContainer} />
          <ProtectedRoute exact path="/projects" component={ProjectsContainer} />
          <ProtectedRoute exact path="/issues" component={IssuesContainer} />
          <ProtectedRoute path="/" component={DashboardContainer} />
        </Switch>
        <FullLoading />
      </div>
      <Modal component={props.modal_component} props={props.modal_props}/>
    </div>
  )
}


const mapStateToProps = state => {
  let component = "";
  let props = ""
  if(typeof state.ui.modal !== "undefined"){
    component = state.ui.modal.component
    props = state.ui.modal.props
  }
  return{
    modal_component: component,
    modal_props: props,
  }
}

export default connect(mapStateToProps)(ProtectedContent)

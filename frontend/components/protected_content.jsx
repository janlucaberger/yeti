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

import { fetchIssueTypes, fetchPriorityTypes, fetchStatusTypes } from '../actions/ui_actions';

class ProtectedContent extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.fetchIssueTypes()
    this.props.fetchPriorityTypes()
    this.props.fetchStatusTypes()
  }

  render(){
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
        <Modal component={this.props.modal_component} props={this.props.modal_props}/>
      </div>
    )
  }

}


const mapStateToProps = state => {
  let component = "";
  let props = ""
  let styles = ""
  if(typeof state.ui.modal !== "undefined"){
    component = state.ui.modal.component
    props = state.ui.modal.props
    styles = state.ui.modal.styles
  }
  return{
    modal_component: component,
    modal_props: props,
    modal_styles: styles,
  }
}

const mapDispatchToProps = dispatch =>{
  return{
    fetchIssueTypes: () => dispatch(fetchIssueTypes()),
    fetchPriorityTypes: () => dispatch(fetchPriorityTypes()),
    fetchStatusTypes: () => dispatch(fetchStatusTypes()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedContent)

import React from 'react';
import NavDrawerButton from './nav_drawer_button';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class ProjectsNavigation extends React.Component{

  render(){
    if(typeof this.props.currentProject === "undefined"){
      return <div></div>
    } else {
      return(
        <div>
            <img src={this.props.currentProject.avatar} width="25px"/>
            {this.props.currentProject.title}
            <NavDrawerButton
              link={`/projects/${this.props.match.params.id}/backlog`}
              text="Backlog"
            />
            <NavDrawerButton
              link={`/projects/${this.props.match.params.id}/sprint`}
              text="Sprint"
            />
        </div>
      )
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  debugger
  return {
    currentProject: state.projects[ownProps.match.params.id]
  }
}

export default withRouter(connect(mapStateToProps)(ProjectsNavigation));

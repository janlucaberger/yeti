import React from 'react';
import GrayNavDrawerButton from './gray_nav_drawer_button';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

class ProjectsNavigation extends React.Component{

  render(){
    if(typeof this.props.currentProject === "undefined"){
      return <div></div>
    } else {
      return(
        <div className='nav-drawer-container lightgray-background'>
          <div className="nav-drawer-back-button">
            <Link to="/projects">Back to Projects</Link>
            </div>
          <div className="nav-drawer-button-container">
            <div className="nav-project-title-container">
              <img src={this.props.currentProject.avatar} width="25px" />
              <div className="nav-project-title">{this.props.currentProject.title}</div>
            </div>

            <GrayNavDrawerButton
              link={`/projects/${this.props.match.params.id}/backlog`}
              text="Backlog"
            />
          <GrayNavDrawerButton
              link={`/projects/${this.props.match.params.id}/sprint`}
              text="Sprint"
            />
          </div>
        </div>
      )
    }
  }
}

const mapStateToProps = (state, ownProps) => {

  return {
    currentProject: state.projects[ownProps.match.params.id]
  }
}

export default withRouter(connect(mapStateToProps)(ProjectsNavigation));

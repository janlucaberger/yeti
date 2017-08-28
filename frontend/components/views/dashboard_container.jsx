import React from 'react'
import Widget from '../dashboard/widget';
import { connect } from 'react-redux';
import { fetchTeamActivity } from '../../actions/teams/teams_actions';
import TeamActivity from '../dashboard/team_activity';
import LoadingSpinner from '../loading/loading_spinner';

class Dashboard extends React.Component {
  constructor(){
    super();

    this.state = {
      teamLoading: true,
    }

    this.renderTeamActivity = this.renderTeamActivity.bind(this);
    this.handleSuccessResponse = this.handleSuccessResponse.bind(this);
  }
  componentDidMount(){
    this.props.getTeamActivity().then(
      () => this.handleSuccessResponse("teamLoading")
    )
  }

  handleSuccessResponse(key){
    this.setState({
      [key]: false
    })
  }

  renderTeamActivity(){
    let component;
    let props = {};

    if(!this.state.teamLoading){
      component = TeamActivity
      props = {
        users: this.props.users,
        activity: this.props.activity,
        issues: this.props.issues,
        projects: this.props.projects,
        issueTypes: this.props.issueTypes,
        priorityTypes: this.props.priorityTypes,
        statusTypes: this.props.statusTypes,
      }
    } else {
      component = LoadingSpinner
    }

    return <Widget component={component} props={props}/>
  }

  render(){

    return(
      <div className="content-inner-container">
        <div className="widget-container">
          {this.renderTeamActivity()}
        </div>
      </div>
    )
  }

}

const mapStateToProps = state => {
  return{
    activity: state.team_activity,
    projects: state.projects,
    users: state.users,
    issues: state.issues,
    issueTypes: state.ui.issue_types,
    priorityTypes: state.ui.priority_types,
    statusTypes: state.ui.status_types,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getTeamActivity: () => dispatch(fetchTeamActivity())

  }
}



export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)

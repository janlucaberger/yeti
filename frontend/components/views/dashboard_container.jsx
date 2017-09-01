import React from 'react'
import Widget from '../dashboard/widget';
import { connect } from 'react-redux';
import { fetchTeamActivity } from '../../actions/teams/teams_actions';
import TeamActivity from '../dashboard/team_activity';
import AssignedIssues from '../dashboard/assigned_issues';
import Data from '../dashboard/data';
import LoadingSpinner from '../loading/loading_spinner';

class Dashboard extends React.Component {
  constructor(){
    super();

    this.state = {
      teamLoading: true,
    }
  }

  render(){
    return(
      <div className="content-inner-container">
        <div className="widget-container">
          <Widget component={AssignedIssues} />
          <Widget component={Data} />
          <Widget component={TeamActivity} />
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

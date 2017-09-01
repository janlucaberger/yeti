import React from 'react';
import TimeAgo from 'react-timeago';
import _ from 'lodash'
import { fetchTeamActivity } from '../../actions/dashboard/analytics';
import Widget from '../dashboard/widget';
import { connect } from 'react-redux';
import LoadingSpinner from '../loading/loading_spinner';
import { Link } from 'react-router-dom'

class TeamActivity extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      teamLoading: true,
    }

    this.renderActivity = this.renderActivity.bind(this);
    this.formatData = this.formatData.bind(this);
    this.renderIssueInfo = this.renderIssueInfo.bind(this);
    this.renderUserInfo = this.renderUserInfo.bind(this);
    this.createMarkup = this.createMarkup.bind(this);
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

  createMarkup(text){
    return { __html: text}
  }


  formatData(column_name, from, to){
    switch (column_name) {
      case "priority_type_id":
        return(
          <tbody>
            <tr className="table-row">
              <td>
                Priority
              </td>
              <td>
                <img className="history-icon" width="15px" src={this.props.priorityTypes[from].icon_url} />
                {this.props.priorityTypes[from].priority_type}
              </td>
              <td>
                <img className="history-icon" width="15px" src={this.props.priorityTypes[to].icon_url} />
                {this.props.priorityTypes[to].priority_type}
              </td>
            </tr>
          </tbody>
        )
      case "status_type_id":
        return(
          <tbody>
            <tr className="table-row">
              <td>
                Status
              </td>
              <td>
                {this.props.statusTypes[from].status_type}
              </td>
              <td>
                {this.props.statusTypes[to].status_type}
              </td>
            </tr>
          </tbody>
        )
      case "issue_type_id":
        return(
          <tbody>
            <td>
              Issue Type
            </td>
            <td>
              <img className="history-icon" width="15px" src={this.props.issueTypes[from].icon_url} />
              {this.props.issueTypes[from].issue_type}
            </td>
            <td>
              <img className="history-icon" width="15px" src={this.props.issueTypes[to].icon_url} />
              {this.props.issueTypes[to].issue_type}
            </td>
          </tbody>
        )
      case "description":
        return(
          <tbody>
            <tr className="table-row">
              <td>
                Description
              </td>
              <td>
                <div className="body-text" dangerouslySetInnerHTML={this.createMarkup(from)} />
              </td>
              <td>
                <div className="body-text" dangerouslySetInnerHTML={this.createMarkup(to)} />
              </td>
            </tr>
          </tbody>
        )
      case "sprint":
        if(to === true || to == "t"){
          return <p>Added this issue to a sprint</p>
        } else {
          return(
            <p>Removed this issue from a sprint</p>
          )
        }
      default:
        return(
          <tbody>
            <tr className="table-row">
              <td>
                {column_name}
              </td>
              <td>
                {from}
              </td>
              <td>
                {to}
              </td>
            </tr>
          </tbody>
        )
    }
  }

  renderUserInfo(activity){
    const user = this.props.users[activity.user_id]
    return(
      <div className="team-activity-user-info">
        <img className="profile-icon" src={user.avatar} width="30px"/>
        <span className="team-activity-username">{user.first_name} {user.last_name}</span>
        <span className="team-activity-secondary">made changes</span>
      </div>
    )
  }

  renderIssueInfo(activity){
    const issue = this.props.issues[activity.issue_id]
    const project = this.props.projects[issue.project_id]
    return(
      <div className="team-activity-issue-info">
        <Link to={`/issues/${issue.id}`}>{issue.summary}</Link>
        <span className="team-activity-projects-label">
          <Link to={`/projects/${project.id}/sprint`}>{project.title}</Link>
        </span>
      </div>
    )
  }

  renderActivity(){
    const sortedActivity = _.sortBy(Object.values(this.props.activity), "created_at").reverse()
    return sortedActivity.map( activity => {
      return (
        <div key={activity.id} className="team-activity-item-container">
          {this.renderUserInfo(activity)}
          {this.renderIssueInfo(activity)}
          <div>
            <table>
              <thead>
                <tr className="table-header">
                  <th>Field</th>
                  <th>From</th>
                  <th>From</th>
                </tr>
              </thead>
              { this.formatData(
                  activity.column_changed,
                  activity.from,
                  activity.to
              )}
            </table>
          </div>
          <span className="team-activity-secondary">Updated: <TimeAgo date={activity.created_at} /></span>
        </div>
      )
    }, this)
  }

  render(){
    if(Object.values(this.props.activity).length < 1){
      return(
        <div>
          <div className="widget-title">Team Activity</div>
          <div className="widget-no-content-container">Looks like your team has no recent activity!</div>
        </div>
      )
    } else {
      return(
        <div className="projects-table-container">
          <div className="widget-title">Team Activity</div>
          {this.renderActivity()}
        </div>
      )
    }
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
  return{
    getTeamActivity: () => dispatch(fetchTeamActivity())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamActivity)

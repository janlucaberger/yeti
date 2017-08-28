import React from 'react';
import TimeAgo from 'react-timeago';

const handleUndefined = (value, defaultVal) => {
  if(typeof value === "undefined"){
    return defaultVal
  } else {
    return value
  }
}






class TeamActivity extends React.Component{
  constructor(props){
    super(props);

    this.renderActivity = this.renderActivity.bind(this);
    this.formatData = this.formatData.bind(this);
    this.renderIssueInfo = this.renderIssueInfo.bind(this);
    this.renderUserInfo = this.renderUserInfo.bind(this);
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
                <div dangerouslySetInnerHTML={this.createMarkup(from)} />
              </td>
              <td>
                <div dangerouslySetInnerHTML={this.createMarkup(to)} />
              </td>
            </tr>
          </tbody>
        )
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
        <img src={user.avatar} width="20px"/>
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
        {issue.summary}
        <span className="team-activity-projects-label">
          {project.title}
        </span>
      </div>
    )
  }

  renderActivity(){
    return Object.values(this.props.activity).map( activity => {
      debugger
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
          <div>
            Team Activity
          </div>
          Looks like your team has no recent activity!
        </div>
      )
    } else {
      return(
        <div className="projects-table-container">
          <div>Recent Team Activity</div>
          {this.renderActivity()}
        </div>
      )
    }

  }

}

export default TeamActivity

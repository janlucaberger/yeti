import React from 'react';
import { connect } from 'react-redux';
import { getUserInfo, getIssueHistory } from '../../reducers/selectors';
import { fetchIssueHistory } from '../../actions/issues/issues_actions';
import TimeAgo from 'react-timeago'


class IssueHistory extends React.Component{
  constructor(props){
    super(props);

    this.mapHistory = this.mapHistory.bind(this)
    this.formatData = this.formatData.bind(this)
    this.createMarkup = this.createMarkup.bind(this)
  }

  componentDidMount(){
    this.props.fetchIssueHistory(this.props.issueId)
  }

  createMarkup(text){
    return { __html: text}
  }

  formatData(column_name, from, to){
    switch (column_name) {
      case "priority_type_id":
        return(
          <tbody>
            <td>
              Priority
            </td>
            <td>
              <img width="15px" src={this.props.priorityTypes[from].icon_url} />
              {this.props.priorityTypes[from].priority_type}
            </td>
            <td>
              <img width="15px" src={this.props.priorityTypes[to].icon_url} />
              {this.props.priorityTypes[to].priority_type}
            </td>
          </tbody>
        )
      case "status_type_id":
        return(
          <tbody>
            <td>
              Status
            </td>
            <td>
              <img width="15px" src={this.props.status_type[from].icon_url} />
              {this.props.statusTypes[from].status_type}
            </td>
            <td>
              <img width="15px" src={this.props.status_type[to].icon_url} />
              {this.props.statusTypes[to].status_type}
            </td>
          </tbody>
        )
      case "issue_type_id":
        return(
          <tbody>
            <td>
              Issue Type
            </td>
            <td>
              {this.props.issueTypes[from].issue_type}
            </td>
            <td>
              {this.props.issueTypes[to].issue_type}
            </td>
          </tbody>
        )
      case "description":
        return(
          <tbody>
            <td>
              Description
            </td>
            <td>
              <div dangerouslySetInnerHTML={this.createMarkup(from)} />
            </td>
            <td>
              <div dangerouslySetInnerHTML={this.createMarkup(to)} />
            </td>
          </tbody>
        )
      default:
        return(
          <tbody>
            <td>
              {column_name}
            </td>
            <td>
              {from}
            </td>
            <td>
              {to}
            </td>
          </tbody>
        )
    }
  }

  mapHistory(){
    return this.props.getIssueHistory(this.props.issueId).map(issueHistory => {
      const user = this.props.getUserInfo(issueHistory.user_id)
      return (
        <div className="history-item-container">
          <div className="history-user-info">
            <img width="25px" height="25px" src={user.avatar_url} />
            <div className="history-user-info-text">
              <span className="bold">{user.first_name} {user.last_name}</span>
              <span>&nbsp; made changes -</span>
              <span className="gray">&nbsp;<TimeAgo date={issueHistory.created_at} /></span>
            </div>
          </div>
          <div className="history-change-info">
            <table>
              <thead>
                <tr>
                  <td>
                    Field
                  </td>
                  <td>
                    Original Value
                  </td>
                  <td>
                    New Value
                  </td>
                </tr>
              </thead>
                {this.formatData(
                  issueHistory.column_changed,
                  issueHistory.from,
                  issueHistory.to
                )}
            </table>
          </div>
        </div>
      )
    }, this)
  }

  render(){

    if(this.props.getIssueHistory(this.props.issueId).length > 0){
      // debugger
      return(
        <div>Issue History
          {this.mapHistory()}
        </div>
      )
    } else {
      return (
        <div>No History</div>
      )
    }

  }

}

const mapStateToProps = state => {
  return{
    getUserInfo: (user_id) => getUserInfo(state, user_id),
    getIssueHistory: (issue_id) => getIssueHistory(state, issue_id),
  }
}

const mapDispatchToProps = dispatch => {
  return{
    fetchIssueHistory: (id) => dispatch(fetchIssueHistory(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IssueHistory)

import React from 'react';
import { connect } from 'react-redux';
import { getUserInfo, getIssueHistory } from '../../reducers/selectors';
import { fetchIssueHistories } from '../../actions/issues/issues_actions';
import TimeAgo from 'react-timeago'


class IssueHistory extends React.Component{
  constructor(props){
    super(props);

    this.mapHistory = this.mapHistory.bind(this)
    this.formatData = this.formatData.bind(this)
    this.createMarkup = this.createMarkup.bind(this)
  }

  componentDidMount(){
    console.log("history mounted!")
    // this.props.fetchIssueHistories(this.props.issueId)
  }
  // componentWillReceiveProps(nextProps){
  //   this.props.fetchIssueHistories(this.props.issueId)
  // }

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
              <img className="history-icon" width="15px" src={this.props.priorityTypes[from].icon_url} />
              {this.props.priorityTypes[from].priority_type}
            </td>
            <td>
              <img className="history-icon" width="15px" src={this.props.priorityTypes[to].icon_url} />
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

              {this.props.statusTypes[from].status_type}
            </td>
            <td>
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
    if(this.props.getIssueHistory.length > 0) {
      return this.props.getIssueHistory.map(issueHistory => {

        const user = this.props.getUserInfo(issueHistory.user_id)
        if(user){
          return (
            <div key={issueHistory.id} className="history-item-container">
              <div className="history-user-info">
                <img width="25px" height="25px" src={user.avatar} />
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
        }
      }, this)
    }
  }

  render(){
    if(this.props.getIssueHistory.length > 0){
      //
      return(
        <div>
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

const mapStateToProps = (state, ownProps) => {

  return{
    getUserInfo: (user_id) => getUserInfo(state, user_id),
    getIssueHistory: getIssueHistory(state, ownProps.issueId),
  }
}

const mapDispatchToProps = dispatch => {
  return{
    // fetchIssueHistories: (id) => dispatch(fetchIssueHistories(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IssueHistory)

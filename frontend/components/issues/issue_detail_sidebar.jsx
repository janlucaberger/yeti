import React from 'react' ;
import TimeAgo from 'react-timeago'


class IssueDetailSidebar extends React.Component{
  constructor(props){
    super(props);
    this.renderVoteButton = this.renderVoteButton.bind(this)
    this.renderWatchButton = this.renderWatchButton.bind(this)
  }

  renderVoteButton(){
    if(typeof this.props.didUserVote === "undefined" || !this.props.didUserVote){
      return <button className="borderless-button" onClick={this.props.addVote}>Vote</button>
    } else {
      return <span>Voted!</span>
    }
  }

  renderWatchButton(){
    if(typeof this.props.didUserWatch === "undefined" || !this.props.didUserWatch){
      return <button className="borderless-button" onClick={this.props.addWatch}>Watch</button>
    } else {
      return <button className="borderless-button gray" onClick={this.props.deleteWatch}>Unwatch</button>
    }
  }

  handleUndefined(value, defaultVal){
    if(typeof value === "undefined"){
      return defaultVal
    } else {
      return value
    }
  }

  render(){

    let assignedUser = this.handleUndefined(this.props.assignee, "")
    let votes = this.handleUndefined(this.props.votes, 0)
    let watchers = this.handleUndefined(this.props.watchers, 0)
    let createdAt = this.handleUndefined(this.props.createdAt, "")
    let updatedAt = this.handleUndefined(this.props.updatedAt, "")


    return(
      <div className="issue-detail-sidebar-container">
        <table>
            <tr>
                <th>Assignee:</th>
                <td>
                  <div className="issue-detail-profile-container">
                    <img className="profile-icon" width="30px" src={assignedUser.avatar} />
                    {assignedUser.first_name}&nbsp;{assignedUser.last_name}
                  </div>
                </td>
            </tr>
            <tr>
                <th>Votes:</th>
                <td>
                  <span className="tally">{votes}</span>
                  {this.renderVoteButton()}
                </td>
            </tr>
            <tr>
                <th>Watchers:</th>
                <td>
                  <span className="tally">{watchers}</span>
                  {this.renderWatchButton()}
                </td>
            </tr>
            <tr>
                <th>Created:</th>
                <td><TimeAgo date={createdAt} /></td>
            </tr>
            <tr>
                <th>Updated:</th>
                <td><TimeAgo date={updatedAt} /></td>
            </tr>
        </table>
      </div>
    )
  }
}

export default IssueDetailSidebar

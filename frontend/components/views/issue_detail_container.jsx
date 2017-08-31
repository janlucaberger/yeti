import React from 'react';
import { connect } from 'react-redux';
import { Route, NavLink } from 'react-router-dom'
import _ from 'lodash';
import {
  fetchIssue,
  updateIssue,
  postIssueAttachment,
  deleteIssueAttachment,
  fetchIssueHistories,
  createVote,
  createWatcher,
  deleteWatcher
  } from '../../actions/issues/issues_actions';
import { fetchIssueTypes, fetchPriorityTypes, fetchStatusTypes } from '../../actions/ui_actions';
import { getIssueTypesArray, getAttachments, getIssueHistory } from '../../reducers/selectors';
import { showLoading, hideLoading } from '../../actions/ui_actions'
import IssueDetailInput from '../issues/issue_detail_input';
import IssueDetailStatus from '../issues/issue_detail_status';
import IssueStatus from '../issues/issue_status';
import IssueDetailSidebar from '../issues/issue_detail_sidebar';
import IssueDescription from '../issues/issue_description';
import IssueAttachments from '../issues/issue_attachments';
import IssueHistory from '../issues/issue_history';
import IssueComments from '../issues/issue_comments';
import Resolution from '../issues/resolution';
import Dropdown from '../global/dropdown';


class IssueDetailContainer extends React.Component {
  constructor({issue}){
    super()
    this.state = {
      loading: true,
      issue: null
    }
    this.addAttachment = this.addAttachment.bind(this)
    this.handleDefault = this.handleDefault.bind(this)
    this.loadingFinished = this.loadingFinished.bind(this)
    this.handleVote = this.handleVote.bind(this)
    this.handleWatcher = this.handleWatcher.bind(this)
    this.handleStatus = this.handleStatus.bind(this)
    this.removeWatcher = this.removeWatcher.bind(this)
    this.renderStatusButtons = this.renderStatusButtons.bind(this)
  }

  loadingFinished(){
    setTimeout(() => {
      this.setState({ loading: false })
      this.props.hideLoading()
    },1300)
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      issue: nextProps.issue,
    })
  }

  componentDidMount(){
    this.props.showLoading()
    this.props.fetchIssue(this.props.issueId).then(
      () => {
        this.loadingFinished()
      }
    )
  }

  showConfirmBox(){
    return(
      <div className="confirmation-box-container">CONFIRM</div>
    )
  }

  updateIssue(id){
    return (key, value) => {
      this.props.updateIssue({
        id: id ,
        [key]: value
      })
    }
  }

  handleVote(){
    this.props.addVote(this.props.issueId)
  }

  handleWatcher(){
    this.props.addWatcher(this.props.issueId)
  }

  removeWatcher(){
    console.log("REMOVING WATCHER")
    this.props.deleteWatcher(this.props.issueId)
  }

  handleDefault(e){
    e.preventDefault()
  }

  handleStatus(statusId, type){
    return (e) => {
      debugger
      this.props.updateIssue({status_type_id: statusId, id: this.props.issueId})
    }
  }

  addAttachment(attachment){
    this.props.addAttachment(attachment)
  }

  renderStatusButtons(statusTypes){
    return Object.values(statusTypes).map( type => {
      return <button key={type.id} className="primary-button gray" onClick={this.handleStatus(type.id)}>{type.status_type}</button>
    })
  }

  render(){
    if(this.state.loading){
      return <div>LOADING</div>
    } else {
      return(
        <div className="content-inner-container">

          <div className="issue-detail-main-container">
            <div className="issue-detail-content-container">
              <div>current project / issue key</div>
              <form onSubmit={this.handleDefault}>
                <IssueDetailInput
                  className="issue-detail-form-text issue-detail-summary"
                  changeKey="summary"
                  updateIssue={this.updateIssue(this.state.issue.id)}
                  value={this.state.issue.summary}
                  />
                <div className="issue-detail-command-container">
                  {this.renderStatusButtons(this.props.statusTypes)}
                </div>
                <div className="status-container">
                  <div className="status-item-container">
                    <Dropdown
                      title="Type"
                      item="issue_type"
                      changeKey="issue_type_id"
                      updateProperty={this.updateIssue(this.state.issue.id)}
                      options={this.props.issueTypes}
                      iconKey="icon_url"
                      currentOption={this.props.current_issue_type}
                      width="120px"
                      />
                  </div>
                  <div className="status-item-container">
                    <IssueStatus status={this.props.current_status} />
                  </div>
                  <div className="status-item-container">
                    <Dropdown
                      title="Priority"
                      item="priority_type"
                      changeKey="priority_type_id"
                      updateProperty={this.updateIssue(this.state.issue.id)}
                      options={this.props.priorityTypes}
                      iconKey="icon_url"
                      currentOption={this.props.current_priority_type}
                      width="120px"
                      />
                  </div>
                  <div className="status-item-container">
                    <Resolution resolution={this.props.issue.resolution} />
                  </div>
                </div>
                <div>
                  <div className="issue-detail-section-header">Description</div>
                  <IssueDescription
                    updateIssue={this.updateIssue(this.state.issue.id)}
                    currentDescription={this.props.current_description}
                  />
                </div>
                <div>
                  <IssueAttachments
                    deleteAttachment={this.props.deleteIssueAttachment}
                    attachments={this.props.getAttachments}
                    issueId={this.state.issue.id}
                    addAttachment={this.addAttachment}
                  />
                </div>
                <div>
                  <hr />
                  <div className="issue-secondary-nav-container">
                    <NavLink
                      className="issue-secondary-nav"
                      activeClassName="issue-secondary-nav-active"
                      exact to={`/issues/${this.props.issueId}`}
                    >
                      Comments
                    </NavLink>
                    <NavLink
                      className="issue-secondary-nav"
                      activeClassName="issue-secondary-nav-active"
                      exact to={`/issues/${this.props.issueId}/history`}
                    >
                      History
                    </NavLink>
                  </div>
                  <Route path="/issues/:id" exact render={ () => (
                    <IssueComments
                      issueId={this.props.issueId}
                    />
                  )}/>
                  <Route path="/issues/:id/history" render={ () => (
                    <IssueHistory
                      issueId={this.props.issueId}
                      statusTypes={this.props.statusTypes}
                      issueTypes={this.props.issueTypes}
                      priorityTypes={this.props.priorityTypes}
                    />
                  )}/>

                </div>
              </form>
            </div>
            <IssueDetailSidebar
              assignee={this.props.assignedUser}
              createdAt={this.props.createdAt}
              updatedAt={this.props.updatedAt}
              watchers={this.props.watchers}
              votes={this.props.votes}
              didUserVote={this.props.didUserVote}
              didUserWatch={this.props.didUserWatch}
              addVote={this.handleVote}
              addWatch={this.handleWatcher}
              deleteWatch={this.removeWatcher}
            />
          </div>
        </div>
      )
    }

  }
}


const mapStateToProps = (state, ownProps) => {
  const issueId = ownProps.match.params.id
  let issue;
  let currentDescription = "";
  if (typeof state.issues[issueId] === "undefined"){
    issue = {}
  } else {
    issue = state.issues[issueId]
    currentDescription = state.issues[issueId].description

  }

  return {
    issueId: issueId,
    issue: issue,
    assignedUser: (_.isEmpty(state.users)) ? "-" : state.users[issue.assigned_user_id],
    votes: (typeof issue.votes == "undefined") ? 0 : issue.votes,
    watchers: (typeof issue.watchers == "undefined") ? 0 : issue.watchers,
    createdAt: (typeof issue.created_at == "undefined") ? "" : issue.created_at,
    updatedAt: (typeof issue.updated_at == "undefined") ? "" : issue.updated_at,
    didUserVote: issue.current_user_voted,
    didUserWatch: issue.current_user_watched,
    issueTypes: state.ui.issue_types,
    priorityTypes: state.ui.priority_types,
    statusTypes: state.ui.status_types,
    current_issue_type: (typeof state.ui.issue_types == "undefined") ? "" : state.ui.issue_types[issue.issue_type_id],
    current_priority_type: (typeof state.ui.priority_types == "undefined") ? "" : state.ui.priority_types[issue.priority_type_id],
    current_status: (typeof state.ui.status_types == "undefined") ? "" : state.ui.status_types[issue.status_type_id],
    current_description: currentDescription,
    getAttachments: getAttachments(state, issue.id),
  }
}


const mapDispatchToProps = dispatch => {
  return {
    showLoading: () => dispatch(showLoading()),
    hideLoading: () => dispatch(hideLoading()),
    fetchIssue: (id) => dispatch(fetchIssue(id)),
    updateIssue: (issue) => dispatch(updateIssue(issue)),
    addAttachment: (issueAttachment) => dispatch(postIssueAttachment(issueAttachment)),
    deleteIssueAttachment: (issueAttachment) => dispatch(deleteIssueAttachment(issueAttachment)),
    fetchIssueHistories: (id) => dispatch(fetchIssueHistories(id)),
    addVote: (issueId) => dispatch(createVote(issueId)),
    addWatcher: (issueId) => dispatch(createWatcher(issueId)),
    deleteWatcher: (issueId) => dispatch(deleteWatcher(issueId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IssueDetailContainer)

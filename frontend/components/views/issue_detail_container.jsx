import React from 'react';
import { connect } from 'react-redux';
import { fetchIssue, updateIssue } from '../../actions/issues/issues_actions';
import { fetchIssueTypes, fetchPriorityTypes, fetchStatusTypes } from '../../actions/ui_actions';
import { getIssueTypesArray } from '../../reducers/selectors';
import IssueDetailInput from '../issues/issue_detail_input';
import IssueDetailStatus from '../issues/issue_detail_status';
import IssueStatus from '../issues/issue_status';
import IssueDescription from '../issues/issue_description';
import Resolution from '../issues/resolution';
import Dropdown from '../global/dropdown';

class IssueDetailContainer extends React.Component {
  constructor({issue}){
    super()
    this.state = {
      loading: true,
      issue: null
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      issue: nextProps.issue,
      loading: false,
    })
  }

  componentDidMount(){
    this.props.fetchIssue(this.props.issueId)
    this.props.fetchIssueTypes()
    this.props.fetchPriorityTypes()
    this.props.fetchStatusTypes()
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

  render(){
    if(this.state.loading){
      return <div>LOADING</div>
    } else {
      return(
        <div className="content-inner-container">
          <div>current project / issue key</div>
          <form>
            <IssueDetailInput
              className="issue-detail-form-text issue-detail-summary"
              changeKey="summary"
              updateIssue={this.updateIssue(this.state.issue.id)}
              value={this.state.issue.summary}
              />
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
              <IssueDescription
                updateIssue={this.updateIssue(this.state.issue.id)}
                currentDescription={this.props.current_description}
              />
            </div>
          </form>
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
    issueTypes: state.ui.issue_types,
    priorityTypes: state.ui.priority_types,
    current_issue_type: state.ui.issue_types[issue.issue_type_id],
    current_priority_type: state.ui.priority_types[issue.priority_type_id],
    current_status: state.ui.status_types[issue.status_type_id],
    current_description: currentDescription
  }
}


const mapDispatchToProps = dispatch => {
  return {
    fetchIssue: (id) => dispatch(fetchIssue(id)),
    updateIssue: (issue) => dispatch(updateIssue(issue)),
    fetchIssueTypes: () => dispatch(fetchIssueTypes()),
    fetchPriorityTypes: () => dispatch(fetchPriorityTypes()),
    fetchStatusTypes: () => dispatch(fetchStatusTypes()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IssueDetailContainer)

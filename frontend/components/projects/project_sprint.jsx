import React from 'react';
import { connect } from 'react-redux';
import { getIssuesByStatus, getActiveSprintIssuesByStatus } from '../../reducers/selectors';
import ProjectSprintWidget from './project_sprint_widget';
import { updateIssue, fetchAllIssues } from '../../actions/issues/issues_actions';
import { showLoading, hideLoading, fetchIssueTypes, fetchPriorityTypes } from '../../actions/ui_actions'

class ProjectSprint extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      loading: true
    }

    this.dragStart = this.dragStart.bind(this)
    this.preventDefault = this.preventDefault.bind(this)
    this.drop = this.drop.bind(this)
    this.renderIssuesToColumns = this.renderIssuesToColumns.bind(this)
    this.updateIssueStatus = this.updateIssueStatus.bind(this)
  }

  componentDidMount(){
    this.props.showLoading()
    this.props.fetchAllIssues().then(
      () => this.loadingDone()
    )
  }

  loadingDone(){
    this.setState({ loading: false })
    this.props.hideLoading()
  }

  dragStart(id, status_id){
    return(event) => {
      const data = {
        issue_id: id,
        current_status_id: status_id
      };
      event.dataTransfer.setData('text', JSON.stringify(data));
    }
  }

  preventDefault(event){
   event.preventDefault();
  }

  drop(statusId){
     return (event) => {
       event.preventDefault();
       let data;
       try {
         data = JSON.parse(event.dataTransfer.getData('text'));
       } catch (e) {
         console.log(`Error: ${e}`)
         return;
       }
       if(data.current_status_id != statusId){
         this.updateIssueStatus(data.issue_id, statusId)
       }
     }
   }

  updateIssueStatus(issue_id, status_id){
   this.props.updateIssue({
     id: issue_id,
     status_type_id: status_id
   })
  }

  renderIssuesToColumns(status_id){
    const issues = this.props.issuesByActiveAndStatus
    if(typeof issues[status_id] !== "undefined" ){
      return issues[status_id].map(issue =>{
        return <ProjectSprintWidget
                  key={issue.id}
                  issue={issue}
                  ondrag={this.dragStart(issue.id, issue.status_type_id)}
                  priorityTypes={this.props.priorityTypes}
                  issueTypes={this.props.issueTypes}
                />
      })
    }
  }

  render(){
    if(this.state.loading){
      return <div></div>
    } else {
      return(
        <div className="project-sprint-container">
          <div
            className="sprint-dropzone-container"
            onDrop={this.drop(1)}
            onDragOver={this.preventDefault}
          >
            <div className="sprint-dropzone-title">Todo</div>
            { this.renderIssuesToColumns(1)}

          </div>
          <div
            className="sprint-dropzone-container"
            onDrop={this.drop(2)}
            onDragOver={this.preventDefault}
          >
            <div className="sprint-dropzone-title">In Progress</div>
            { this.renderIssuesToColumns(2)}
          </div>
          <div
            className="sprint-dropzone-container"
            onDrop={this.drop(3)}
            onDragOver={this.preventDefault}
          >
            <div className="sprint-dropzone-title">Done</div>
            { this.renderIssuesToColumns(3)}
          </div>
        </div>
      )
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return{
    projectId: ownProps.projectId,
    issuesByActiveAndStatus: getActiveSprintIssuesByStatus(state, ownProps.projectId),
    priorityTypes: state.ui.priority_types,
    issueTypes: state.ui.issue_types,
  }
}

const mapDispatchToProps = dispatch => {
  return{
    showLoading: () => dispatch(showLoading()),
    hideLoading: () => dispatch(hideLoading()),
    fetchIssueTypes: () => dispatch(fetchIssueTypes()),
    fetchPriorityTypes: () => dispatch(fetchPriorityTypes()),
    updateIssue: (issue) => dispatch(updateIssue(issue)),
    fetchAllIssues: () => dispatch(fetchAllIssues()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectSprint)

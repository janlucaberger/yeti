import React from 'react';
import { connect } from 'react-redux';
import { getIssuesByStatus, getActiveSprintIssuesByStatus, getSprint } from '../../reducers/selectors';
import ProjectSprintWidget from './project_sprint_widget';
import { updateIssue, fetchIssuesByProject } from '../../actions/issues/issues_actions';
import { showLoading, hideLoading, fetchIssueTypes, fetchPriorityTypes } from '../../actions/ui_actions'
import dateFormat from 'dateformat';
import { completeSprint } from '../../actions/sprints/sprints_actions';
import {showModal} from '../../actions/ui_actions'
import NewSprintForm from './new_sprint_form';

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
    this.renderSprintInfo = this.renderSprintInfo.bind(this)
    this.completeSprint = this.completeSprint.bind(this)
    this.showNewSprintForm = this.showNewSprintForm.bind(this)
    this.getStatusTypeId = this.getStatusTypeId.bind(this)
  }

  componentDidMount(){
    this.props.showLoading()
    this.props.fetchIssuesByProject(this.props.projectId).then(
      () => this.loadingDone()
    )
  }

  loadingDone(){
    this.setState({ loading: false })
    this.props.hideLoading()
  }

  dragStart(id, status_id){
    return(e) => {
      const data = {
        issue_id: id,
        current_status_id: status_id
      };
      e.dataTransfer.setData('text', JSON.stringify(data));
    }
  }

  preventDefault(event){
   event.preventDefault();
  }

  drop(status){
     return (e) => {
       e.preventDefault();
       const statusId = this.getStatusTypeId(this.props.statusTypes, status)
       let data = JSON.parse(e.dataTransfer.getData('text'));

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


  getStatusTypeId(statusTypes, value){
    let id;
    for(let key in statusTypes){
      if(statusTypes[key].status_type == value){
        id = key
      }
    }

    return id;
  }


  renderIssuesToColumns(value){
    const issues = this.props.issuesByActiveAndStatus
    const status_id = this.getStatusTypeId(this.props.statusTypes, value)
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

  showNewSprintForm() {
    this.props.showModal(NewSprintForm, {
      projectId: this.props.projectId
    })
  }

  completeSprint(){
    this.props.completeSprint({
      project_id: this.props.projectId,
      sprint_id: this.props.sprint.id
    })
  }

  renderSprintInfo(){
    const sprint = this.props.sprint

    if(this.props.sprint){
      return (
        <div className='current-sprint-container'>
          <div className="current-sprint-info-container">
            <div className="current-sprint-text-container">
              <div className="current-sprint-date-container">
                <div className="current-sprint-label">Name: </div>
                {sprint.name}
              </div>
              <div className="current-sprint-date-container">
                <div className="current-sprint-label">Start: </div>
                {dateFormat(sprint.start_date, "dddd, mmmm dS, yyyy")}
              </div>
              <div className="current-sprint-date-container">
                <div className="current-sprint-label">End: </div>
                {dateFormat(sprint.end_date, "dddd, mmmm dS, yyyy")}
              </div>
            </div>
            <div className="current-sprint-button-container">
              <button onClick={this.completeSprint} className="primary-button blue-background">Complete Sprint</button>
            </div>
          </div>
          <div className="current-sprint-boards">
            <div
              className="sprint-dropzone-container"
              onDrop={this.drop("Todo")}
              onDragOver={this.preventDefault}
            >
              <div className="sprint-dropzone-title">Todo</div>
              { this.renderIssuesToColumns("Todo")}

            </div>
            <div
              className="sprint-dropzone-container"
              onDrop={this.drop("In Progress")}
              onDragOver={this.preventDefault}
            >
              <div className="sprint-dropzone-title">In Progress</div>
              { this.renderIssuesToColumns("In Progress")}
            </div>
            <div
              className="sprint-dropzone-container"
              onDrop={this.drop("Done")}
              onDragOver={this.preventDefault}
            >
              <div className="sprint-dropzone-title">Done</div>
              { this.renderIssuesToColumns("Done")}
            </div>
          </div>
        </div>
      )
    } else {
      return(
        <div className="no-sprint-container">
          <div className="placeholder-text">Looks like you haven't started a sprint.</div>
          <button className="large-button blue-background" onClick={this.showNewSprintForm}>Start Sprint</button>
        </div>
      )
    }
  }

  render(){
    if(this.state.loading){
      return <div></div>
    } else {
      return(
        <div className="project-sprint-container">
          <div className="current-container-title">
            Sprint
          </div>
          { this.renderSprintInfo() }
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
    statusTypes: state.ui.status_types,
    sprint: getSprint(state, ownProps.projectId)
  }
}

const mapDispatchToProps = dispatch => {
  return{
    showLoading: () => dispatch(showLoading()),
    hideLoading: () => dispatch(hideLoading()),
    updateIssue: (issue) => dispatch(updateIssue(issue)),
    completeSprint: (sprint) => dispatch(completeSprint(sprint)),
    fetchIssuesByProject: (projectId) => dispatch(fetchIssuesByProject(projectId)),
    showModal: (component, props) => dispatch(showModal(component, props))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectSprint)

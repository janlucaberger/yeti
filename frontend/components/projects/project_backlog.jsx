import React from 'react';
import {connect} from 'react-redux';
import { fetchIssuesByProject } from '../../actions/issues/issues_actions'
import { showModal, hideModal } from '../../actions/ui_actions'
import {getIssuesBySprintStatus, getSprintByProject} from '../../reducers/selectors';
import {updateIssue} from '../../actions/issues/issues_actions';
import NewSprintForm from './new_sprint_form';
import ProjectBacklogItem from "./project_backlog_item";
import { Link } from 'react-router-dom';
import { fetchSprint, completeSprint } from '../../actions/sprints/sprints_actions'
import TimeAgo from 'react-timeago';
import dateFormat from 'dateformat';

class ProjectBacklog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      dragging: false
    }
    this.renderIssues = this.renderIssues.bind(this)
    this.dragStart = this.dragStart.bind(this)
    this.drop = this.drop.bind(this)
    this.updateSprintStatus = this.updateSprintStatus.bind(this)
    this.showNewSprintForm = this.showNewSprintForm.bind(this)
    this.preventDefault = this.preventDefault.bind(this)
    this.renderIssueClasses = this.renderIssueClasses.bind(this)
    this.renderSprintInfo = this.renderSprintInfo.bind(this)
    this.completeSprint = this.completeSprint.bind(this)
  }

  componentDidMount() {

    this.props.fetchSprint(this.props.projectId)
    this.props.fetchIssuesByProject(this.props.projectId).then(() => {
      this.loadingComplete()
    })
  }

  dragStart(id, sprintStatus) {
    return (event) => {
      console.log("drag start")
      console.log(this.node)
      this.setState({ dragging: true })
      const data = {
        issue_id: id,
        sprint: sprintStatus
      };
      console.log(data)
      event.dataTransfer.setData('text', JSON.stringify(data));
    }
  }

  preventDefault(event) {
    event.preventDefault();
  }

  drop(sprintStatus) {
    return (event) => {
      
      event.preventDefault();
      let data;
      try {
        data = JSON.parse(event.dataTransfer.getData('text'));
        console.log(data)
      } catch (e) {
        console.log(`Error: ${e}`)
        return;
      }
      if (data.sprint != sprintStatus) {
        this.updateSprintStatus(data.issue_id, sprintStatus)
      }
    }
  }

  updateSprintStatus(issue_id, sprintStatus) {
    this.props.updateIssue({id: issue_id, sprint: sprintStatus})
  }

  loadingComplete() {
    this.setState({loading: false})
  }


  completeSprint(){
    this.props.completeSprint({
      project_id: this.props.projectId,
      sprint_id: this.props.sprint.id
    })
  }

  renderIssues(issues){
    return Object.values(issues).map(issue => {
      return (
        <Link key={issue.id} to={`/projects/${issue.project_id}/backlog/issues/${issue.id}`}>
          <div
            className="backlog-item-container"
            onDragStart={this.dragStart(issue.id, issue.sprint)}
            draggable={true}
            ref={ (node) => { this.node = node }}
          >
            <div className="backlog-item-summary">
              <img className="backlog-item-icon" src={this.props.issueTypes[issue.issue_type_id].icon_url} width="20px"/>
              {issue.summary}
            </div>
            <div className="backlog-item-key">
              {issue.key}
            </div>
          </div>
        </Link>

      )
    })
  }

  showNewSprintForm() {
    this.props.showModal(NewSprintForm, {
      projectId: this.props.match.params.id
    })
  }

  renderIssueClasses(){
    if (this.state.dragging){
      return "backlog-item-container dragging"
    } else {
      return "backlog-item-container"
    }
  }

  renderSprintInfo(){
    const sprint = this.props.sprint
    console.log(sprint)
    if(this.props.sprint){
      return (
        <div className="current-sprint-info-container">
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
          <button onClick={this.completeSprint} className="primary-button blue-background">Complete Sprint</button>
        </div>
      )
    } else {
      return(
        <div className="current-sprint-info-container">
          Looks like you haven't started a sprint.
          <button onClick={this.showNewSprintForm}>Start Sprint</button>
        </div>
      )
    }
  }

  render() {

    if (this.state.loading) {
      return <div></div>
    } else {
      return (
        <div>
          <div className="current-container-title">
            Backlog
          </div>
          { this.renderSprintInfo() }
          <div className="backlog-container" onDrop={this.drop(true)} onDragOver={this.preventDefault}>
            <div className="backlog-container-title gray">Sprint</div>
            <div className="backlog-items-container">
              {this.renderIssues(this.props.issues.active)}
            </div>
          </div>
          <div className="backlog-container" onDrop={this.drop(false)} onDragOver={this.preventDefault}>
            <div className="backlog-container-title gray">Backlog</div>
            <div className="backlog-items-container">
              {this.renderIssues(this.props.issues.inactive)}
            </div>
          </div>
        </div>
      )
    }
  }
}

const mapStateToProps = (state, ownProps) => {

  return {
    projectId: ownProps.match.params.id,
    issues: getIssuesBySprintStatus(state, ownProps.match.params.id),
    issueTypes: state.ui.issue_types,
    sprint: getSprintByProject(state, ownProps.match.params.id)

  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchIssuesByProject: (projectId) => dispatch(fetchIssuesByProject(projectId)),
    fetchSprint: (projectId) => dispatch(fetchSprint(projectId)),
    completeSprint: (id) => dispatch(completeSprint(id)),
    updateIssue: (issue) => dispatch(updateIssue(issue)),
    showModal: (component, props) => dispatch(showModal(component, props)),
    hideModal: () => dispatch(hideModal()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectBacklog)

import React from 'react';
import {connect} from 'react-redux';
import {fetchAllIssues} from '../../actions/issues/issues_actions'
import { showModal } from '../../actions/ui_actions'
import {getIssuesBySprintStatus} from '../../reducers/selectors';
import { updateIssue } from '../../actions/issues/issues_actions';
import NewSprintForm from './new_sprint_form';

class ProjectBacklog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    }
    this.renderInactiveIssues = this.renderInactiveIssues.bind(this)
    this.renderActiveIssues = this.renderActiveIssues.bind(this)
    this.dragStart = this.dragStart.bind(this)
    this.drop = this.drop.bind(this)
    this.updateSprintStatus = this.updateSprintStatus.bind(this)
    this.showNewSprintForm = this.showNewSprintForm.bind(this)
    this.preventDefault = this.preventDefault.bind(this)
  }

  componentDidMount() {
    this.props.fetchIssues().then(() => {
      this.loadingComplete()
    })
  }

  dragStart(id, sprintStatus) {
    return (event) => {

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
      console.log("DROPPED")

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
      console.log(data, sprintStatus);
    }
  }

  updateSprintStatus(issue_id, sprintStatus) {
    this.props.updateIssue({id: issue_id, sprint: sprintStatus})
  }

  loadingComplete() {
    this.setState({loading: false})
  }

  renderInactiveIssues() {
    return Object.values(this.props.issues.inactive).map(issue => {
      return (
        <div className="backlog-item-container" onDragStart={this.dragStart(issue.id, issue.sprint)} key={issue.id} draggable={true} >
          {issue.summary}
        </div>
      )

    })
  }
  renderActiveIssues() {
    return Object.values(this.props.issues.active).map(issue => {
      return (
        <div className="backlog-item-container" onDragStart={this.dragStart(issue.id, issue.sprint)} key={issue.id} draggable={true} >
          {issue.summary}
        </div>
      )
    })
  }

  showNewSprintForm(){
    this.props.showModal(NewSprintForm, {projectId: this.props.match.params.id, test:2})
  }

  render() {

    if (this.state.loading) {
      return <div></div>
    } else {
      return (
        <div>
          <button onClick={this.showNewSprintForm}>Start Sprint</button>
          <div className="backlog-container" onDrop={this.drop(true)} onDragOver={this.preventDefault}>
            Sprint
            {this.renderActiveIssues()}
          </div>
          <div className="backlog-container" onDrop={this.drop(false)} onDragOver={this.preventDefault}>
            Backlog
            {this.renderInactiveIssues()}
          </div>
        </div>
      )
    }
  }
}

const mapStateToProps = (state, ownProps) => {

  return {
    issues: getIssuesBySprintStatus(state, ownProps.match.params.id)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchIssues: () => dispatch(fetchAllIssues()),
    updateIssue: (issue) => dispatch(updateIssue(issue)),
    showModal: (component) => dispatch(showModal(component))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectBacklog)

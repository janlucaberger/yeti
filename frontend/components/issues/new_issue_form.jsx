import React from 'react';
import { connect } from 'react-redux';
import { hideModal } from '../../actions/ui_actions';
import Dropdown from '../global/dropdown';
import { fetchIssueTypes, fetchPriorityTypes } from '../../actions/ui_actions';
import { fetchAllProjects } from '../../actions/projects/projects_actions';
import { fetchAllUsers } from '../../actions/users/user_actions';
import { createIssue } from '../../actions/issues/issues_actions';
import ReactQuill from 'react-quill'

class NewIssueForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      description: "",
      loading: true,
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDropdownChoice = this.handleDropdownChoice.bind(this)
    this.formatUserName = this.formatUserName.bind(this)
    this.handleDescription = this.handleDescription.bind(this)
  }

  componentWillReceiveProps(nextProps){
    if(typeof Object.values(nextProps.projects)[0] !== "undefined"){
      this.setState({
        project_id: Object.values(nextProps.projects)[0].id,
      })
    }
    if(typeof Object.values(nextProps.users)[0] !== "undefined"){
      this.setState({
        assigned_user_id: Object.values(nextProps.users)[0].id,
      })
    }

  }

  componentDidMount(){
    this.props.fetchIssueTypes()
    this.props.fetchPriorityTypes()
    this.props.fetchAllProjects()
    this.props.fetchAllUsers().then( () => this.setState({
      loading: false,
      issue_type_id: 1,
      priority_type_id: 2,
    }))
  }

  handleChange(key){
    return (e) => {

      this.setState({
        [key]: e.currentTarget.value
      })
    }
  }
  handleDescription(value){
    this.setState({
      description: value
    })
  }

  handleDropdownChoice(key, val){
    this.setState({ [key]: val })
  }


  handleSubmit(e){
    e.preventDefault();
    const formData = {
      description: this.state.description,
      issue_type_id: this.state.issue_type_id,
      priority_type_id: this.state.priority_type_id,
      project_id: this.state.project_id,
      assigned_user_id: this.state.assigned_user_id,
      summary: this.state.summary,
    }

    this.props.createIssue(formData).then(() => {
      this.props.closeModal();
    })
  }

  formatUserName(users){
    let formated = {}
    for(let key in users){
      formated[key] = {
        user_name: `${users[key].first_name} ${users[key].last_name}`,
        id: users[key].id,
        avatar_url: users[key].avatar
      }
    }
    return formated
  }

  render(){
    debugger
    console.log(this.state.description)
    if(this.state.loading){
      return(
        <div>Loading</div>
      )
    } else {
      return(
        <div className="new-item-form-container">
          <div className="new-item-form-header">
            <h3>Create Issue</h3>
            <h5>Key: {this.props.projects[this.state.project_id].key}</h5>
          </div>
          <div className="new-item-form-content">
            <label className="new-item-form-label">Summary<span className="red">*</span></label>
            <input type="text" className="new-item-form-input" value={this.state.summary} onChange={this.handleChange("summary")} />
            <div className="new-issue-dropdowns">
              <Dropdown
                title="Project*"
                item="title"
                changeKey="project_id"
                updateProperty={this.handleDropdownChoice}
                options={this.props.projects}
                iconKey="avatar"
                currentOption={this.props.projects[this.state.project_id]}
                width="180px"
              />
              <Dropdown
                title="Priority"
                item="priority_type"
                changeKey="priority_type_id"
                updateProperty={this.handleDropdownChoice}
                options={this.props.priorityTypes}
                iconKey="icon_url"
                currentOption={this.props.priorityTypes[this.state.priority_type_id]}
                width="120px"
                />
              <Dropdown
                title="Type*"
                item="issue_type"
                changeKey="issue_type_id"
                updateProperty={this.handleDropdownChoice}
                options={this.props.issueTypes}
                iconKey="icon_url"
                currentOption={this.props.issueTypes[this.state.issue_type_id]}
                width="120px"
              />
            </div>
            <label className="new-item-form-label">Description</label>
            <ReactQuill value={this.state.description}
              onChange={this.handleDescription}
            />
            <Dropdown
              title="User*"
              item="user_name"
              changeKey="assigned_user_id"
              updateProperty={this.handleDropdownChoice}
              options={this.formatUserName(this.props.users)}
              iconKey="avatar_url"
              currentOption={this.formatUserName(this.props.users)[this.state.assigned_user_id]}
              width="200px"
            />
          </div>

          <div className="new-item-form-footer">
            <button className="secondary-button white-background" onClick={this.props.closeModal}>Cancel</button>
            <button className="primary-button blue-background" onClick={this.handleSubmit}>Add</button>
          </div>
        </div>
      )
    }
  }
}

const mapStateToProps = state => {
  return{
    issueTypes: state.ui.issue_types,
    priorityTypes: state.ui.priority_types,
    projects: state.projects,
    users: state.users,
  }
}

const mapDispatchToProps = dispatch => {
  return{
    closeModal: () => dispatch(hideModal()),
    fetchIssueTypes: () => dispatch(fetchIssueTypes()),
    fetchPriorityTypes: () => dispatch(fetchPriorityTypes()),
    fetchAllProjects: () => dispatch(fetchAllProjects()),
    fetchAllUsers: () => dispatch(fetchAllUsers()),
    createIssue: (issue) => dispatch(createIssue(issue)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewIssueForm)

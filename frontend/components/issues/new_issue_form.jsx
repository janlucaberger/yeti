import React from 'react';
import { connect } from 'react-redux';
import { hideModal } from '../../actions/ui_actions';
import Dropdown from '../global/dropdown';
import { fetchIssueTypes, fetchPriorityTypes } from '../../actions/ui_actions';
import { fetchAllProjects } from '../../actions/projects/projects_actions';
import ReactQuill from 'react-quill'

class NewIssueForm extends React.Component{
  constructor(props){
    super(props);
    debugger
    this.state = {
      project_id: Object.values(this.props.projects)[0].id,
      summary: "",
      description: "",
      issue_type_id: 1,
      priority_type_id: 2,
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDropdownChoice = this.handleDropdownChoice.bind(this)
  }

  componentDidMount(){
    this.props.fetchIssueTypes()
    this.props.fetchPriorityTypes()
    this.props.fetchAllProjects()
  }

  handleChange(key){
    return (e) => {
      this.setState({
        [key]: e.currentTarget.value
      })
    }
  }

  handleDropdownChoice(key, val){
    this.setState({ [key]: val })
  }


  handleSubmit(e){
    e.preventDefault();

    const formData = new FormData();
    const file = this.state.image_file;

    formData.append("project[title]", this.state.title);
    formData.append("project[description]", this.state.description);
    formData.append("project[key]", this.state.key);
    formData.append("project[category]", this.state.category);
    if (file) formData.append("project[avatar]", file);

    this.props.createNewProject(formData).then(() => {
      this.props.closeModal();
    })
  }

  render(){
    console.log(this.state.issue_type_id)
    debugger
    return(
      <div className="new-item-form-container">
        <div className="new-item-form-header">
          <h3>Create Issue</h3>
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
            onChange={this.handleChange("description")}
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

const mapStateToProps = state => {
  return{
    issueTypes: state.ui.issue_types,
    priorityTypes: state.ui.priority_types,
    projects: state.projects
  }
}

const mapDispatchToProps = dispatch => {
  return{
    closeModal: () => dispatch(hideModal()),
    fetchIssueTypes: () => dispatch(fetchIssueTypes()),
    fetchPriorityTypes: () => dispatch(fetchPriorityTypes()),
    fetchAllProjects: () => dispatch(fetchAllProjects()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewIssueForm)

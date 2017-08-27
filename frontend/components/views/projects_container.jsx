import React from "react";
import { connect } from 'react-redux';
import { fetchAllProjects } from '../../actions/projects/projects_actions';
import ProjectsTable from '../projects/projects_table';
import { showModal } from '../../actions/ui_actions';
import NewProjectForm from '../projects/new_project_form';

class ProjectsContainer extends React.Component {
  constructor(){
    super();

    this.createProjectForm = this.createProjectForm.bind(this);
  }

  createProjectForm(){
    this.props.showModal(NewProjectForm)
  }


  render(){
    return(
      <div className="content-inner-container">
        <div className="content-header">Projects
          <button className="primary-button" onClick={this.createProjectForm}>Create new Project</button>
        </div>  
        <ProjectsTable />
      </div>
    )
  }

}

const mapDispatchToProps = dispatch => {
  return{
    fetchAllProjects: () => dispatch(fetchAllProjects()),
    showModal: (component, props) => dispatch(showModal(component, props)),
  }
}

export default connect(null, mapDispatchToProps)(ProjectsContainer)

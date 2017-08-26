import React from 'react'
import { connect } from 'react-redux'
import { fetchProject } from '../../actions/projects/projects_actions';
import { Route } from 'react-router';
import ProjectSprint from '../projects/project_sprint';
import { fetchPriorityTypes } from '../../actions/ui_actions';

class ProjectDetailContainer extends React.Component {
  constructor(props){
    super(props)

    this.projectId = props.match.params.id
  }

  componentDidMount(){
    this.props.fetchProject(this.projectId)
    this.props.fetchPriorityTypes()
  }

  componentWillReceiveProps(nextProps){
    this.projectId = nextProps.match.params.id
  }

  render(){
    return(
      <div className="content-inner-container">Project Detail
        <Route path="/projects/:id/sprint" render={() => <ProjectSprint projectId={this.projectId}/> } />
      </div>
    )
  }
}


const mapDispatchToProps = dispatch => {
  return{
    fetchProject: id => dispatch(fetchProject(id)),
    fetchPriorityTypes: () => dispatch(fetchPriorityTypes())
  }
}

export default connect(null, mapDispatchToProps)(ProjectDetailContainer)

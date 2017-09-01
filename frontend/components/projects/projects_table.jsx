import React from 'react';
import { connect } from 'react-redux';
import { getProjectsArray } from "../../reducers/selectors";
import { fetchAllProjects } from '../../actions/projects/projects_actions';
import { showModal, showLoading, hideLoading, receiveCurrentPage } from '../../actions/ui_actions'
import TimeAgo from 'react-timeago'
import { withRouter, Link } from 'react-router-dom'
import NewProjectForm from './new_project_form'

class ProjectsTable extends React.Component {
  constructor(){
    super();

    this.state ={
      tableHeaders: [],
      loading: false,
    }

    this.mapRowsCell = this.mapRowsCell.bind(this)
    this.mappedHeaders = this.mappedHeaders.bind(this)
    this.loadingFinished = this.loadingFinished.bind(this)
    this.handleProjectClick = this.handleProjectClick.bind(this)
    this.renderProjectWidgets = this.renderProjectWidgets.bind(this)
    this.createNewProject = this.createNewProject.bind(this)
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.projectsArray.length > 0){
      this.setState({
        tableHeaders: Object.keys(nextProps.projectsArray[0])
      })
    }
  }

  componentDidMount(){
    this.props.showLoading()
    this.props.fetchAllProjects().then(() => {
      if(this.props.projectsArray.length > 0){
        this.setState({
          tableHeaders: Object.keys(this.props.projectsArray[0])
        }, this.loadingFinished)
      } else {
        this.loadingFinished()
      }
    })
  }

  loadingFinished(){
    setTimeout(() => {
      this.props.hideLoading()
    },1300)
  }

  handleProjectClick(id){
    this.props.setPage({type: "Project", id: id})
    this.props.routeHistory.push(`/projects/${id}/sprint`)
  }

  createNewProject(){
    this.props.showModal(NewProjectForm);
  }

  mapRowsCell(project){
    return this.state.tableHeaders.map((header,idx) => {
      const value = project[header] || "--";

      switch (header) {
        case "id":
          return null
        case "created_at":
          return (
            <td key={idx}>
              <TimeAgo date={project[header]} />
            </td>
          )
        case "avatar":
          return(
            <td key={idx}>
              <img src={project[header]} width="25px" />
            </td>
          )
        case "title":
          return(
            <td key={idx}>
              <h3>{project[header]}</h3>
            </td>
          )
        default:
          return <td key={idx}>{value}</td>
      }
    }, this)
  }

  mappedHeaders(){
    return this.state.tableHeaders.map((header, idx) => {
      switch (header) {
        case "id":
          break;
        default:
          return <th className="table-header" key={idx}>{header.split("")[0].toUpperCase() + header.split("").slice(1).join("")}</th>
      }
    })
  }


  renderProjectWidgets(){
    return this.props.projectsArray.map((project) => {
      return(
        <div onClick={() => this.handleProjectClick(project.id)} className="project-widget-container">
          <div className="project-widget-border"></div>
          <div className="project-widget-content-container">
            <div className="project-widget-header">
              <div className="project-widget-title">{project.title}</div>
            </div>
            <div className="project-widget-footer">
              <div className="project-widget-issue-count">{project.issue_count}</div>
              <div className="project-widget-timestamp"><TimeAgo date={project.created_at} /></div>
            </div>
          </div>
        </div>
      )
    })
  }


  render(){
    // const mappedRows = this.props.projectsArray.map((project) => {
    //   const projectId = project.id
    //   return (
    //     <tr onClick={() => this.handleProjectClick(projectId)} className="table-row" key={project.id}>
    //       {this.mapRowsCell(project)}
    //     </tr>
    //   )
    // }, this)


    if(this.state.loading){
      return <div>loading</div>
    } else if (this.props.projectsArray.length === 0){
      return (
        <div className="content-inner-container-placeholder">
          <div className="placeholder-text">Looks you you dont have any projects yet!</div>
          <button onClick={this.createNewProject} className="large-button blue-background">Create a project!</button>
        </div>
      )
    } else {
      return (
        <div className="project-widgets-container">
          {this.renderProjectWidgets()}
        </div>
      )
    }
  }
}

const mapStateToProps = (state, ownProps) => {

  return {
    projectsArray: getProjectsArray(state),
    routeHistory: ownProps.history
  }
}

const mapDispatchToProps = dispatch => {
  return{

    fetchAllProjects: () => dispatch(fetchAllProjects()),
    showLoading: (props) => dispatch(showLoading(props)),
    hideLoading: () => dispatch(hideLoading()),
    setPage: (page) => dispatch(receiveCurrentPage(page)),
    showModal: (component, props, styles) => dispatch(showModal(component, props, styles)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProjectsTable))


// } else if (this.props.projectsArray.length === 0){
//   return (
//     <div className="content-inner-container-placeholder">
//       <div className="placeholder-text">Looks you you dont have any projects yet!</div>
//       <button className="large-button blue-background">Create an issue!</button>
//     </div>
//   )
// } else {
//   return(
//     <div className="projects-table-container">
//       <table>
//         <thead>
//           <tr>
//             { this.mappedHeaders() }
//           </tr>
//         </thead>
//         <tbody>
//           { mappedRows }
//         </tbody>
//       </table>
//     </div>
//   )
// }

import React from 'react';
import { connect } from 'react-redux';
import { getProjectsArray } from "../../reducers/selectors";
import { fetchAllProjects } from '../../actions/projects/projects_actions';
import { showLoading, hideLoading, receiveCurrentPage } from '../../actions/ui_actions'
import TimeAgo from 'react-timeago'
import { withRouter, Link } from 'react-router-dom'

class ProjectsTable extends React.Component {
  constructor(){
    super();

    this.state ={
      tableHeaders: [],
      loading: false
    }

    this.mapRowsCell = this.mapRowsCell.bind(this)
    this.mappedHeaders = this.mappedHeaders.bind(this)
    this.loadingFinished = this.loadingFinished.bind(this)
    this.handleProjectClick = this.handleProjectClick.bind(this)
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


  mapRowsCell(project){
    return this.state.tableHeaders.map((header,idx) => {
      const value = project[header] || "--";

      switch (header) {
        case "id":
          break;
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


  render(){

    // const mappedHeaders = this.state.tableHeaders.map((header, idx) => {
    //   return <th className="table-header" key={idx}>{header.split("")[0].toUpperCase() + header.split("").slice(1).join("")}</th>
    // })

    const mappedRows = this.props.projectsArray.map((project) => {
      const projectId = project.id
      return (
        <tr onClick={() => this.handleProjectClick(projectId)} className="table-row" key={project.id}>
          {this.mapRowsCell(project)}
        </tr>
      )
    }, this)

    if (this.state.loading) {
      return <h1>LOADINGGGG</h1>
    } else if (this.props.projectsArray.length === 0){
      return (
        <div className="content-inner-container-placeholder">
          <div className="placeholder-text">Looks you you dont have any projects yet!</div>
          <button className="large-button blue-background">Create an issue!</button>
        </div>
      )
    } else {
      return(
        <div className="projects-table-container">
          <table>
            <thead>
              <tr>
                { this.mappedHeaders() }
              </tr>
            </thead>
            <tbody>
              { mappedRows }
            </tbody>
          </table>
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
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProjectsTable))

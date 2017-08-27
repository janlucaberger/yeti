import React from 'react';
import { connect } from 'react-redux';
import { getProjectsArray } from "../../reducers/selectors";
import { fetchAllProjects } from '../../actions/projects/projects_actions';
import { showLoading, hideLoading} from '../../actions/ui_actions'
import TimeAgo from 'react-timeago'
import { Link } from 'react-router-dom'

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
  }

  componentDidMount(){
    this.props.showLoading()
    this.props.fetchAllProjects().then(() => {
      this.setState({
        tableHeaders: Object.keys(this.props.projectsArray[0])
      }, this.loadingFinished)
    })
  }

  loadingFinished(){
    setTimeout(() => {
      this.props.hideLoading()
    },1300)
  }


  mapRowsCell(project){
    return this.state.tableHeaders.map((header,idx) => {
      const value = project[header] || "--";

      switch (header) {
        case "id":
          return <td></td>
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
          return   <td key={idx}><Link to={`/projects/${project.id}/sprint`} >{value}</Link></td>
      }
    })
  }

  mappedHeaders(){
    return this.state.tableHeaders.map((header, idx) => {
      switch (header) {
        case "id":
          return ""
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
      return (
        <tr className="table-row" key={project.id}>
          {this.mapRowsCell(project)}
        </tr>
      )
    })

    if (this.state.loading) {
      return <h1>LOADINGGGG</h1>
    } else if (this.props.projectsArray.length === 0){
      return (
        <div>Looks you you dont have any projects yet!</div>
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

const mapStateToProps = state => {
  return {
    projectsArray: getProjectsArray(state)
  }
}

const mapDispatchToProps = dispatch => {
  return{
    fetchAllProjects: () => dispatch(fetchAllProjects()),
    showLoading: (props) => dispatch(showLoading(props)),
    hideLoading: () => dispatch(hideLoading())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsTable)

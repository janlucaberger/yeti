import React from 'react';
import { connect } from 'react-redux';
import { getProjectsArray } from "../../reducers/selectors";
import { fetchAllProjects } from '../../actions/projects/projects_actions';

import TimeAgo from 'react-timeago'


class ProjectsTable extends React.Component {
  constructor(){
    super();

    this.state ={
      tableHeaders: []
    }

    this.mapRowsCell = this.mapRowsCell.bind(this)
    this.mappedHeaders = this.mappedHeaders.bind(this)
  }

  componentDidMount(){
    this.props.fetchAllProjects().then(() => {
      this.setState({ tableHeaders: Object.keys(this.props.projectsArray[0])})
    })
  }


  mapRowsCell(project){
    return this.state.tableHeaders.map((header,idx) => {
      const value = project[header] || "--";

      switch (header) {
        case "id":
          return ""
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

const mapStateToProps = state => {
  return {
    projectsArray: getProjectsArray(state)
  }
}

const mapDispatchToProps = dispatch => {
  return{
    fetchAllProjects: () => dispatch(fetchAllProjects())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsTable)

import React from 'react';
import { connect } from 'react-redux';
import { getIssuesArray } from "../../reducers/selectors";
import { fetchAllIssues } from '../../actions/issues/issues_actions';
import { fetchAllUsers } from '../../actions/users/user_actions';
import {
  showLoading,
  hideLoading,
  fetchIssueTypes,
  fetchPriorityTypes,
  fetchStatusTypes,
  showModal
} from '../../actions/ui_actions'
import TimeAgo from 'react-timeago'
import { Link, withRouter } from 'react-router-dom'
import UserWidget from '../global/user_widget';
import NewIssueForm from '../issues/new_issue_form'

class IssuesTable extends React.Component {
  constructor(){
    super();

    this.state ={
      tableHeaders: [],
      loading: true,
    }

    this.mapRowsCell = this.mapRowsCell.bind(this)
    this.mappedHeaders = this.mappedHeaders.bind(this)
    this.loadingFinished = this.loadingFinished.bind(this)
    this.createNewIssue = this.createNewIssue.bind(this)
  }

  componentWillReceiveProps(nextProps){
    if(this.props.issuesArray.length > 0){
      this.setState({
        tableHeaders: Object.keys(this.props.issuesArray[0]),
      })
    }
  }

  goToPage(id){
    return (e) => {
      this.props.history.push(`/issues/${id}`)
    }
  }

  componentDidMount(){
    console.log("Started Loading")
    this.props.showLoading()
    this.props.fetchAllIssues().then(() => {
      if(this.props.issuesArray.length > 0){
        this.setState({
          tableHeaders: Object.keys(this.props.issuesArray[0]),
          loading: false
        })
      } else {
        this.setState({
          loading: false
        })
      }
      this.loadingFinished()
    })
    console.log("Finished requests")
  }

  loadingFinished(){
    setTimeout(() => {
      this.props.hideLoading()
    },1000)
  }

  // handleUndefined(value, default){
  //   if(typeof value == "undefined"){
  //     return default
  //   } else {
  //     return value
  //   }
  // }


  mapRowsCell(issue){
    return this.state.tableHeaders.map((header,idx) => {
      
      const value = issue[header] || "--";
        switch (header) {
          case "id":
            return null
          case "created_at":
            return (
              <td key={idx}>
                <TimeAgo date={issue[header]} />
              </td>
            )
          case "issue_type_id":
            return (
              <td key={idx}>
                <img src={this.props.issueTypes[issue[header]].icon_url} width="20px"/>
              </td>
            )
          case "project_id":
            return (
              <td key={idx}>
                <p>{this.props.projects[issue[header]].title}</p>
              </td>
            )
          case "status_type_id":
            return (
              <td key={idx}>
                <p>{this.props.statusTypes[issue[header]].status_type}</p>
              </td>
            )
          case "priority_type_id":
            return (
              <td key={idx}>
                <img src={this.props.priorityTypes[issue[header]].icon_url} width="20px"/>
              </td>
            )
          case "summary":
            return (
              <td key={idx}>
                <h3>{value}</h3>
              </td>
            )
          case "assigned_user_id":
            return(
              <td key={idx}>
                <img src={this.props.users[issue[header]].avatar} width="25px" />
                {this.props.users[issue[header]].first_name}&nbsp;{this.props.users[issue[header]].last_name}
              </td>
            )
          default:
            return null
            // <td key={idx}><Link to={`/issues/${issue.id}`} >{value}</Link></td>
        }
    }, this)
  }

  mappedHeaders(){
    return this.state.tableHeaders.map((header, idx) => {
      switch (header) {
        case "id":
          return null
        case "assigned_user_id":
          return <th className="table-header" key={idx}>Assigned To</th>
        case "status_type_id":
          return <th className="table-header" key={idx}>Status</th>
        case "issue_type_id":
          return <th className="table-header" key={idx}>Issue Type</th>
        case "priority_type_id":
          return <th className="table-header" key={idx}>Priority</th>
        case "project_id":
          return <th className="table-header" key={idx}>Project</th>
        case "summary":
          return <th className="table-header" key={idx}>Summary</th>
        default:
          return null
          // return <th className="table-header" key={idx}>{header.split("")[0].toUpperCase() + header.split("").slice(1).join("")}</th>
      }
    })
  }


  createNewIssue(){
    this.props.showModal(NewIssueForm);
  }


  render(){
    if (this.state.loading) {
      return <div></div>
    } else if (this.props.issuesArray.length === 0){
      return (
        <div className="content-inner-container-placeholder">
          <div className="placeholder-text">Looks you you dont have any issues yet!</div>
          <button onClick={this.createNewIssue} className="large-button blue-background">Create an issue!</button>
        </div>
      )
    } else {
      const mappedRows = this.props.issuesArray.map((issue) => {
        return (
          <tr onClick={this.goToPage(issue.id)} className="table-row" key={issue.id}>
            {this.mapRowsCell(issue)}
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
}

const mapStateToProps = state => {
  
  return {
    issuesArray: getIssuesArray(state),
    issueTypes: state.ui.issue_types,
    statusTypes: state.ui.status_types,
    priorityTypes: state.ui.priority_types,
    projects: state.projects,
    users: state.users,
  }
}

const mapDispatchToProps = dispatch => {

  return{
    fetchAllUsers: () => dispatch(fetchAllUsers()),
    fetchAllIssues: () => dispatch(fetchAllIssues()),
    showLoading: (props) => dispatch(showLoading(props)),
    hideLoading: () => dispatch(hideLoading()),
    showModal: (component, props, styles) => dispatch(showModal(component, props, styles)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(IssuesTable))

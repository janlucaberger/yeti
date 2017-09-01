import React from 'react';
import { connect } from 'react-redux';
import { getAllIssuesArrayByProject } from "../../reducers/selectors";
import { fetchIssuesAllByProject } from '../../actions/issues/issues_actions';
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
import _ from 'lodash';

class ProjectIssues extends React.Component {
  constructor(){
    super();

    this.state ={
      tableHeaders: [],
      loading: true,
      sort: "created_at"
    }

    this.mapRowsCell = this.mapRowsCell.bind(this)
    this.mappedHeaders = this.mappedHeaders.bind(this)
    this.loadingFinished = this.loadingFinished.bind(this)
    this.createNewIssue = this.createNewIssue.bind(this)
    this.setSort = this.setSort.bind(this)
    this.renderHeaderStyles = this.renderHeaderStyles.bind(this)
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
      this.props.history.push(`/projects/${this.props.projectId}/project_issues/issues/${id}`)
    }
  }

  setSort(val){
    return (e) => {
      this.setState({
        sort: val
      })
    }
  }

  componentDidMount(){
    console.log("Started Loading")
    this.props.showLoading()
    this.props.fetchIssuesAllByProject(this.props.projectId).then(() => {
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
          case "resolution":
            return (
              <td key={idx}>
                <p>{issue[header].split("")[0].toUpperCase()
                  + issue[header].slice(1)}</p>
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
                {this.props.users[issue[header]].first_name}&nbsp;{this.props.users[issue[header]].last_name}
              </td>
            )
          default:
            return null
            // <td key={idx}><Link to={`/issues/${issue.id}`} >{value}</Link></td>
        }
    }, this)
  }

  renderHeaderStyles(header){
    if(this.state.sort === header){
      return "table-header sorted"
    } else {
      return "table-header"
    }
  }


  mappedHeaders(){
    return this.state.tableHeaders.map((header, idx) => {
      switch (header) {
        case "id":
          return null
        case "assigned_user_id":
          return <th onClick={this.setSort("assigned_user_id")} className={this.renderHeaderStyles("assigned_user_id")} key={idx}>Assigned To</th>
        case "status_type_id":
          return <th onClick={this.setSort("status_type_id")} className={this.renderHeaderStyles("status_type_id")} key={idx}>Status</th>
        case "issue_type_id":
          return <th onClick={this.setSort("issue_type_id")} className={this.renderHeaderStyles("issue_type_id")} key={idx}>Issue Type</th>
        case "priority_type_id":
          return <th onClick={this.setSort("priority_type_id")} className={this.renderHeaderStyles("priority_type_id")} key={idx}>Priority</th>
        case "resolution":
          return <th onClick={this.setSort("resolution")} className={this.renderHeaderStyles("resolution")} key={idx}>Resolution</th>
        case "summary":
          return <th onClick={this.setSort("summary")} className={this.renderHeaderStyles("summary")} key={idx}>Summary</th>
        case "created_at":
          return <th onClick={this.setSort("created_at")} className={this.renderHeaderStyles("created_at")} key={idx}>Created</th>
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
    console.log(this.state.sort)
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
      const sortedIssues = _.sortBy(this.props.issuesArray, this.state.sort).reverse()
      const mappedRows = sortedIssues.map((issue) => {
        return (
          <tr onClick={this.goToPage(issue.id)} className="table-row" key={issue.id}>
            {this.mapRowsCell(issue)}
          </tr>
        )
      })

      return(
        <div className="projects-table-container">
          <div className="current-container-title">
            All Issues
          </div>
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
    projectId: ownProps.match.params.id,
    issuesArray: getAllIssuesArrayByProject(state, ownProps.match.params.id),
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
    fetchIssuesAllByProject: projectId => dispatch(fetchIssuesAllByProject(projectId)),
    showLoading: props => dispatch(showLoading(props)),
    hideLoading: () => dispatch(hideLoading()),
    showModal: (component, props, styles) => dispatch(showModal(component, props, styles)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProjectIssues))

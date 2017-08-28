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
  fetchStatusTypes
} from '../../actions/ui_actions'
import TimeAgo from 'react-timeago'
import { Link } from 'react-router-dom'
import UserWidget from '../global/user_widget';

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
  }

  componentWillReceiveProps(nextProps){
    console.log("receiving next props")
    
  }

  componentDidMount(){
    console.log("Started Loading")
    this.props.showLoading()
    this.props.fetchPriorityTypes()
    this.props.fetchStatusTypes()
    this.props.fetchIssueTypes()
    this.props.fetchAllIssues().then(() => {
      this.setState({
        tableHeaders: Object.keys(this.props.issuesArray[0]),
        loading: false
      }, this.loadingFinished)
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

      // if(typeof this.props[issue[header]] === "undefined"){
      //   return <td key={idx}>--</td>
      // } else {
      //   
        switch (header) {
          case "id":
            return <td key={idx}>--</td>
          case "created_at":
            return (
              <td key={idx}>
                <TimeAgo date={issue[header]} />
              </td>
            )
          case "assigned_user_id":
            return(
              <td className="table-user-container" key={idx}>
                <img src={this.props.users[issue[header]].avatar} width="25px" />
                {this.props.users[issue[header]].first_name} {this.props.users[issue[header]].last_name}
                <UserWidget />
              </td>
            )
          default:
            return   <td key={idx}><Link to={`/issues/${issue.id}`} >{value}</Link></td>
        }
      // }
    }, this)
  }

  mappedHeaders(){
    return this.state.tableHeaders.map((header, idx) => {
      switch (header) {
        case "id":
          return <td key={idx}>--</td>
        case "assigned_user_id":
          return <th className="table-header" key={idx}>Assigned To</th>
        case "status_type_id":
          return <th className="table-header" key={idx}>Status</th>
        case "issue_type_id":
          return <th className="table-header" key={idx}>Issue Type</th>
        default:
          return <th className="table-header" key={idx}>{header.split("")[0].toUpperCase() + header.split("").slice(1).join("")}</th>
      }
    })
  }


  render(){

    // const mappedHeaders = this.state.tableHeaders.map((header, idx) => {
    //   return <th className="table-header" key={idx}>{header.split("")[0].toUpperCase() + header.split("").slice(1).join("")}</th>
    // })
    console.log(this.state.loading)
    if (this.state.loading) {
      return <h1>LOADINGGGG</h1>
    } else if (this.props.issuesArray.length === 0){
      return (
        <div>Looks you you dont have any projects yet!</div>
      )
    } else {
      const mappedRows = this.props.issuesArray.map((issue) => {
        return (
          <tr className="table-row" key={issue.id}>
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
    users: state.users,
  }
}

const mapDispatchToProps = dispatch => {

  return{
    fetchAllUsers: () => dispatch(fetchAllUsers()),
    fetchAllIssues: () => dispatch(fetchAllIssues()),
    fetchStatusTypes: () => dispatch(fetchStatusTypes()),
    fetchIssueTypes: () => dispatch(fetchIssueTypes()),
    fetchPriorityTypes: () => dispatch(fetchPriorityTypes()),
    showLoading: (props) => dispatch(showLoading(props)),
    hideLoading: () => dispatch(hideLoading())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IssuesTable)

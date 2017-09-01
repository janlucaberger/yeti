import React from 'react';
import { connect } from 'react-redux';
import { fetchAssignedIssues } from '../../actions/dashboard/analytics';
import { getAssignedIssues } from '../../reducers/selectors';
import { Link } from 'react-router-dom';

class AssignedIssue extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      loading: true
    }

    this.mapIssues = this.mapIssues.bind(this)
    this.loadingComplete = this.loadingComplete.bind(this)
  }

  componentDidMount(){
    this.props.fetchAssignedIssues().then(
      () => this.loadingComplete()
    )
  }

  loadingComplete(){
    this.setState({
      loading: false
    })
  }

  mapIssues(){
    return this.props.issues.map( issue => {
      return (
        <Link to={`/issues/${issue.id}`}>
          <div key={issue.id} className="assigned-issue-container">
            <div className="assigned-issue-summary">{issue.summary}</div>
            <div className="assigned-issue-status">{this.props.statusTypes[issue.status_type_id].status_type}</div>
          </div>
        </Link>
      )
    })
  }

  render(){

    if(this.state.loading){
      return <div>loading</div>
    } else if(Object.values(this.props.issues).length < 1){
      return(
        <div>
          <div className="widget-title">Your Assigned Issues</div>
          <div className="widget-no-content-container">Congrats you have no assigned issues!</div>
        </div>
      )
    } else {
      return(
        <div>
          <div className="widget-title">Your Assigned Issues</div>
          {this.mapIssues()}
        </div>
      )
    }
  }
}

const mapStateToProps = state => {
  return{
    issues: getAssignedIssues(state),
    projects: state.projects,
    statusTypes: state.ui.status_types,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchAssignedIssues: () => dispatch(fetchAssignedIssues())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AssignedIssue)

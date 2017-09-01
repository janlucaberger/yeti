import React from 'react';
import IssuesTable from '../issues/issues_table';
import { connect } from 'react-redux';
import { showModal } from '../../actions/ui_actions';
import NewIssueForm from '../issues/new_issue_form';

class IssuesContainer extends React.Component {
  constructor(){
    super();
    this.createIssueForm = this.createIssueForm.bind(this)
  }

  createIssueForm(){
    this.props.showModal(NewIssueForm)
  }

  render(){
    return(
      <div className="content-inner-container">
        <div className="current-container-title">
          Issues
          <button className="primary-button gray" onClick={this.createIssueForm}>Create new Issue</button>
        </div>
        <IssuesTable />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return{
    showModal: (component, props) => dispatch(showModal(component, props)),
  }
}

export default connect(null, mapDispatchToProps)(IssuesContainer)

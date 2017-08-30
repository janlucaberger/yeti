import React from 'react';
import IssuesTable from '../issues/issues_table';


class IssuesContainer extends React.Component {
  constructor(){
    super();
  }

  render(){
    return(
      <div className="content-inner-container">
        <div className="current-container-title">
          Issues
          <button className="primary-button gray" onClick={this.createProjectForm}>Create new Project</button>
        </div>
        <IssuesTable />
      </div>
    )
  }
}

export default IssuesContainer

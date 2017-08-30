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
        </div>
        <IssuesTable />
      </div>
    )
  }
}

export default IssuesContainer

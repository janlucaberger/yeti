import React from 'react';


const IssueStatus = ({status}) => {
  const statusBackground = (id) => {
    switch (id) {
      case 1:
        return "status-label-text todo"
      case 2:
        return "status-label-text inProgress"
      case 3:
        return "status-label-text done"
      default:
        return "status-label-text todo"
    }
  }

  if(status){
    return(
      <div className="status-label-container">
        <div className="form-input-title">Status</div>
        <span className={statusBackground(status.id)}>{status.status_type}</span>
      </div>
    )
  } else {
    return <div></div>
  }

}

export default IssueStatus

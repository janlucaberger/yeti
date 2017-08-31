import React from 'react';


const IssueStatus = ({status}) => {
  const statusBackground = (status) => {
    switch (status.status_type) {
      case "Todo":
        return "status-label-text todo"
      case "In Progress":
        return "status-label-text inProgress"
      case "Done":
        return "status-label-text done"
      default:
        return "status-label-text todo"
    }
  }

  if(status){
    return(
      <div className="status-label-container">
        <div className="form-input-title">Status</div>
        <span className={statusBackground(status)}>{status.status_type}</span>
      </div>
    )
  } else {
    return <div></div>
  }

}

export default IssueStatus

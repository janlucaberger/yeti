export const getTeamsArray = state => {
  return Object.values(state.teams);
}

export const getProjectsArray = state => {
  return Object.values(state.projects)
}

export const getIssueTypesArray = state => {
  return Object.values(state.ui.issue_types)
}

export const getAttachments = (state, issue_id) => {

  return Object.values(state.attachments).filter(
    (attachment) => attachment.issue_id === issue_id)
}

export const getIssueHistory = (state, issue_id) => {
  let issueHistory = [];

  for (let key in state.issues_history) {
    if (state.issues_history[key].issue_id == issue_id) {
      issueHistory.push(state.issues_history[key])
    }
  }

  return issueHistory
}


export const getUserInfo = (state, user_id) => {
  return state.users[user_id]
}

export const getIssuesByStatus = (state, projectId) => {
  const issuesByStatus = {}
    Object.values(state.issues).forEach(issue => {
      if(typeof issuesByStatus[issue.status_type_id] === "undefined"
        && issue.project_id == projectId){
        issuesByStatus[issue.status_type_id] = [issue]
      } else if (issue.project_id == projectId){
        issuesByStatus[issue.status_type_id] = issuesByStatus[issue.status_type_id].concat(issue)
      }
    })
  return issuesByStatus
}



export const getIssuesArray = state => {
  return Object.values(state.issues)
}

export const getIssuesBySprintStatus = (state, projectId) =>{
  let sprintStatus = {
    active: [],
    inactive: []
  }
  Object.values(state.issues).forEach( issue => {
    if(issue.project_id == projectId){
      if(issue.sprint){
        sprintStatus["active"] = sprintStatus["active"].concat(issue)
      } else {
        sprintStatus["inactive"] = sprintStatus["inactive"].concat(issue)
      }
    }
  })
  return sprintStatus
}

export const getActiveSprintIssuesByStatus = (state, projectId) => {
  if(Object.values(state.issues).length > 0){

    const issues = {}
    const filterByActive = getIssuesBySprintStatus(state, projectId).active
    filterByActive.forEach(issue => issues[issue.id] = issue)
    const filteredByStatus = getIssuesByStatus({issues}, projectId)
    return filteredByStatus
  }
  return {}
}

export const getSprintByProject = (state, projectId) => {
  let sprint = null;
  for(let key in state.sprints) {
    if(state.sprints[key].project_id == projectId){
      sprint = state.sprints[key]
    }
  }

  return sprint
}


export const getSprint = (state, projectId) => {
  let sprint = null;
  for(let key in state.sprints){

    if(state.sprints[key].project_id == projectId){
      sprint = state.sprints[key]
    }
  }

  return sprint
}

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

export const getTeamsArray = state => {
  return Object.values(state.teams);
}

export const getProjectsArray = state => {
  return Object.values(state.projects)
}

export const getIssueTypesArray = state => {
  return Object.values(state.ui.issue_types)
}

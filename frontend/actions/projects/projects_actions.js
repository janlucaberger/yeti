import * as ApiUtil from '../../util/projects_api'

export const RECEIVE_ALL_PROJECTS = "RECEIVE_ALL_PROJECTS";
export const RECEIVE_PROJECT = "RECEIVE_PROJECT";
export const RECEIVE_PROJECT_ERROR = "RECEIVE_PROJECT_ERROR";


export const receiveAllProjects = projects => {
  return{
    type: RECEIVE_ALL_PROJECTS,
    projects
  }
}
export const receiveProject = project => {
  return{
    type: RECEIVE_PROJECT,
    project
  }
}
export const receiveProjectError = error => {
  return{
    type: RECEIVE_PROJECT_ERROR,
    error
  }
}


export const fetchAllProjects = () => dispatch => {
  return ApiUtil.fetchAllProjects().then((projects) => {
    dispatch(receiveAllProjects(projects))
  })
}
export const fetchProject = id => dispatch => {
  return ApiUtil.fetchProject(id).then((project) => {
    dispatch(receiveProject(project))
  })
}

export const createNewProject = project => dispatch => {

  return ApiUtil.createNewProject(project).then(
    newProject => { dispatch(receiveProject(newProject)) },
    err => { dispatch(receiveProjectError(err.responseJSON))}
  )
}

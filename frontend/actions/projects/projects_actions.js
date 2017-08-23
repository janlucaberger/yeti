import * as ApiUtil from '../../util/projects_api'

export const RECEIVE_ALL_PROJECTS = "RECEIVE_ALL_PROJECTS";
export const RECEIVE_PROJECT = "RECEIVE_PROJECT";


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


export const fetchAllProjects = () => dispatch => {
  return ApiUtil.fetchAllProjects().then((projects) => {
    dispatch(receiveAllProjects(projects))
  })
}

export const createNewProject = (project) => dispatch => {
  return ApiUtil.createNewProject(project).then((newProject) => {
    dispatch(receiveProject(newProject))
  })
}

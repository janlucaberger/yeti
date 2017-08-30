

export const fetchSprint = projectId => {

  return $.ajax({
    method: "GET",
    url: `/api/projects/${projectId}/sprint`
  })
}

export const createSprint = sprint => {
  return $.ajax({
    method: "POST",
    url: `/api/projects/${sprint.project_id}/sprint`,
    data: { sprint }
  })
}

export const completeSprint = sprint => {
  return $.ajax({
    method: "POST",
    url: `/api/projects/${sprint.project_id}/complete_sprint`,
    data: {sprint}
  })
}

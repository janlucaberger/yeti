

export const fetchAllProjects = () => {
  return $.ajax({
    method: "GET",
    url: "/api/projects"
  })
}

export const createNewProject = formData => {
  return $.ajax({
    method: "POST",
    url: "/api/projects",
    processData: false,
    contentType: false,
    dataType: 'json',
    data: formData
  })
}

export const fetchProject = id => {
  return $.ajax({
    method: "GET",
    url: `/api/projects/${id}`
  })
}

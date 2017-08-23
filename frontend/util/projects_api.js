

export const fetchAllProjects = () => {
  return $.ajax({
    method: "GET",
    url: "/api/projects"
  })
}

export const createNewProject = () => {
  return $.ajax({
    method: "POST",
    url: "/api/projects"
  })
}

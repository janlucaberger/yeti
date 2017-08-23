
export const fetchEmailCheck = email => {
  return $.ajax({
    method: "GET",
    url: "/api/users",
    data: { query: email }
  })
}

export const createUser = user => {
  return $.ajax({
    method: "POST",
    url: "/api/users",
    data: { user }
  })
}

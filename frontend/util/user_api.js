
export const fetchEmailCheck = email => {
  console.log(`fetching user with email ${email}`)
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

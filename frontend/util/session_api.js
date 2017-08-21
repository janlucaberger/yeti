

export const login = (user) => {
  return $.ajax({
    url: '/api/sessions',
    method: 'POST',
    data: { user }
  })
}

export const logout = () => {
  return $.ajax({
    url: '/api/sessions',
    method: 'DELETE'
  })
}

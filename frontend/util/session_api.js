

export const login = (user) => {
  return $.ajax({
    url: '/api/sessions',
    method: 'POST',
    data: { user }
  })
}

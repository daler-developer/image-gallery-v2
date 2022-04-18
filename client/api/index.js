import client from './client'

export const register = async (username, password) => {
  return client.post('/api/users/register', { username, password })
}

export const login = async (username, password) => {
  return client.post('/api/users/login', { username, password })
}

export const getCurrentUser = async () => {
  return client.get('/api/users/current')
}

export const getUsers = async ({ excludeCurrentUser = true, limit = 10, offset = 0 } = {}) => {
  return client.get(`/api/users?offset=${offset}&limit=${limit}&excludeCurrentUser=${excludeCurrentUser ? 'yes' : 'no'}`)
}

import client from './client'

export const register = async ({ username, password }) => {
  return client.post('/api/users/register', { username, password })
}

export const login = async ({ username, password }) => {
  return client.post('/api/users/login', { username, password })
}

export const getCurrentUser = async () => {
  return client.get('/api/users/current')
}

export const getUsers = async ({ offset = 0 } = {}) => {
  return client.get(`/api/users?offset=${offset}`)
}

export const getUser = async ({ _id } = {}) => {
  return client.get(`/api/users/${_id}`)
}

export const followUser = async ({ _id } = {}) => {
  return client.patch(`/api/users/${_id}/follow`)
}

export const unfollowUser = async ({ _id } = {}) => {
  return client.patch(`/api/users/${_id}/unfollow`)
}

export const updateProfile = async ({ _id, form } = {}) => {
  return client.patch(`/api/users/${_id}`, form)
}

export const fetchPosts = async ({ offset = 0 } = {}) => {
  return client.get(`/api/posts?offset=${offset}`)
}

export const createPost = async ({ form } = {}) => {
  return client.post(`/api/posts`, form)
}

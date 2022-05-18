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

export const getUsers = async ({ offset, excludeCurrent, postLikedId } = {}) => {
  const data = {}

  if (offset !== undefined) {
    data.offset = offset
  }
  if (excludeCurrent === true) {
    data.excludeCurrent = 'yes'
  } 
  if (excludeCurrent === false) {
    data.excludeCurrent = 'no'
  }
  if (postLikedId) {
    data.postLikedId = postLikedId
  }

  const searchParams = new URLSearchParams(data)
  
  return client.get(`/api/users?${searchParams.toString()}`)
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

export const searchPosts = async ({ searchQuery }) => {
  return client.get(`/api/posts/search?query=${searchQuery}`)
}

export const createPost = async ({ form } = {}) => {
  return client.post(`/api/posts`, form)
}

export const likePost = async ({ postId }) => {
  return client.patch(`/api/posts/${postId}/like`)
}

export const removeLikeFromPost = async ({ postId }) => {
  return client.patch(`/api/posts/${postId}/remove-like`)
}

export const deletePost = async ({ postId }) => {
  return client.delete(`/api/posts/${postId}`)
}

export const getComments = async ({ postId, offset } = {}) => {
  return client.get(`/api/posts/${postId}/comments${offset ? `&offset=${offset}` : ''}`)
}

export const createComment = async ({ postId, text }) => {
  return client.post(`/api/posts/${postId}/comments`, { text })
}

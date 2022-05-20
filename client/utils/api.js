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

export const getUsers = async ({ offset, postLikedId } = {}) => {
  const searchParams = new URLSearchParams({})

  if (offset !== undefined) {
    searchParams.append('offset', offset)
  }

  if (postLikedId !== undefined) {
    searchParams.append('postLikedId', postLikedId)
  } 
  
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

export const getPosts = async ({ offset = 0, creatorId } = {}) => {
  const searchParams = new URLSearchParams({})

  if (offset !== undefined) {
    searchParams.append('offset', offset)
  }

  if (creatorId) {
    searchParams.append('creatorId', creatorId)
  }

  return client.get(`/api/posts?${searchParams.toString()}`)
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

export const getComments = async ({ postId, offset }) => {
  const searchParams = new URLSearchParams()

  if (offset !== undefined) {
    searchParams.append('offset', offset)
  }

  return client.get(`/api/posts/${postId}/comments?${searchParams.toString()}`)
}

export const createComment = async ({ postId, text }) => {
  return client.post(`/api/posts/${postId}/comments`, { text })
}

export const deleteComment = async ({ postId, commentId }) => {
  return client.delete(`/api/posts/${postId}/comments/${commentId}`)
}

export const getFollowers = async ({ userId, offset }) => {
  const searchParams = new URLSearchParams()

  if (offset !== undefined) {
    searchParams.append('offset', offset)
  }

  return client.get(`/api/users/${userId}/followers?${searchParams}`)
}

export const getFollowings = async ({ userId, offset }) => {
  const searchParams = new URLSearchParams()

  if (offset !== undefined) {
    searchParams.append('offset', offset)
  }

  return client.get(`/api/users/${userId}/followings?${searchParams.toString()}`)
}

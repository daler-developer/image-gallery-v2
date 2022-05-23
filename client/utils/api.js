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
  return client.get('/api/users', {
    params: {
      offset,
      postLikedId
    }
  })
}

export const getUser = async ({ _id }) => {
  return client.get(`/api/users/${_id}`)
}

export const followUser = async ({ _id }) => {
  return client.patch(`/api/users/${_id}/follow`)
}

export const unfollowUser = async ({ _id }) => {
  return client.patch(`/api/users/${_id}/unfollow`)
}

export const updateProfile = async ({ _id, form } = {}) => {
  return client.patch(`/api/users/${_id}`, form)
}

export const getPosts = async ({ offset, creatorId } = {}) => {
  return client.get('/api/posts', {
    params: {
      offset,
      creatorId
    }
  })
}

export const searchPosts = async ({ searchQuery }) => {
  return client.get(`/api/posts/search?query=${searchQuery}`)
}

export const createPost = async ({ form }) => {
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
  return client.get(`/api/posts/${postId}/comments`, {
    params: {
      offset
    }
  })
}

export const createComment = async ({ postId, text }) => {
  return client.post(`/api/posts/${postId}/comments`, { text })
}

export const deleteComment = async ({ postId, commentId }) => {
  return client.delete(`/api/posts/${postId}/comments/${commentId}`)
}

export const updateComment = async ({ commentId, text }) => {
  return client.patch(`/api/comments/${commentId}`, { text })
}

export const getFollowers = async ({ userId, offset }) => {
  return client.get(`/api/users/${userId}/followers`, {
    params: {
      offset
    }
  })
}

export const getFollowings = async ({ userId, offset }) => {
  return client.get(`/api/users/${userId}/followings`, {
    params: {
      offset
    }
  })
}

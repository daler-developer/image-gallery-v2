import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as api from '../../utils/api'

const fetchedFeedPosts = createAsyncThunk('posts/fetched-feed-posts', async ({ offset } = {}, thunkAPI) => {
  try {
    const { data } = await api.getPosts({ offset })

    return data
  } catch (e) {
    return thunkAPI.rejectWithValue({ errorType: e.response.data.errorType })
  }
})

const fetchedProfilePosts = createAsyncThunk('posts/fetched-profile-posts', async ({ creatorId, offset }, thunkAPI) => {
  try {
    const { data } = await api.getPosts({ creatorId, offset })

    return data
  } catch (e) {
    return thunkAPI.rejectWithValue({ errorType: e.response.data.errorType })
  }
})

const searchedFeedPosts = createAsyncThunk('posts/searched-feed-posts', async ({ searchQuery }, thunkAPI) => {
  try {
    const { data } = await api.searchPosts({ searchQuery })

    return { posts: data.posts }
  } catch (e) {
    return thunkAPI.rejectWithValue({ errorType: e.response.data.errorType })
  }
})

const postCreated = createAsyncThunk('posts/post-created', async ({ image, text }, thunkAPI) => {
  try {
    const form = new FormData()

    form.append('image', image, image.filename)
    form.append('text', text)

    const { data } = await api.createPost({ form })

    return data
  } catch (e) {
    return thunkAPI.rejectWithValue({ errorType: e.response.data.errorType })
  }
})

const commentCreated = createAsyncThunk('posts/comment-created', async ({ postId, text }, thunkAPI) => {
  try {
    const { data } = await api.createComment({ postId, text })

    return { postId, comment: data.comment }
  } catch (e) {
    return thunkAPI.rejectWithValue({ errorType: e.response.data.errorType })
  }
})

const commentsFetched = createAsyncThunk('posts/comments-fetched', async ({ postId }, thunkAPI) => {
  try {
    const { data } = await api.getComments({ postId })

    return { postId, comments: data.comments }
  } catch (e) {
    return thunkAPI.rejectWithValue({ errorType: e.response.data.errorType })
  }
})

const commentDeleted = createAsyncThunk('posts/comment-deleted', async ({ postId, commentId }, thunkAPI) => {
  try {
    await api.deleteComment({ postId, commentId })

    return { postId, commentId }
  } catch (e) {
    return thunkAPI.rejectWithValue({ errorType: e.response.data.errorType })
  }
})

const commentUpdated = createAsyncThunk('posts/post-updated', async ({ commentId, text }, thunkAPI) => {
  try {
    const { data } = await api.updateComment({ commentId, text })

    return { comment: data.comment }
  } catch (e) {
    return thunkAPI.rejectWithValue({ errorType: e.response.data.errorType })
  }
})

const postLiked = createAsyncThunk('posts/post-liked', async ({ postId }, thunkAPI) => {
  try {
    await api.likePost({ postId })

    return { postId }
  } catch (e) {
    return thunkAPI.rejectWithValue({ errorType: e.response.data.errorType })
  }
})

const postLikeRemoved = createAsyncThunk('posts/post-like-removed', async ({ postId }, thunkAPI) => {
  try {
    await api.removeLikeFromPost({ postId })

    return { postId }
  } catch (e) {
    return thunkAPI.rejectWithValue({ errorType: e.response.data.errorType })
  }
})

const postDeleted = createAsyncThunk('posts/post-deleted', async ({ postId }, thunkAPI) => {
  try {
    await api.deletePost({ postId })

    return { postId }
  } catch (e) {
    return thunkAPI.rejectWithValue({ errorType: e.response.data.errorType })
  }
})

const initialState = {
  feed: {
    list: [],
    isFetching: false,
    errorType: null
  },
  profile: {
    list: [],
    isFetching: false,
    errorType: null
  }
}

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {

  },
  extraReducers(builder) {
    builder

      .addCase(fetchedFeedPosts.pending, (state, { payload }) => {
        state.feed.isFetching = true
        state.feed.errorType = null
      })
      .addCase(fetchedFeedPosts.fulfilled, (state, { payload }) => {
        state.feed.list = state.feed.list.concat(payload.posts)
        state.feed.isFetching = false
        state.feed.errorType = null
      })
      .addCase(fetchedFeedPosts.rejected, (state, { payload }) => {
        state.feed.isFetching = false
        state.feed.errorType = payload.errorType
      })

      .addCase(fetchedProfilePosts.pending, (state, { payload }) => {
        state.profile.isFetching = true
        state.profile.errorType = null
      })
      .addCase(fetchedProfilePosts.fulfilled, (state, { payload }) => {
        state.profile.list = state.profile.list.concat(payload.posts)
        state.profile.isFetching = false
        state.profile.errorType = null
      })
      .addCase(fetchedProfilePosts.rejected, (state, { payload }) => {
        state.profile.isFetching = false
        state.profile.errorType = payload.errorType
      })

      .addCase(commentCreated.fulfilled, (state, { payload }) => {
        const feedPost = state.feed.list.find((post) => post._id === payload.postId)
        const profilePost = state.profile.list.find((post) => post._id === payload.postId)

        if (feedPost) {
          feedPost.numComments++
        }
        if (profilePost) {
          profilePost.numComments++
        }
      })


      .addCase(commentDeleted.fulfilled, (state, { payload }) => {
        const feedPost = state.feed.list.find((post) => post._id === payload.postId)
        const profilePost = state.profile.list.find((post) => post._id === payload.postId)

        if (feedPost) {
          feedPost.numComments--
        }
        if (profilePost) {
          profilePost.numComments--
        }
      })

      .addCase(postLiked.fulfilled, (state, { payload }) => {
        const feedPost = state.feed.list.find((post) => post._id === payload.postId)
        const profilePost = state.profile.list.find((post) => post._id === payload.postId)

        if (feedPost) {
          feedPost.numLikes++
          feedPost.likedByCurrentUser = true
        }
        if (profilePost) {
          profilePost.numLikes++
          profilePost.likedByCurrentUser = true
        }
      })

      .addCase(postLikeRemoved.fulfilled, (state, { payload }) => {
        const feedPost = state.feed.list.find((post) => post._id === payload.postId)
        const profilePost = state.profile.list.find((post) => post._id === payload.postId)

        if (feedPost) {
          feedPost.numLikes--
          feedPost.likedByCurrentUser = false
        }
        if (profilePost) {
          profilePost.numLikes--
          profilePost.likedByCurrentUser = false
        }
      })

      .addCase(postDeleted.fulfilled, (state, { payload }) => {
        state.feed.list.splice(
          state.feed.list.findIndex((post) => post._id === payload.postId),
          1
        )
        state.profile.list.splice(
          state.profile.list.findIndex((post) => post._id === payload.postId),
          1
        )
      })
  }
})

export const selectFeedPosts = (state) => {
  return state.posts.feed
}

export const selectProfilePosts = (state) => {
  return state.posts.profile
}

export const postsActions = {
  ...postsSlice.actions,
  fetchedFeedPosts,
  fetchedProfilePosts,
  postCreated,
  postLiked,
  postLikeRemoved,
  commentCreated,
  commentsFetched,
  postDeleted,
  searchedFeedPosts,
  commentDeleted,
  commentUpdated
}

export default postsSlice.reducer

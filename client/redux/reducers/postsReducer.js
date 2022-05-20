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

const searchedFeedPosts = createAsyncThunk('posts/searched-feed-posts', async ({ searchQuery }) => {
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

const commentCreated = createAsyncThunk('posts/comment-created', async ({ postId, text }) => {
  try {
    const { data } = await api.createComment({ postId, text })

    return { postId, comment: data.comment }
  } catch (e) {
    return thunkAPI.rejectWithValue({ errorType: e.response.data.errorType })
  }
})

const commentsFetched = createAsyncThunk('posts/comments-fetched', async ({ postId }) => {
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

const postLiked = createAsyncThunk('posts/post-liked', async ({ postId }) => {
  try {
    await api.likePost({ postId })

    return { postId }
  } catch (e) {
    return thunkAPI.rejectWithValue({ errorType: e.response.data.errorType })
  }
})

const postLikeRemoved = createAsyncThunk('posts/post-like-removed', async ({ postId }) => {
  try {
    await api.removeLikeFromPost({ postId })

    return { postId }
  } catch (e) {
    return thunkAPI.rejectWithValue({ errorType: e.response.data.errorType })
  }
})

const postDeleted = createAsyncThunk('posts/post-deleted', async ({ postId }) => {
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
    status: 'idle',
    errorType: null
  },
  
}

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {

  },
  extraReducers(builder) {
    builder

      .addCase(fetchedFeedPosts.pending, (state, { payload }) => {
        state.feed.status = 'fetching'
        state.feed.errorType = null
      })
      .addCase(fetchedFeedPosts.fulfilled, (state, { payload }) => {
        state.feed.list = state.feed.list.concat(payload.posts)
        state.feed.status = 'success'
        state.feed.errorType = null
      })
      .addCase(fetchedFeedPosts.rejected, (state, { payload }) => {
        state.feed.status = 'error'
        state.feed.errorType = payload.errorType
      })

      .addCase(postCreated.fulfilled, (state, { payload }) => {
      })

      .addCase(commentCreated.fulfilled, (state, { payload }) => {
        const post = [...state.feed.list].find((post) => post._id === payload.postId)

        if (post) {
          post.numComments++
        }
      })


      .addCase(commentDeleted.fulfilled, (state, { payload }) => {
        const post = state.feed.list.find((post) => post._id === payload.postId)

        if (post) {
          post.numComments--
        }
      })

      .addCase(postLiked.fulfilled, (state, { payload }) => {
        const post = state.feed.list.find((post) => post._id === payload.postId)

        if (post) {
          post.numLikes++
          post.likedByCurrentUser = true
        }
      })

      .addCase(postLikeRemoved.fulfilled, (state, { payload }) => {
        const post = state.feed.list.find((post) => post._id === payload.postId)

        if (post) {
          post.numLikes--
          post.likedByCurrentUser = false
        }
      })

      .addCase(postDeleted.fulfilled, (state, { payload }) => {
        state.feed.list.splice(
          state.feed.list.findIndex((post) => post._id === payload.postId),
          1
        )
      })
  }
})

export const selectFeedPosts = (state) => {
  return state.posts.feed.list
}

export const selectFeedPostsFetchingStatus = (state) => {
  return state.posts.feed.status
}

export const selectFeedPostsErrorType = (state) => {
  return state.posts.feed.errorType
}

export const postsActions = {
  ...postsSlice.actions,
  fetchedFeedPosts,
  postCreated,
  postLiked,
  postLikeRemoved,
  commentCreated,
  commentsFetched,
  postDeleted,
  searchedFeedPosts,
  commentDeleted
}

export default postsSlice.reducer

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as api from '../../utils/api'

const fetchedFeedPosts = createAsyncThunk('posts/fetched-feed-posts', async () => {
  try {
    const { data } = await api.fetchPosts()

    return data
  } catch (e) {
    return thunkAPI.rejectWithValue({ errorType: e.response.data.errorType })
  }
})

const created = createAsyncThunk('posts/created', async ({ image }, thunkAPI) => {
  try {
    const form = new FormData()

    form.append('image', image, image.filename)

    const { data } = await api.createPost({ form })

    return data
  } catch (e) {
    return thunkAPI.rejectWithValue({ errorType: e.response.data.errorType })
  }
})

const initialState = {
  feed: {
    list: [],
    status: 'idle',
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
        state.feed.status = 'fetching'
        state.feed.errorType = null
      })
      .addCase(fetchedFeedPosts.fulfilled, (state, { payload }) => {
        state.feed.list = payload.posts
        state.feed.status = 'success'
        state.feed.errorType = null
      })
      .addCase(fetchedFeedPosts.rejected, (state, { payload }) => {
        state.feed.status = 'error'
        state.feed.errorType = payload.errorType
      })

      .addCase(created.pending, (state, { payload }) => {

      })
      .addCase(created.fulfilled, (state, { payload }) => {
        state.feed.list.push(payload.post)
      })
      .addCase(created.rejected, (state, { payload }) => {

      })

  }
})

export const selectFeedPosts = (state) => {
  return state.posts.feed.list
}

export const selectFeedPostsFetchingStatus = (state) => {
  return state.posts.feed.status
}

export const postsActions = {
  ...postsSlice.actions,
  fetchedFeedPosts,
  created
}

export default postsSlice.reducer

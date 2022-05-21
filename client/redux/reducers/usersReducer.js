import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import * as api from '../../utils/api'

const fetchedUsers = createAsyncThunk('users/fetched', async ({ offset } = {}, thunkAPI) => {
  try {
    const { data } = await api.getUsers({ offset })

    return data
  } catch (e) {
    return thunkAPI.rejectWithValue({ errorType: e.response.data.errorType })
  }
})

const fetchedUsersWhoLikedPost = createAsyncThunk('users/fetched-users-who-liked-post', async ({ postId, offset }, thunkAPI) => {
  try {
    const { data } = await api.getUsers({ postLikedId: postId, offset })

    return data
  } catch (e) {
    return thunkAPI.rejectWithValue({ errorType: e.response.data.errorType })
  }
})

const followedUser = createAsyncThunk('users/followed-user', async ({ userId }, thunkAPI) => {
  try {
    await api.followUser({ _id: userId })

    return { userId }
  } catch (e) {
    return thunkAPI.rejectWithValue({ errorType: e.response.data.errorType })
  }
})

const unfollowedUser = createAsyncThunk('users/unfollowed-user', async ({ userId }, thunkAPI) => {
  try {
    await api.unfollowUser({ _id: userId })

    return { userId }
  } catch (e) {
    return thunkAPI.rejectWithValue({ errorType: e.response.data.errorType })
  }
})

const initialState = {
  list: [],
  status: 'idle', // 'idle', 'fetching', 'success', 'error'
  errorType: null
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {

  },
  extraReducers(builder) {
    builder
      .addCase(fetchedUsers.pending, (state, { paylaod }) => {
        state.status = 'fetching'
        state.errorType = null
      })
      .addCase(fetchedUsers.fulfilled, (state, { payload }) => {
        state.list = state.list.concat(payload.users)
        state.status = 'success'
        state.errorType = null
      })
      .addCase(fetchedUsers.rejected, (state, { paylaod }) => {
        state.status = 'error'
        state.errorType = paylaod.errorType
      })
      .addCase(followedUser.fulfilled, (state, { payload }) => {
        const user = state.list.find((user) => user._id === payload.userId)

        if (user) {
          user.currentUserFollows = true
        }
      })
      .addCase(unfollowedUser.fulfilled, (state, { payload }) => {
        const user = state.list.find((user) => user._id === payload.userId)

        if (user) {
          user.currentUserFollows = false
        }
      })
  }
})

export const usersActions = {
  ...usersSlice.actions,
  fetchedUsers,
  fetchedUsersWhoLikedPost,
  followedUser,
  unfollowedUser
}

export const selectUsers = (state) => {
  return state.users.list
}

export const selectUsersFetchingStatus = (state) => {
  return state.users.status
}

export const selectUsersErrorType = (state) => {
  return state.users.errorType
}

const usersReducer = usersSlice.reducer

export default usersReducer

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import * as api from '../../utils/api'

const fetched = createAsyncThunk('users/fetch', async ({ offset } = {}, thunkAPI) => {
  try {
    const { data } = await api.getUsers({ offset })

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
      .addCase(fetched.pending, (state, { paylaod }) => {
        state.status = 'fetching'
        state.errorType = null
      })
      .addCase(fetched.fulfilled, (state, { payload }) => {
        state.list = state.list.concat(payload.users)
        state.status = 'success'
        state.errorType = null
      })
      .addCase(fetched.rejected, (state, { paylaod }) => {
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
  fetched,
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
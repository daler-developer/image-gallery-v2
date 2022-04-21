import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import * as api from '../../utils/api'

const fetch = createAsyncThunk('users/fetch', async ({ offset } = {}, thunkAPI) => {
  try {
    const { data } = await api.getUsers({ offset })

    return data
  } catch (e) {
    return thunkAPI.rejectWithValue({ errorType: e.response.data.errorType })
  }
})

const follow = createAsyncThunk('users/follow', async ({ userId }, thunkAPI) => {
  try {
    const { data } = await api.followUser({ _id: userId })

    return data
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
      .addCase(fetch.pending, (state, { paylaod }) => {
        state.status = 'fetching'
        state.errorType = null
      })
      .addCase(fetch.fulfilled, (state, { payload }) => {
        state.list = state.list.concat(payload.users)
        state.status = 'success'
        state.errorType = null
      })
      .addCase(fetch.rejected, (state, { paylaod }) => {
        state.status = 'error'
        state.errorType = paylaod.errorType
      })
  }
})

export const usersActions = {
  ...usersSlice.actions,
  fetch,
  follow
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

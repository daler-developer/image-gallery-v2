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

const fetchedProfileUser = createAsyncThunk('users/fetched-profile-user', async ({ userId }, thunkAPI) => {
  try {
    const { data } = await api.getUser({ _id: userId })

    return data
  } catch (e) {
    return thunkAPI.rejectWithValue({ errorType: e.response.data.errorType })
  }
})

const fetchedProfileFollowers = createAsyncThunk('users/fetched-profile-followers', async ({ userId, offset }, thunkAPI) => {
  try {
    const { data } = await api.getFollowers({ userId, offset })

    return data
  } catch (e) {
    return thunkAPI.rejectWithValue({ errorType: e.response.data.errorType })
  }
})

const fetchedProfileFollowings = createAsyncThunk('users/fetched-profile-followings', async ({ userId, offset }, thunkAPI) => {
  try {
    const { data } = await api.getFollowings({ userId, offset })

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
  feed: {
    list: [],
    isFetching: false,
    errorType: null
  },
  profile: {
    user: {
      data: null,
      isFetching: false,
      errorType: null
    },
    followers: {
      list: [],
      isFetching: false,
      errorType: null
    },
    followings: {
      list: [],
      isFetching: false,
      errorType: null
    }
  }
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    resetProfile(state) {
      state.profile = {
        user: {
          data: null,
          isFetching: false,
          errorType: null
        },
        followers: {
          list: [],
          isFetching: false,
          errorType: null
        },
        followings: {
          list: [],
          isFetching: false,
          errorType: null
        }
      }
    }
  },
  extraReducers(builder) {
    builder

      .addCase(fetchedProfileUser.pending, (state, { payload }) => {
        state.profile.user.isFetching = true
        state.profile.user.errorType = null
      })
      .addCase(fetchedProfileUser.fulfilled, (state, { payload }) => {
        state.profile.user.isFetching = false
        state.profile.user.data = payload.user
      })
      .addCase(fetchedProfileUser.rejected, (state, { payload }) => {
        state.profile.user.isFetching = false
        state.profile.user.errorType = payload.errorType
      })

      .addCase(fetchedUsers.pending, (state, { payload }) => {
        state.feed.isFetching = true
        state.feed.errorType = null
      })
      .addCase(fetchedUsers.fulfilled, (state, { payload }) => {
        state.feed.list = state.feed.list.concat(payload.users)
        state.feed.isFetching = false
      })
      .addCase(fetchedUsers.rejected, (state, { payload }) => {
        state.feed.errorType = payload.errorType
      })
      
      .addCase(fetchedProfileFollowers.pending, (state, { payload }) => {
        state.profile.followers.isFetching = true
        state.profile.followers.errorType = null
      })
      .addCase(fetchedProfileFollowers.fulfilled, (state, { payload }) => {
        state.profile.followers.list = state.profile.followers.list.concat(payload.followers)
        state.profile.followers.isFetching = false
      })
      .addCase(fetchedProfileFollowers.rejected, (state, { payload }) => {
        state.profile.followers.errorType = payload.errorType
      })

      .addCase(fetchedProfileFollowings.pending, (state, { payload }) => {
        state.profile.followings.isFetching = true
        state.profile.followings.errorType = null
      })
      .addCase(fetchedProfileFollowings.fulfilled, (state, { payload }) => {
        state.profile.followings.list = state.profile.followings.list.concat(payload.followings)
        state.profile.followings.isFetching = false
      })
      .addCase(fetchedProfileFollowings.rejected, (state, { payload }) => {
        state.profile.followings.errorType = payload.errorType
      })

      .addCase(followedUser.fulfilled, (state, { payload }) => {
        const feedUser = state.feed.list.find((user) => user._id === payload.userId)
        const followerUser = state.profile.followers.list.find((user) => user._id === payload.userId)
        const followingUser = state.profile.followings.list.find((user) => user._id === payload.userId)

        if (feedUser) {
          feedUser.currentUserFollows = true
        }
        if (followerUser) {
          followerUser.currentUserFollows = true
        }
        if (followingUser) {
          followingUser.currentUserFollows = true
        }
      })
      .addCase(unfollowedUser.fulfilled, (state, { payload }) => {
        const feedUser = state.feed.list.find((user) => user._id === payload.userId)
        const followerUser = state.profile.followers.list.find((user) => user._id === payload.userId)
        const followingUser = state.profile.followings.list.find((user) => user._id === payload.userId)

        if (feedUser) {
          feedUser.currentUserFollows = false
        }
        if (followerUser) {
          followerUser.currentUserFollows = false
        }
        if (followingUser) {
          followingUser.currentUserFollows = false
        }
      })
  }
})

export const usersActions = {
  ...usersSlice.actions,
  fetchedUsers,
  fetchedProfileUser,
  fetchedProfileFollowers,
  fetchedProfileFollowings,
  fetchedUsersWhoLikedPost,
  followedUser,
  unfollowedUser
}

export const selectFeedUsers = (state) => {
  return state.users.feed
}

export const selectProfileUser = (state) => {
  return state.users.profile.user
}

export const selectProfileFollowers = (state) => {
  return state.users.profile.followers
}

export const selectProfileFollowings = (state) => {
  return state.users.profile.followings
}

const usersReducer = usersSlice.reducer

export default usersReducer

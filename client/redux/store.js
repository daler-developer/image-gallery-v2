import { configureStore } from '@reduxjs/toolkit'
import authReducer from './reducers/authReducer'
import postsReducer from './reducers/postsReducer'
import uiReducer from './reducers/uiReducer'
import usersReducer from './reducers/usersReducer'

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    ui: uiReducer,
    posts: postsReducer
  }
})

export default store

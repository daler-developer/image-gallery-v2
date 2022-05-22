import { createSlice } from '@reduxjs/toolkit'
import { postsActions } from '../reducers/postsReducer'
import { usersActions } from '../reducers/usersReducer'
import generateErrorMessage from '../../utils/generateErrorMessage'

const initialState = {
  activeModal: null,
  idOfPostViewingComments: null,
  snackbarMessages: [
  ]
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    changedIdOfPostViewingComments(state, { payload }) {
      state.idOfPostViewingComments = payload
    },
    changedActiveModal(state, { payload }) {
      state.activeModal = payload
    },
    addedSnackbarMessage(state, { payload }) {
      state.snackbarMessages.push(payload)
    },
    removedAllSnackbarMessages(state) {
      state.snackbarMessages = []
    }
  },
  extraReducers(builder) {
    builder
      .addCase(postsActions.postCreated.fulfilled, (state) => {
        state.snackbarMessages.push({ type: 'success', text: 'New post create' })
      })
      .addCase(usersActions.fetchedUsersWhoLikedPost.rejected, (state, { payload }) => {
        state.snackbarMessages.push({ type: 'error', text: generateErrorMessage(payload.errorType) })
      })
      .addCase(postsActions.commentUpdated.rejected, (state, { payload }) => {
        state.snackbarMessages.push({ type: 'error', text: generateErrorMessage(payload.errorType) })
      })
      .addCase(postsActions.postLiked.rejected, (state, { payload }) => {
        state.snackbarMessages.push({ type: 'error', text: generateErrorMessage(payload.errorType) })
      })
  }
})

export const selectActiveModal = (state) => {
  return state.ui.activeModal
}

export const selectIdOfPostViewingComments = (state) => {
  return state.ui.idOfPostViewingComments
}

export const selectSnackbarMessages = (state) => {
  return state.ui.snackbarMessages
}

export const uiActions = {
  ...uiSlice.actions
}

export default uiSlice.reducer

import { createSlice } from '@reduxjs/toolkit'
import { postsActions } from '../reducers/postsReducer'

const initialState = {
  activeModal: null,
  idOfPostViewingComments: null,
  snackbarMessages: []
    // { type: 'success', text: 'Hello' },
    // { type: 'success', text: 'Hello' },
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
      .addCase(postsActions.created.fulfilled, (state) => {
        state.snackbarMessages.push({ type: 'success', text: 'New post create' })
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

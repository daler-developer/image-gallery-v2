import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  activeModal: null,
  idOfPostViewingComments: null
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
    }
  }
})

export const selectActiveModal = (state) => {
  return state.ui.activeModal
}

export const selectIdOfPostViewingComments = (state) => {
  return state.ui.idOfPostViewingComments
}

export const uiActions = {
  ...uiSlice.actions
}

export default uiSlice.reducer

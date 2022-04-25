import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  activeModal: null
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    activeModalChanged(state, { payload }) {
      state.activeModal = payload
    }
  }
})

export const selectActiveModal = (state) => {
  return state.ui.activeModal
}

export const uiActions = {
  ...uiSlice.actions
}

export default uiSlice.reducer

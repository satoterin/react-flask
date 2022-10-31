import { createSlice } from '@reduxjs/toolkit'
export const feedbacksSlice = createSlice({
  name: 'feedbacks',
  initialState: {
    idx: 0,
    feedbacks: [],
  },
  reducers: {
    add: (state, action) => {
      state.idx++
      state.feedbacks.push({
        id: state.idx,
        msg: action.payload
      })
    },
    remove: (state, action) => {
      const idx = state.feedbacks.findIndex(it=>it.id === action.payload)
      state.feedbacks.splice(idx,1)
    }
  },
})
export const {add, remove } = feedbacksSlice.actions

export default feedbacksSlice.reducer
import { createSlice } from '@reduxjs/toolkit'

export const themeSlice = createSlice({
  name: 'theme',
  initialState: 'light',
  reducers: {
    toggle: (state) => state === 'light' ? 'dark' : 'light',
  }
})
export const { toggle } = themeSlice.actions
export default themeSlice.reducer
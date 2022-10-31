import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { guess } from '../api'
export const guessAsync = createAsyncThunk(
  'auth/login', async (params, { dispatch, rejectWithValue}) => {
    try {
      return await guess(params)
    } catch (error) {
    }
  }
)

export const ratesSlice = createSlice({
  name: 'guess',
  initialState: {
    status: 'off',
    user: null
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.status = 'pending'
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.push(action.payload)
        if (state.length > 10) {
          state.shift()          
        }
      });
  },
})

export const selectRates = (state) => state.rates

export default ratesSlice.reducer
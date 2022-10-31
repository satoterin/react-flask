import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchRate } from '../api'
export const fetchRatesAsync = createAsyncThunk(
  'rates/fetch', async () => {
    try {
      return await fetchRate()
    } catch (error) {
    }
  }
)

export const ratesSlice = createSlice({
  name: 'rates',
  initialState: {
    rates: [],
    times: [],
    changes: []
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRatesAsync.fulfilled, (state, action) => {
        const ratesTemp = [...state.rates, action.payload]
        if (ratesTemp.length > 110) {
          ratesTemp.shift()          
        }
        state.rates = ratesTemp
        let time = (new Date()).getTime()
        time = parseInt(time/1000)*1000
        const timesTemp = [...state.times, time]
        if (timesTemp.length > 110) {
          timesTemp.shift()          
        }
        state.times = timesTemp
        if(state.changes.length === 0 || state.changes[0].rate !== action.payload) {
          state.changes.unshift({rate: action.payload, time})
        }
        if (state.changes.length > 100) {
          state.changes.splice(100)
        }
      });
  },
})

export default ratesSlice.reducer
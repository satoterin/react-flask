import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { login, register, getAuthedUser, logout } from '../api'
import { removeToken, setToken } from '../utils'

export const loginAsync = createAsyncThunk(
  'auth/login', async (formData, {rejectWithValue}) => {
    try {
      const res = await login(formData)
      if (res.ok) {
        setToken(res.data)
        return true
      } else {
        return rejectWithValue(res.data.message)
      }  
    } catch (error) {
      return rejectWithValue('Api call failed. Please try again')
    }
    
  }
)

export const registerAsync = createAsyncThunk(
  'auth/register', async (formData) => {
    const res = await register(formData)
    if (res.ok) {
      return await res.json()
    } else {
      console.log(await res.text())
    }
  }
)

export const logoutAsync = createAsyncThunk(
  'auth/logout', async (params, {rejectWithValue}) => {
    try {
      const res = await logout()
      if (res.ok) {
        removeToken()
        return true
      } else {
        rejectWithValue(res.data)
      }
    } catch (error) {
      
    }
  }
)

export const getAuthedUserAsync = createAsyncThunk(
  'auth/user', async(formData, {rejectWithValue}) => {
    const res = await getAuthedUser()
    if (res.ok) {
      return res.data
    } else {
      window.sessionStorage.removeItem('token')
      rejectWithValue(res.data.message)
    }
  }
)
export const authSlice = createSlice({
  name: 'auth',
  initialState: null,
  reducers: {
  },
  extraReducers:  {
    [getAuthedUserAsync.fulfilled]: (_, action) => {
      return action.payload
    },
    [getAuthedUserAsync.rejected]: () => {
      return null
    },
    [logoutAsync.fulfilled]: () => {
      return null
    }
  },
})


export default authSlice.reducer
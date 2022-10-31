import { configureStore } from '@reduxjs/toolkit'
import ratesReducer from './rates.slice'
import authReducer from './auth.slice'
import feedbacksReducer from './feedbacks.slice'
import themeReducer from './theme.slice'
export default configureStore({
  reducer: {
    rates: ratesReducer,
    auth: authReducer,
    feedbacks: feedbacksReducer,
    theme: themeReducer
  },
})
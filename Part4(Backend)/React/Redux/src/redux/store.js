import { configureStore } from '@reduxjs/toolkit'
import reducer from './counter/counterslice'

export const store = configureStore({
  reducer: {
    counter: reducer
  },
})
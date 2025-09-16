import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todoSlice/todoSlice'

export const store = configureStore({
  reducer: {
    todo : todoReducer
  },
})
import { configureStore } from '@reduxjs/toolkit'
import authSlice from './AuthSlice'
import postSlice from './PostSlice'

export const store = configureStore({
    reducer: {
        auth: authSlice,
        posts: postSlice
    },
})
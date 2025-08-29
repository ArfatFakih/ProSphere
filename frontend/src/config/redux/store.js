import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducer/authReducer'
import postReducer from './reducer/postReducer'

/**
 * Steps for state management
 * 
 * 1. submit Action
 * 2. Handle Action in its reducer
 * 3. Register here -> Reducer
 * 
 */



export const store = configureStore({
    reducer: {
        auth: authReducer,
        posts: postReducer,
    }
})
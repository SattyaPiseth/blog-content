import { configureStore } from '@reduxjs/toolkit';
import blogReducer from '../redux/features/blog/blogSlice.js';
import userReducer from '../redux/features/user/userSlice.js';
import profileReducer from '../redux/features/profile/profileSlice.js';

const store = configureStore({
  reducer: {
    // add reducers here
    blog: blogReducer,
    user: userReducer,
    profile: profileReducer
  },
});

export default store;

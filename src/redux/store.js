import { configureStore } from '@reduxjs/toolkit';
import blogReducer from '../redux/features/blog/blogSlice.js';

const store = configureStore({
  reducer: {
    // add reducers here
    blog: blogReducer,
  },
});

export default store;

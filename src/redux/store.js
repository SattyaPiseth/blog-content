// redux/store.js
import { configureStore,combineReducers  } from "@reduxjs/toolkit";
import blogReducer from "../redux/features/blog/blogSlice";
import userReducer from "../redux/features/user/userSlice";
import profileReducer from "../redux/features/profile/profileSlice";
import categoryReducer from "../redux/features/category/categorySlice";
import bookmarkReducer from "../redux/features/blog/bookmarkSlice";
import createBlogReducer from './features/createblog/createBlogSlice';


const store = configureStore({
  reducer: {
    blog: blogReducer,
    user: userReducer,
    profile: profileReducer,
    category: categoryReducer,
    bookmarks: bookmarkReducer,
    createBlog: createBlogReducer,
    
   
  },
});

export default store;

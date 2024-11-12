// redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "../redux/features/blog/blogSlice";
import userReducer from "../redux/features/user/userSlice";
import profileReducer from "../redux/features/profile/profileSlice";
import categoryReducer from "../redux/features/category/categorySlice";

const store = configureStore({
  reducer: {
    blog: blogReducer,
    user: userReducer,
    profile: profileReducer,
    category: categoryReducer,
  },
});

export default store;

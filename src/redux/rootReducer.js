// redux/rootReducer.js
import { combineReducers } from "@reduxjs/toolkit";
import profileReducer from "./features/profile/profileSlice";
import blogReducer from "./features/blog/blogSlice";
import categoryReducer from "./features/category/categorySlice";
import userReducer from "./features/user/userSlice";

const rootReducer = combineReducers({
  profile: profileReducer,
  blog: blogReducer,
  category: categoryReducer,
  user: userReducer,
});

export default rootReducer;

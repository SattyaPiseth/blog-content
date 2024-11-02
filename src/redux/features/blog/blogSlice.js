import { createSlice } from "@reduxjs/toolkit";

import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../../api/api";

export const fetchAllBlogs = createAsyncThunk(
  "blog/fetchAllBlogs",
  async () => {
    try {
      const blogData = await fetch(`${BASE_URL}blogs`).then((res) => res.json());
      return blogData;
    } catch (error) {
      return rejectWithValue(error.message || "something went wrong");
    }
  }
);

const blogSlice = createSlice({
  name: "blog",
  initialState: {
    blogs: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    
  },
  reducers: {},
  extraReducers: builder => builder
      .addCase(fetchAllBlogs.pending, (state) => {
          state.loading = true
          state.status = 'loading';
      })
      .addCase(fetchAllBlogs.fulfilled, (state, {payload}) => {
          state.loading = false
          state.blogs = payload.blogs
          state.status = 'succeeded';
      })
      .addCase(fetchAllBlogs.rejected, (state, {error}) => {
          state.loading = false
          state.error = error.message
          state.status = 'failed';
      })
});

export default blogSlice.reducer;

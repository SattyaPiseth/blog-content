import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../../api/api";

// Action methods
export const fetchAllBlogs = createAsyncThunk(
  "blog/fetchAllBlogs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}blogs`);
      const blogData = await response.json();
      return blogData;
    } catch (error) {
      return rejectWithValue(error.message || "something went wrong");
    }
  }
);

export const fetchById = createAsyncThunk(
  "blogs/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}blogs/${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "something went wrong");
    }
  }
);

export const likeBlogPost = createAsyncThunk(
  "blogs/likeBlogPost",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}blogs/${id}/like`, { method: "POST" });
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "something went wrong");
    }
  }
);

// Slice definition
const blogSlice = createSlice({
  name: "blog",
  initialState: {
    blogs: [],
    blog: {},
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchAllBlogs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllBlogs.fulfilled, (state, { payload }) => {
        state.blogs = payload.blogs || payload;
        state.status = "succeeded";
      })
      .addCase(fetchAllBlogs.rejected, (state, { error }) => {
        state.error = error.message;
        state.status = "failed";
      })
      .addCase(fetchById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchById.fulfilled, (state, { payload }) => {
        state.blog = payload;
        state.status = "succeeded";
      })
      .addCase(fetchById.rejected, (state, { error }) => {
        state.error = error.message;
        state.status = "failed";
      })
      .addCase(likeBlogPost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(likeBlogPost.fulfilled, (state, { payload }) => {
        // Optionally, find the blog post and update likes in state
        const blogIndex = state.blogs.findIndex((blog) => blog.id === payload.id);
        if (blogIndex !== -1) {
          state.blogs[blogIndex] = payload;
        }
        state.status = "succeeded";
      })
      .addCase(likeBlogPost.rejected, (state, { error }) => {
        state.error = error.message;
        state.status = "failed";
      }),
});

export default blogSlice.reducer;

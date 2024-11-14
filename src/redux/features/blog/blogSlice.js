import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../../api/api";

// Existing action methods
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

// New action for bookmarking a blog post
export const bookmarkBlogPost = createAsyncThunk(
  "blogs/bookmarkBlogPost",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}blogs/${id}/bookmark`, { method: "POST" });
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "something went wrong");
    }
  }
);

// New action for searching blogs by title
export const searchBlogs = createAsyncThunk(
  "blogs/searchBlogs",
  async (title, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}blogs?title=${title}`);
      const data = await response.json();
      return data; // Return the result from the API
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
    bookmarkedBlogs: [], // Array to store bookmarked blog IDs or blog objects
    searchResults: [], // Array to store search results
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
        const blogIndex = state.blogs.findIndex((blog) => blog.id === payload.id);
        if (blogIndex !== -1) {
          state.blogs[blogIndex] = payload;
        }
        state.status = "succeeded";
      })
      .addCase(likeBlogPost.rejected, (state, { error }) => {
        state.error = error.message;
        state.status = "failed";
      })
      // Handle bookmarkBlogPost cases
      .addCase(bookmarkBlogPost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(bookmarkBlogPost.fulfilled, (state, { payload }) => {
        const blogId = payload.id;
        // Check if the blog is already bookmarked
        const isBookmarked = state.bookmarkedBlogs.some((id) => id === blogId);
        if (!isBookmarked) {
          state.bookmarkedBlogs.push(blogId);
        }
        state.status = "succeeded";
      })
      .addCase(bookmarkBlogPost.rejected, (state, { error }) => {
        state.error = error.message;
        state.status = "failed";
      })
      // Handle searchBlogs cases
      .addCase(searchBlogs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchBlogs.fulfilled, (state, { payload }) => {
        state.searchResults = payload.blogs || payload; // Store the search results
        state.status = "succeeded";
      })
      .addCase(searchBlogs.rejected, (state, { error }) => {
        state.error = error.message;
        state.status = "failed";
      }),
});

export default blogSlice.reducer;

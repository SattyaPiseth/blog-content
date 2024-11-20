import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../../api/api";

// Fetch all blogs
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

// Fetch a single blog by ID
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

// Like a blog post
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

// Bookmark a blog post
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

// Search blogs by title
export const searchBlogs = createAsyncThunk(
  "blogs/searchBlogs",
  async (title, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}blogs?title=${title}`);
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "something went wrong");
    }
  }
);

// Fetch blogs by category
export const fetchBlogsByCategory = createAsyncThunk(
  "blogs/fetchBlogsByCategory",
  async (categoryId, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}blogs?category_id=${categoryId}`);
      const data = await response.json();
      return data.blogs || data; // Adjust according to the API response structure
    } catch (error) {
      return rejectWithValue(error.message || "something went wrong");
    }
  }
);

// Slice definition
const blogSlice = createSlice({
  name: "blog",
  initialState: {
    blogs: [], // All blogs
    blog: {}, // Single blog details
    bookmarkedBlogs: [], // List of bookmarked blog IDs
    searchResults: [], // Search result list
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    clearSearchResults: (state) => {
      state.searchResults = [];
    },
  },
  extraReducers: (builder) =>
    builder
      // Fetch all blogs
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
      // Fetch a single blog by ID
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
      // Fetch blogs by category
      .addCase(fetchBlogsByCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBlogsByCategory.fulfilled, (state, { payload }) => {
        state.blogs = payload; // Update with filtered blogs
        state.status = "succeeded";
      })
      .addCase(fetchBlogsByCategory.rejected, (state, { error }) => {
        state.error = error.message;
        state.status = "failed";
      })
      // Like a blog post
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
      // Bookmark a blog post
      .addCase(bookmarkBlogPost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(bookmarkBlogPost.fulfilled, (state, { payload }) => {
        const blogId = payload.id;
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
      // Search blogs by title
      .addCase(searchBlogs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchBlogs.fulfilled, (state, { payload }) => {
        state.searchResults = payload.blogs || payload;
        state.status = "succeeded";
      })
      .addCase(searchBlogs.rejected, (state, { error }) => {
        state.error = error.message;
        state.status = "failed";
      }),
});
export const { clearSearchResults } = blogSlice.actions;
export default blogSlice.reducer;

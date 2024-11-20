import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to fetch bookmarked blogs
export const fetchBookmarkedBlogs = createAsyncThunk(
  "bookmarks/fetchBookmarkedBlogs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("https://blog-api.automatex.dev/users/bookmarked-blogs", {
        method: "GET",
        headers: {
          Authorization: "Bearer YOUR_TOKEN_HERE", // Replace with dynamic token
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch bookmarked blogs");
      }

      return await response.json(); // Assuming the API returns an array of blog objects
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const bookmarksSlice = createSlice({
  name: "bookmarks",
  initialState: {
    items: [], // Array to hold bookmarked blogs
    status: "idle", // Tracks the fetch status: 'idle', 'loading', 'succeeded', or 'failed'
    error: null, // Holds any fetch errors
  },
  reducers: {
    toggleBookmark: (state, action) => {
      const blogId = action.payload;
      // Check if the blog is already bookmarked
      if (state.items.some((blog) => blog.id === blogId)) {
        // Remove from bookmarks
        state.items = state.items.filter((blog) => blog.id !== blogId);
      } else {
        // Add a new blog entry (you might need to fetch blog details for a full object)
        state.items.push({ id: blogId });
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookmarkedBlogs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBookmarkedBlogs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload; // Populate items with fetched blogs
      })
      .addCase(fetchBookmarkedBlogs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { toggleBookmark } = bookmarksSlice.actions;
export default bookmarksSlice.reducer;

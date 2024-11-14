import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async action to bookmark a blog
export const bookmarkBlog = createAsyncThunk(
  'bookmarks/bookmarkBlog',
  async (blogId, { rejectWithValue }) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer YOUR_ACCESS_TOKEN");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow"
    };

    try {
      const response = await fetch(`https://blog-api.automatex.dev/blogs/${blogId}/bookmark`, requestOptions);  // Added backticks around the URL
      if (!response.ok) {
        throw new Error('Failed to bookmark the blog');
      }
      const result = await response.json();
      return result; // assuming response contains the updated bookmark info
    } catch (error) {
      // Check if error is an instance of Error or a message
      return rejectWithValue(error instanceof Error ? error.message : 'Something went wrong');
    }
  }
);

const bookmarkSlice = createSlice({
  name: 'bookmarks',
  initialState: {
    bookmarks: [],  // List of bookmarked blogs
    loading: false,
    error: null
  },
  reducers: {
    // Optional: Clear bookmarks, or remove a specific bookmark
    removeBookmark(state, action) {
      state.bookmarks = state.bookmarks.filter(bookmark => bookmark.id !== action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(bookmarkBlog.pending, (state) => {
        state.loading = true;
      })
      .addCase(bookmarkBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.bookmarks.push(action.payload);  // Add the bookmarked blog
      })
      .addCase(bookmarkBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;  // Handle the error
      });
  }
});

export const { removeBookmark } = bookmarkSlice.actions;

export default bookmarkSlice.reducer;

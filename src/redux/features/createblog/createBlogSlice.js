import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Define the async action to create a blog
export const createBlog = createAsyncThunk(
  'blogs/createBlog',
  async (blogData, { rejectWithValue }) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiY2QxNjk1OGMtNmI0Yi00NTVkLTkzNWItOTJhYjQxOTY0ZmNiIiwiZXhwIjoxNzMxMDgzNDA0fQ.BOVxStTYLpnbVuaRxIBvSCjhGJLxmPq3d8iRwfC55Zw");

    const raw = JSON.stringify(blogData);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    try {
      const response = await fetch("https://blog-api.automatex.dev/blogs", requestOptions);
      if (!response.ok) {
        throw new Error('Failed to create blog');
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Create a slice for blog creation
const createBlogSlice = createSlice({
  name: 'createBlog',
  initialState: {
    blog: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blog = action.payload;
        state.error = null;
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export the reducer to be used in the store
export default createBlogSlice.reducer;

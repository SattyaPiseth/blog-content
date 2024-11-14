// src/features/blog/blogThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';

export const createBlog = createAsyncThunk(
  'blog/createBlog',
  async (blogData, { rejectWithValue }) => {
    const { title, content, category_ids, thumbnail, token } = blogData;
    
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    const raw = JSON.stringify({
      title,
      content,
      category_ids,
      thumbnail,
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    try {
      const response = await fetch("https://blog-api.automatex.dev/blogs", requestOptions);
      if (!response.ok) {
        throw new Error('Failed to create blog post');
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

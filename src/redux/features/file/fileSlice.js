import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { redirect } from "react-router-dom";
import { BASE_URL } from "../../../api/api";

export const uploadFile = createAsyncThunk(
  "files/upload",
  async (file, { rejectWithValue }) => {
    const formData = new FormData();
    formData.append("files", file);

    const requestOptions = {
      method: "POST",
      body: formData,
      redirect: "follow",
    };
    try {
      const response = await fetch(`${BASE_URL}upload`, requestOptions);
      if (!response.ok) {
        throw new Error("File upload failed");
      }
      const result = await response.json();
      console.log('result : ',result)
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const fileSlice  = createSlice({
  name: "fileSlice ",
  initialState: {
    status: 'idle',
    error: null,
    uploadedFile: null,
  },
  reducers: {
    
  },
  extraReducers: (builder) =>
    builder
      .addCase(uploadFile.pending, (state) => {
       state.status = 'loading';
      })
      .addCase(uploadFile.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        state.uploadedFile = payload;
      })
      .addCase(uploadFile.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = payload;
      }),
});

export default fileSlice.reducer;

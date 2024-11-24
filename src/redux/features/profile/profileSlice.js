import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../../api/api";

export const getProfile = createAsyncThunk(
  "profile/getProfile",
  async (token, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      return data.profile || data.user; // Adjust based on API response
    } catch (error) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async ({ token, bio, profileUrl }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}users/profile`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bio, profileUrl }),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const data = await response.json();
      return data.user; // Return only the updated user object
    } catch (error) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

const initialState = {
  profile: null,
  status: "idle",
  error: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.profile = action.payload;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.profile = { ...state.profile, ...action.payload }; // Merge updates
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default profileSlice.reducer;

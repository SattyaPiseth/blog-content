import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from '../../../api/api';

// Action to get profile
export const getProfile = createAsyncThunk(
  "profile/getProfile",
  async (token, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}users/profile`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      return data.profile; // Return profile data directly
    } catch (error) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

// Action to update profile
export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async ({ token, bio, profileUrl }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}users/profile`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bio, profileUrl }),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const data = await response.json();
      return data.profile; // Return the updated profile data
    } catch (error) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

const initialState = {
  profile: null,
  loading: false,
  error: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = true ;
        state.profile = action.payload; // Update the profile data
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = true;
        state.error = action.payload;
      });
  },
});

export default profileSlice.reducer;

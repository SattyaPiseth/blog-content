import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../../api/api";
import { toast } from "react-toastify";

// Login action
export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const data = await fetch(`${BASE_URL}login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!data.ok) {
        const error = await data.json();
        toast.error(error.error);
        return rejectWithValue(error.error);
      }

      const response = await data.json();
      toast.success("Logged in successfully!");
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

// Register action
export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ username, email, password }, { rejectWithValue }) => {
    try {
      const data = await fetch(`${BASE_URL}register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (!data.ok) {
        const error = await data.json();
        toast.error(error.error || "Registration failed");
        return rejectWithValue(error.error);
      }

      const response = await data.json();
      toast.success("Registration successful!");
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    user: {
      access_token: "",
      refresh_token: "",
    },
    profile: {},
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) =>
    builder
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        state.user = payload;
        localStorage.setItem('token', state.user.access_token);
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload;
      })

      // Register cases
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        state.user = payload;
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload;
      }),
});

export default userSlice.reducer;

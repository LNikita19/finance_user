// frontend/src/redux/slices/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BACKEND_URL = 'http://localhost:5000'; // Replace with your backend URL

// Helper to get tokens from localStorage
const getTokens = () => {
  const user = localStorage.getItem('user');
  if (user) {
    const { accessToken, refreshToken } = JSON.parse(user);
    return { accessToken, refreshToken };
  }
  return { accessToken: null, refreshToken: null };
};

// Helper to set tokens in localStorage
const setTokens = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

// Helper to remove tokens from localStorage
const removeTokens = () => {
  localStorage.removeItem('user');
};

// Async Thunks
export const register = createAsyncThunk('auth/register', async (userData, thunkAPI) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/auth/register`, userData);
    setTokens(response.data);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});

export const login = createAsyncThunk('auth/login', async (userData, thunkAPI) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/auth/login`, userData);
    setTokens(response.data);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    const { auth } = thunkAPI.getState();
    const config = {
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    };
    await axios.post(`${BACKEND_URL}/auth/logout`, {}, config);
    removeTokens();
    return null;
  } catch (error) {
    removeTokens(); // Even if logout fails on server, clear client tokens
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});

export const refreshAccessToken = createAsyncThunk('auth/refresh', async (_, thunkAPI) => {
  try {
    const { refreshToken } = getTokens();
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }
    const response = await axios.post(`${BACKEND_URL}/auth/refresh-token`, { refreshToken });
    const user = JSON.parse(localStorage.getItem('user'));
    user.accessToken = response.data.accessToken;
    setTokens(user); // Update only the access token
    return response.data.accessToken;
  } catch (error) {
    removeTokens(); // Clear tokens if refresh fails
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});

const initialState = {
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
  accessToken: getTokens().accessToken,
  refreshToken: getTokens().refreshToken,
  isAuthenticated: localStorage.getItem('user') ? true : false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // You can add a reducer to manually clear auth errors if needed
    clearAuthError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
      })
      // Login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
      })
      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        // Even if logout fails, we clear client side state to prevent auth issues
        state.isAuthenticated = false;
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.error = action.payload;
      })
      // Refresh Token
      .addCase(refreshAccessToken.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(refreshAccessToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.accessToken = action.payload;
      })
      .addCase(refreshAccessToken.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isAuthenticated = false; // Force re-login if refresh fails
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
      });
  },
});

export const { clearAuthError } = authSlice.actions;
export default authSlice.reducer;
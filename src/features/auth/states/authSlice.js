import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginApi, registerApi } from '../api/authApi';

// Async Thunk untuk Register
export const asyncRegister = createAsyncThunk(
  'auth/asyncRegister',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await registerApi(payload);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Registrasi gagal.');
    }
  }
);

// Async Thunk untuk Login
export const asyncLogin = createAsyncThunk(
  'auth/asyncLogin',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await loginApi(credentials);
      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Login gagal.');
    }
  }
);

// Alias Async Thunk agar mendukung LoginPage.jsx & RegisterPage.jsx
export const asyncAuthRegister = asyncRegister;
export const asyncAuthLogin = asyncLogin;

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token');
      state.user = null;
      state.token = null;
    },
    clearAuthStatus: (state) => {
      state.error = null;
      state.successMessage = null;
    },
    resetAuthStates: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(asyncRegister.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(asyncRegister.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message || 'Registrasi berhasil!';
      })
      .addCase(asyncRegister.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Login
      .addCase(asyncLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(asyncLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data?.user || null;
        state.token = action.payload.data?.token || null;
      })
      .addCase(asyncLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearAuthStatus, resetAuthStates } = authSlice.actions;

// Alias ekspor pendukung
export const authLogout = logout;

export default authSlice.reducer;